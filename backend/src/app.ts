import express from 'express';
import cors from 'cors';
import exercisesRouter from './routes/exercises';
import { errorHandler } from './middleware/errorHandler';
import rateLimit from 'express-rate-limit';

export const app = express();

const allowedOrigin = process.env.FRONTEND_URL || '*';

app.use(
    cors({
        origin: allowedOrigin,
    })
);
app.use(express.json());

app.use(
    '/api',
    rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 10,
        message: {
            error: 'Too many requests, please try again later.',
        },
        standardHeaders: true,
        legacyHeaders: false,
    })
);

app.use('/api/exercises', exercisesRouter);

app.use(errorHandler);
