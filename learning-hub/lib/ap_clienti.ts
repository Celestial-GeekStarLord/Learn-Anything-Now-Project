export async function analyzeUser(userData: any) {
  const response = await fetch('http://localhost:8000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}