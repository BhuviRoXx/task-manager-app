import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { aiPrompt } from "./aiPrompt.js";

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;
console.log(API_KEY);

if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}
const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

export async function callGemini(userPrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: userPrompt,
    config: {
      systemInstruction: aiPrompt,
    },
  });
  console.log(response.text);
  return response.text;
}