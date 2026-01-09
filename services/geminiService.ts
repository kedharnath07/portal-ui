
import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "../types";

export const generateAITasks = async (): Promise<Task[]> => {
  // Correctly initialize GoogleGenAI using only the process.env.API_KEY variable as per instructions
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Generate 4 realistic daily tasks for an insurance agent working in an enterprise portal. Tasks should cover quotes, claims, and customer follow-ups. Ensure priority is one of: High, Medium, or Low.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              priority: { type: Type.STRING },
              dueDate: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ['id', 'title', 'priority', 'dueDate', 'category']
          }
        }
      }
    });

    // Safely extract the text property and trim it as recommended in the documentation
    const jsonStr = response.text?.trim() || '[]';
    const tasks = JSON.parse(jsonStr);
    return tasks;
  } catch (error) {
    console.error("Error generating tasks:", error);
    // Fallback if API fails
    return [
      { id: '1', title: 'Review pending FNOL for Policy #XJ-293', priority: 'High', dueDate: 'Today', category: 'Claims' },
      { id: '2', title: 'Follow up on Life Insurance Quote for J. Doe', priority: 'Medium', dueDate: 'Tomorrow', category: 'Sales' },
    ];
  }
};
