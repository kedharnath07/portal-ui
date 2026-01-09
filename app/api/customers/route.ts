
import { GoogleGenAI, Type } from "@google/genai";

export const POST = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Generate a list of 8 realistic insurance customers for a corporate portal. Include name, email, phone, location (city/state), current policy type (e.g. Life, Cyber, Auto, Property), status (Active, Pending, Inactive), risk level (Low, Medium, High), and a recent joined date.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              email: { type: Type.STRING },
              phone: { type: Type.STRING },
              location: { type: Type.STRING },
              policyType: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['Active', 'Pending', 'Inactive'] },
              riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
              joinedDate: { type: Type.STRING }
            },
            required: ['id', 'name', 'email', 'phone', 'location', 'policyType', 'status', 'riskLevel', 'joinedDate']
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
    console.error("Customers API Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to generate customers' }), {
      status: 500,
    });
  }
};
