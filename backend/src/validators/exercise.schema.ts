import { z } from 'zod';

const allowedLanguageRegex = /[a-zA-Z\u0590-\u05FF0-9]/;

const zHebrewOrEnglishText = (fieldName: string) =>
    z
        .string()
        .trim()
        .min(3, `${fieldName} must be at least 3 characters long`)
        .max(100, `${fieldName} must be under 100 characters`)
        .refine((val) => allowedLanguageRegex.test(val), {
            message: `${fieldName} must contain Hebrew or English letters (or digits)`,
        });

export const generateExercisesSchema = z.object({
    topic: zHebrewOrEnglishText('Topic'),
    subtopic: zHebrewOrEnglishText('Subtopic'),
});

export type GenerateExercisesInput = z.infer<typeof generateExercisesSchema>;
