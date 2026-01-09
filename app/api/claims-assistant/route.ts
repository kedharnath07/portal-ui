
import { GoogleGenAI } from "@google/genai";

export const POST = async (request: Request) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const { prompt } = await request.json();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the MSG Group Insurance Assistant. A client is asking: "${prompt}". 
      Respond in a professional, empathetic, and clear way. Focus on guiding them through claims or coverage questions. 
      Keep the tone reassuring. If they ask about filing a claim, mention that the MSG terminal has a 3-step guided filing process.
      Use simple terms, no jargon. Answer in max 3-4 sentences.`,
    });

    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to reach AI assistant' }), {
      status: 500,
    });
  }
};
