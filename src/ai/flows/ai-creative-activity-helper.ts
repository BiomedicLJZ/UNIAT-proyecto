'use server';
/**
 * @fileOverview An AI learning assistant flow that helps students with creative assignments
 * by providing structural outlines, transforming complex information, suggesting ideas,
 * or generating relevant examples.
 *
 * - aiCreativeActivityHelper - A function that handles student creative assistance requests.
 * - AICreativeActivityHelperInput - The input type for the aiCreativeActivityHelper function.
 * - AICreativeActivityHelperOutput - The return type for the aiCreativeActivityHelper function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AICreativeActivityHelperInputSchema = z.object({
  activityType: z.string().describe('The type of creative activity or problem-solving task (e.g., "script writing", "data analysis", "essay brainstorming").'),
  context: z.string().describe('The specific context or topic of the activity.'),
  request: z.string().describe('The student\'s specific request for AI assistance (e.g., "provide an outline", "simplify this concept", "suggest ideas for characters", "generate examples of arguments").'),
  additionalInfo: z.string().optional().describe('Any additional information or constraints for the AI assistant.'),
});
export type AICreativeActivityHelperInput = z.infer<typeof AICreativeActivityHelperInputSchema>;

const AICreativeActivityHelperOutputSchema = z.object({
  assistance: z.string().describe('The AI-generated assistance, which could be an outline, simplified information, suggested ideas, or relevant examples.'),
});
export type AICreativeActivityHelperOutput = z.infer<typeof AICreativeActivityHelperOutputSchema>;

export async function aiCreativeActivityHelper(input: AICreativeActivityHelperInput): Promise<AICreativeActivityHelperOutput> {
  return aiCreativeActivityHelperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCreativeActivityHelperPrompt',
  input: { schema: AICreativeActivityHelperInputSchema },
  output: { schema: AICreativeActivityHelperOutputSchema },
  prompt: `You are an AI learning assistant for students working on creative assignments and problem-solving. Your goal is to help students overcome creative blocks, enhance their work, and deepen their understanding, without doing the work for them. Provide structural outlines, simplify complex information, suggest ideas, or generate relevant examples based on the student's request.

**Activity Type**: {{{activityType}}}
**Context**: {{{context}}}
**Student Request**: {{{request}}}
{{#if additionalInfo}}
**Additional Information**: {{{additionalInfo}}}
{{/if}}

Please provide your assistance in a clear, structured, and helpful manner.
`,
});

const aiCreativeActivityHelperFlow = ai.defineFlow(
  {
    name: 'aiCreativeActivityHelperFlow',
    inputSchema: AICreativeActivityHelperInputSchema,
    outputSchema: AICreativeActivityHelperOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
