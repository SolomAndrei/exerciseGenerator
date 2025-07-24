import { z } from 'zod';

export const questionSchema = z.object({
    question: z.string().min(3),
    choices: z.tuple([z.string(), z.string(), z.string(), z.string()]),
    correctAnswer: z.number().int().min(0).max(3),
    explanation: z.string().min(5)
});

export const questionsArraySchema = z.array(questionSchema);
