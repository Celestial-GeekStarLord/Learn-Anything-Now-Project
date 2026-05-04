from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy

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
    
    # Extracting Nouns and Proper Nouns (these are usually the 'skills' or 'topics')
    keywords = list(set([chunk.text.lower() for chunk in doc.noun_chunks if not chunk.root.is_stop]))
    
    # Simple logic to determine "Level" based on keywords
    level = "Beginner"
    if any(word in data.text.lower() for word in ["experienced", "advanced", "professional"]):
        level = "Advanced"

    return {
        "detected_keywords": keywords,
        "suggested_level": level,
        "message": f"We identified interest in: {', '.join(keywords[:3])}"
    }