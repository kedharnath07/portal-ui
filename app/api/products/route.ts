
import { GoogleGenAI, Type } from "@google/genai";

export const POST = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Generate a catalog of 6 diverse insurance products for a modern portal. Include personal and commercial options (e.g. Health, Cyber, Marine, Property). For each, provide a name, a compelling description, a category, an estimated monthly starting price, 3 key benefits, and a FontAwesome icon name.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              priceEstimate: { type: Type.STRING },
              benefits: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              icon: { type: Type.STRING }
            },
            required: ['id', 'name', 'description', 'category', 'priceEstimate', 'benefits', 'icon']
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Products API Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to generate products catalog' }), {
      status: 500,
    });
  }
};
