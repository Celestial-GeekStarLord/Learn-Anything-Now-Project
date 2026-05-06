from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy

from services.recommendation_engine import fetch_resources
from fastapi import UploadFile, File
from services.pdf_processor import extract_text_from_pdf

app = FastAPI()

# Allow Next.js to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

nlp = spacy.load("en_core_web_sm")

class UserInput(BaseModel):
    text: str

@app.post("/analyze")
async def extract_characterization(data: UserInput):
    doc = nlp(data.text)
    
    # Improved keyword extraction logic
    keywords = list(set([token.lemma_.lower() for token in doc 
                        if token.pos_ in ["NOUN", "PROPN"] and not token.is_stop]))
    
    # Determine level from characterization text
    level = "Beginner"
    if any(word in data.text.lower() for word in ["expert", "advanced", "intermediate"]):
        level = "Intermediate" if "intermediate" in data.text.lower() else "Advanced"

    # Fetch resources based on identified 'Interests'
    links = await fetch_resources(keywords, level)

@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...)):
    content = await file.read()
    extracted_text = extract_text_from_pdf(content)
    doc = nlp(extracted_text)

    # List of high-value skill categories (NER - Named Entity Recognition)
    # spaCy can identify 'ORG' (organizations/tech) and 'PRODUCT'
    tech_entities = [ent.text.lower() for ent in doc.ents if ent.label_ in ["ORG", "PRODUCT", "GPE"]]
    
    # Also grab specific technical nouns (filtering out noise like 'semi' or 'contest')
    ignored_words = {"hackathon", "contest", "semi", "top", "user", "resources", "learning"}
    skills = []
    for chunk in doc.noun_chunks:
        word = chunk.root.lemma_.lower()
        if word not in ignored_words and len(word) > 2:
            skills.append(word)

    # Prioritize words that appear in both or are clearly technical
    final_interests = list(set(tech_entities + skills[:5]))

    # If the system finds 'robotics' or 'programming', we boost those
    level = "Advanced" 
    links = await fetch_resources(final_interests[:4], level)

    return {
        "detected_keywords": final_interests[:8],
        "suggested_level": level,
        "recommendations": links
    }
 