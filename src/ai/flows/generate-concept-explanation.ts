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
  prompt: `Jesteś inteligentnym asystentem i wirtualnym sekretarzem platformy edukacyjnej qJonathan. Bądź charyzmatyczny, staraj się nie brzmieć aż tak jak robot.
Na tematy kontrowersyjne odpowiadaj lekko żartobliwie z smakiem jak na asystenta przystało, ale nie podając kontrowersyjnych odpowiedzi.

Zasady Twojej odpowiedzi:
1. Odpowiadaj zawsze w języku polskim.
2. Bądź uprzejmy, profesjonalny i pomocny (styl asystenta biurowego).
3. Jeśli użytkownik pyta o zagadnienie naukowe, podaj krótką, zwięzłą informację i zasugeruj, że pełne wyjaśnienie najlepiej uzyskać podczas lekcji.
4. Twoim priorytetem jest pomoc w:
   - Umówieniu się na zajęcia (do systemu rezerwacji online, który działa całą dobę) (rezerwacje.qjonathan.pl).
   - Wyjaśnianiu zasad współpracy (qjonathan.pl/warunki-swiadczenia-uslug)
   - Informowaniu o dostępnych materiałach PDF na stronie.
5. Jeśli nie znasz odpowiedzi na pytanie organizacyjne, poproś o bezpośredni kontakt mailowy: contact.qjonathan@gmail.com.

Dane zapytania:
Przedmiot: {{{subject}}}
Temat/Kontekst: {{{concept}}}
Pytanie użytkownika: {{{question}}}`,
});

const generateConceptExplanationFlow = ai.defineFlow(
  {
    name: 'generateConceptExplanationFlow',
    inputSchema: GenerateConceptExplanationInputSchema,
    outputSchema: GenerateConceptExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    const rawWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const webhookUrl = rawWebhookUrl ? rawWebhookUrl.trim() : ""; 

    console.log("Czy serwer widzi link do Discorda?", webhookUrl ? "TAK" : "NIE");

    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        const safeQuestion = input.question ? input.question.substring(0, 1000) : "Brak";
        const safeAnswer = output?.explanation ? output.explanation.substring(0, 1000) : "Brak";

        const discordResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Logi Asystenta AI",
            avatar_url: "https://lucide.dev/icons/bot.svg",
            embeds: [
              {
                title: "💬 Nowa interakcja z Asystentem",
                color: 2566366,
                fields: [
                  {
                    name: "👤 Użytkownik zapytał:",
                    value: safeQuestion,
                  },
                  {
                    name: "🤖 Asystent odpowiedział:",
                    value: safeAnswer,
                  }
                ],
                timestamp: new Date().toISOString(),
              }
            ]
          })
        });
        
        console.log("Status Discorda:", discordResponse.status);
      } catch (error) {
        console.error("Błąd fetchowania na Discorda:", error);
      }
    }

    return output!;
  }
);
