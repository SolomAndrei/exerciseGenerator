import { Request, Response, NextFunction } from 'express';
import { generateExercisesSchema } from '../validators/exercise.schema';
import { HttpError } from '../errors/HttpError';

const suspiciousPatterns = [
    /ignore\s+.*instructions/i,
    /you\s+are\s+now/i,
    /act\s+as/i,
    /simulate/i,
    /\bscript\b/i,
    /<\s*\/?\s*\w+/i,
];

export function validateExerciseInput(req: Request, res: Response, next: NextFunction): void {
    const parsed = generateExercisesSchema.safeParse(req.body);
    if (!parsed.success) {
        const message = parsed.error.issues
            .map((issue) => {
                const fieldName = issue.path.length > 0 ? issue.path.join('.') : 'field';
                return `${fieldName}: ${issue.message}`;
            })
            .join(', ');
        next(new HttpError(400, `Invalid input: ${message}`));
        return;
    }

    const { topic, subtopic } = parsed.data;
    const inputText = `${topic} ${subtopic}`;

    if (suspiciousPatterns.some((regex) => regex.test(inputText))) {
        return next(new HttpError(400, 'Input contains forbidden or suspicious content.'));
    }
    req.body = parsed.data;
    next();
}
