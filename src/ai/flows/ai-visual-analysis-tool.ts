'use server';
/**
 * @fileOverview This file implements a Genkit flow for AI-powered visual analysis.
 *
 * - aiVisualAnalysisTool - A function that analyzes an uploaded image based on visual arts theory.
 * - VisualAnalysisInput - The input type for the aiVisualAnalysisTool function.
 * - VisualAnalysisOutput - The return type for the aiVisualAnalysisTool function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VisualAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an artwork or visual media, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VisualAnalysisInput = z.infer<typeof VisualAnalysisInputSchema>;

const VisualAnalysisOutputSchema = z.object({
  compositionalElements: z
    .string()
    .describe(
      "Detailed description of the image's compositional elements (e.g., rule of thirds, color palette, leading lines, balance, contrast, texture, form)."
    ),
  aestheticCategories: z
    .string()
    .describe(
      "Identification and explanation of the dominant aesthetic categories present in the image (e.g., beautiful, sublime, grotesque, tragic, comic, kitsch, uncanny)."
    ),
  communicativeFunctions: z
    .string()
    .describe(
      "Analysis of the image's intended or perceived communicative functions and its potential impact on the viewer (e.g., symbolic, conative, referential, emotive, phatic, metalinguistic)."
    ),
  overallAnalysis: z
    .string()
    .describe(
      "A concise overall summary synthesizing the compositional, aesthetic, and communicative analyses."
    ),
});
export type VisualAnalysisOutput = z.infer<typeof VisualAnalysisOutputSchema>;

export async function aiVisualAnalysisTool(
  input: VisualAnalysisInput
): Promise<VisualAnalysisOutput> {
  return aiVisualAnalysisToolFlow(input);
}

const visualAnalysisPrompt = ai.definePrompt({
  name: 'visualAnalysisPrompt',
  input: { schema: VisualAnalysisInputSchema },
  output: { schema: VisualAnalysisOutputSchema },
  model: 'googleai/gemini-2.5-flash-image', // Specify the multimodal model
  prompt: `You are an expert in visual arts, media theory, and visual communication, specialized in providing detailed analytical feedback.
          
          Analyze the provided image thoroughly based on the following criteria:
          1.  **Compositional Elements**: Describe the arrangement of visual components, use of space, lines, shapes, colors, light, texture, and balance. Consider principles like the rule of thirds, leading lines, depth, and focal points.
          2.  **Aesthetic Categories**: Identify and explain the predominant aesthetic categories the image evokes. Discuss whether it aligns with concepts such as the beautiful, the sublime, the grotesque, the tragic, the comic, the uncanny, or kitsch, and why.
          3.  **Communicative Functions**: Analyze the image's intended or perceived communicative functions. How does it convey meaning or emotion? Consider functions like symbolic (representing ideas), conative (eliciting a response), referential (conveying information), emotive (expressing feelings), phatic (establishing connection), or metalinguistic (commenting on the medium itself).
          4.  **Overall Analysis**: Provide a concise synthesis of your findings, summarizing how the compositional, aesthetic, and communicative aspects work together to create the overall impact and message of the image.
          
          Ensure your analysis is academic yet accessible, providing clear explanations for each point.
          
          Image to analyze: {{media url=photoDataUri}}`,
});

const aiVisualAnalysisToolFlow = ai.defineFlow(
  {
    name: 'aiVisualAnalysisToolFlow',
    inputSchema: VisualAnalysisInputSchema,
    outputSchema: VisualAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await visualAnalysisPrompt(input);
    return output!;
  }
);
