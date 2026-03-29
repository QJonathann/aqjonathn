'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating detailed explanations of concepts.
 *
 * - generateConceptExplanation - A function that handles the generation of concept explanations.
 * - GenerateConceptExplanationInput - The input type for the generateConceptExplanation function.
 * - GenerateConceptExplanationOutput - The return type for the generateConceptExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConceptExplanationInputSchema = z.object({
  subject: z.string().describe('The academic subject, e.g., "Physics", "Mathematics", "Biology".'),
  concept: z.string().describe('The specific concept or topic within the subject, e.g., "Newtonian Mechanics", "Calculus", "Cellular Respiration".'),
  question: z.string().describe('The student\'s specific question about the concept.'),
});
export type GenerateConceptExplanationInput = z.infer<typeof GenerateConceptExplanationInputSchema>;

const GenerateConceptExplanationOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the concept, tailored to the student\'s question.'),
});
export type GenerateConceptExplanationOutput = z.infer<typeof GenerateConceptExplanationOutputSchema>;

export async function generateConceptExplanation(
  input: GenerateConceptExplanationInput
): Promise<GenerateConceptExplanationOutput> {
  return generateConceptExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConceptExplanationPrompt',
  input: {schema: GenerateConceptExplanationInputSchema},
  output: {schema: GenerateConceptExplanationOutputSchema},
  prompt: `You are an AI tutor specializing in various academic subjects. Your goal is to provide clear, detailed, and easy-to-understand explanations for students.

Based on the following information, provide a detailed explanation that addresses the student's question and elaborates on the concept.

Subject: {{{subject}}}
Concept/Topic: {{{concept}}}
Student's Question: {{{question}}}

IMPORTANT INSTRUCTION:
If the subject is Physics (Fizyka), at the very end of your explanation, please add a friendly and professional invitation (in Polish) to book a private online lesson with you to explain the topic even more thoroughly.`,
});

const generateConceptExplanationFlow = ai.defineFlow(
  {
    name: 'generateConceptExplanationFlow',
    inputSchema: GenerateConceptExplanationInputSchema,
    outputSchema: GenerateConceptExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
