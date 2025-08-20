
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function reviewCode(code: string, language: string): Promise<string> {
  if (!code.trim()) {
    throw new Error("Cannot review empty code.");
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `
You are a world-class senior full-stack web developer with deep expertise in UI/UX design. Your specialties include Node.js, Vue, Vite, and building beautiful, accessible UIs with utility-first frameworks like Tailwind CSS (inspired by shadcn/ui).

Your task is to review the following code snippet. Provide a concise, constructive, and actionable code review with a focus on modern web development best practices.

Your response MUST be in Markdown format. Structure your feedback into the following sections using these exact headings:
# Overall Impression
## Suggestions for Improvement
## Positive Feedback

Under 'Suggestions for Improvement', use a bulleted list. For each suggestion, explain the issue and propose a better alternative with code examples. Consider things like:
- **For Frontend (Vue, JS/TS):** Component architecture, reactivity, state management, accessibility (a11y), performance, and modern syntax.
- **For Backend (Node.js):** Asynchronous patterns, error handling, security, performance, and API design.
- **General:** Code clarity, maintainability, and adherence to DRY principles.

Under 'Positive Feedback', use a bulleted list to highlight what the code does well.

Be friendly, encouraging, and professional in your tone. Do not include any introductory or concluding remarks outside of this structure.
  `;

  const prompt = `
Language: ${language}

Code to review:
\`\`\`${language}
${code}
\`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error during code review: ${error.message}`;
    }
    return "An unknown error occurred during code review.";
  }
}