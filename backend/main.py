from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy

from services.recommendation_engine import fetch_resources

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

    return {
        "detected_keywords": keywords,
        "suggested_level": level,
        "recommendations": links
    }