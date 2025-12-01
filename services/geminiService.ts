import { GoogleGenAI } from "@google/genai";
import { AIModel } from "../types";

// Helper to get the actual Gemini model ID based on user selection
// Since we only have a Gemini API Key in this environment, we use Gemini to power all "simulated" models
// but theoretically, this structure allows swapping backend services.
const resolveModelId = (selectedModel: AIModel): string => {
  switch (selectedModel) {
    case AIModel.GEMINI_PRO:
    case AIModel.CHATGPT_4O: // Simulating high-intelligence model
    case AIModel.DEEPSEEK_R1: // Simulating reasoning model
      return 'gemini-3-pro-preview';
    case AIModel.QWEN_MAX:
    case AIModel.DOUBAO_PRO:
    case AIModel.GEMINI_FLASH:
    default:
      return 'gemini-2.5-flash';
  }
};

const getSystemInstruction = (selectedModel: AIModel): string => {
   // We can tweak the persona slightly based on the "Simulated" model to give a different flavor
   if (selectedModel === AIModel.DEEPSEEK_R1) {
     return "You are a highly logical and reasoning-focused technical writer. Prioritize depth and structure.";
   }
   if (selectedModel === AIModel.DOUBAO_PRO) {
     return "You are a friendly and accessible tutorial assistant. Use simple language.";
   }
   return "You are a professional technical documentation expert.";
};

export const generateTutorialContent = async (
  transcript: string,
  model: AIModel,
  customPrompt: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const targetModelId = resolveModelId(model);
  const systemInstruction = getSystemInstruction(model);

  try {
    const response = await ai.models.generateContent({
      model: targetModelId,
      contents: [
        {
          role: 'user',
          parts: [
            { text: customPrompt },
            { text: `\n\n--- Start of Transcript ---\n${transcript}\n--- End of Transcript ---` }
          ]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Balanced for creativity and adherence
      }
    });

    return response.text || "生成的过程中未返回任何内容，请重试。";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate tutorial.");
  }
};