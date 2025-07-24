import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    console.error('❌ Unhandled Error:', err);

    if (err instanceof HttpError) {
        res.status(err.status).json({ error: err.message });
        return;
    }

    if (err instanceof Error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message,
        });
    } else {
        res.status(500).json({
            error: 'Internal Server Error',
            message: String(err),
        });
    }
}
