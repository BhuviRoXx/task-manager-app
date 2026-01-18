import { callGemini } from "./aiClient.js";

export async function parseIntent(userInput) {
  const raw = await callGemini(userInput);

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("AI returned invalid JSON");
  }

  return parsed;
}
