
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Next.js Route Handler: POST /api/tasks
 * In a real Next.js environment, this would be exported as:
 * export async function POST(request: Request) { ... }
 */
export const POST = async () => {
  // Sensitive API Key is only accessible here on the server
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: 'Generate 5 high-priority daily tasks for an insurance broker. Focus on policy renewals, new quotations, and claim follow-ups.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
              dueDate: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ['id', 'title', 'priority', 'dueDate', 'category']
          }
        }
      }
    });

    // The logic to parse and structure the data happens here on the server
    const data = JSON.parse(response.text || '[]');
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to generate tasks' }), {
      status: 500,
    });
  }
};
