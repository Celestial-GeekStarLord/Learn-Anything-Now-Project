import httpx
from youtubesearchpython import VideosSearch

async def fetch_resources(keywords, level):
    search_results = []
    
    
    platforms = [
        {"name": "YouTube", "base_url": "https://www.youtube.com/results?search_query="},
        {"name": "GitHub", "base_url": "https://github.com/search?q="}
    ]

    for query in keywords:
        
        if len(query) < 3 or query.isdigit():
            continue

        for platform in platforms:
            full_query = f"{query} {level} tutorial".replace(" ", "+")
            search_results.append({
                "title": f"Top {query.capitalize()} Resources for {level} Users",
                "url": f"{platform['base_url']}{full_query}",
                "type": platform['name'],
                "tag": query
            })
            
    return search_results 

