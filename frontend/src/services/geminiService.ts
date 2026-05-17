import { GoogleGenAI, Type } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

console.log("====================================");
console.log("[DEBUG] Gemini API Initialization:");
console.log(`[DEBUG] Key available: ${!!apiKey}`);
if (apiKey) {
  console.log(`[DEBUG] Key length: ${apiKey.length} characters`);
  console.log(`[DEBUG] Key prefix: ${apiKey.substring(0, 5)}...`);
}
console.log("====================================");

let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log("[DEBUG] GoogleGenAI client successfully constructed.");
  } catch (e) {
    console.error("[DEBUG] Failed to construct GoogleGenAI client:", e);
  }
} else {
  console.error("[DEBUG] CRITICAL: No API key provided to Gemini Service.");
}

export interface AuthenticityAnalysis {
  humanConfidence: number;
  riskLevel: "low" | "medium" | "high";
  summary: string;
}

export async function analyzeAuthenticity(interactionText: string): Promise<AuthenticityAnalysis> {
  console.log("[DEBUG] analyzeAuthenticity called with text:", interactionText);

  if (!ai) {
    const errMsg = "[DEBUG] CRITICAL: Gemini API not configured. Cannot execute inference.";
    console.error(errMsg);
    throw new Error(errMsg);
  }

  try {
    console.log("[DEBUG] Executing ai.models.generateContent...");
    
    // Using gemini-2.5-flash as per the latest SDK standard for high-speed multimodal
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a strict, privacy-focused behavioral authenticity engine. Analyze this short interaction input for human authenticity: "${interactionText}". Return JSON strictly matching the requested schema. Do not request more information. Focus on semantic naturalness.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            humanConfidence: {
              type: Type.NUMBER,
              description: "Confidence percentage (0-100) that this is a human",
            },
            riskLevel: {
              type: Type.STRING,
              description: "Automation risk level: 'low', 'medium', or 'high'",
            },
            summary: {
              type: Type.STRING,
              description: "Short, privacy-focused reasoning summary (1-2 sentences)",
            },
          },
          required: ["humanConfidence", "riskLevel", "summary"],
        },
      }
    });

    console.log("[DEBUG] Raw response received from Gemini:", response);
    console.log("[DEBUG] Raw response.text:", response.text);

    if (response.text) {
      const parsed = JSON.parse(response.text);
      console.log("[DEBUG] Parsed JSON:", parsed);
      
      if (!['low', 'medium', 'high'].includes(parsed.riskLevel)) {
        parsed.riskLevel = 'low';
      }

      const finalState = {
        humanConfidence: Number(parsed.humanConfidence) || 0,
        riskLevel: parsed.riskLevel as "low" | "medium" | "high",
        summary: parsed.summary || "No summary provided"
      };

      console.log("[DEBUG] Final React State payload returning:", finalState);
      return finalState;
    }
    
    throw new Error('[DEBUG] No text returned from Gemini API');
  } catch (error) {
    console.error("[DEBUG] Gemini analysis failed explicitly during request execution:", error);
    // Explicitly throwing the error rather than falling back silently
    throw error;
  }
}
