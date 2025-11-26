import { GoogleGenAI } from "@google/genai";
import { Person } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGiftSuggestions = async (giver: Person, receiver: Person): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I am participating in a sibling secret santa exchange.
      
      Giver: ${giver}
      Receiver: ${receiver}
      
      Context: We are siblings and in-laws. We like to have fun.
      
      Task: Suggest 3 specific gift ideas. One should be slightly practical, one should be fun/hobby related, and one should be a "safe bet". 
      Keep the descriptions short (one sentence each).
      Format as a simple bulleted list.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for UI interactivity
      }
    });

    return response.text || "Could not generate ideas right now. Try a gift card!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Santa's elves are on a break (AI Error). Maybe get them some nice socks?";
  }
};