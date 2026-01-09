
import { GoogleGenAI } from "@google/genai";

export const POST = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: "Summarize the top 3 current trends in the global commercial insurance market for 2024 and 2025. Focus on cyber insurance and property climate risk.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No insights available at this time.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return new Response(JSON.stringify({ text, sources }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Market News API Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch market insights' }), {
      status: 500,
    });
  }
};
