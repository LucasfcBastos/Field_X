// utils/callGeminiApi.js
export const callGeminiApi = async (prompt) => {
  const GEMINI_API_KEY = ""; // Insira sua chave aqui ou use variável de ambiente
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

  try {
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };

    const response = await fetch(`${GEMINI_API_URL}${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Estrutura de resposta inesperada da API Gemini. 😕');
    }
  } catch (error) {
    console.error("Erro na chamada da API Gemini:", error);
    throw new Error(`Erro ao se comunicar com a IA: ${error.message || 'Erro de rede/API'} 🙁`);
  }
};