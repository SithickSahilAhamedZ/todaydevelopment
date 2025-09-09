import { GoogleGenAI } from "@google/genai";

// FIX: Initialize GoogleGenAI with the API key from environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gets an AI-generated response from the Gemini API.
 * @param prompt The user's prompt.
 * @returns A promise that resolves to the AI's text response.
 */
// FIX: Replace dummy function with an actual Gemini API call.
export const getAIResponse = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "API key not configured. Please contact support.";
  }
  
  try {
    // FIX: Use 'gemini-2.5-flash' for general text tasks as per guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful assistant for pilgrims at the Ujjain Simhastha. Be concise and helpful. Your name is PilgrimPath Assistant. Provide information about routes, food, safety, and general guidance. Respond in the language of the prompt (English or Hindi).",
      }
    });

    // FIX: Extract text directly from the response object as per guidelines.
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I am having trouble connecting to my knowledge base. Please try again later.";
  }
};
