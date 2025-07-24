import type { Question } from '../storage/types';

type ExerciseInput = {
    topic: string;
    subtopic: string;
};

export async function postExercise(input: ExerciseInput) {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
    const response = await fetch(`${BASE_URL}/api/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });
    const json = await response.json();
    if (!response.ok) {
        const { error, message } = json;
        const details = [error, message].filter(Boolean).join(' | ') || 'Unknown error from server';
        throw new Error(details);
    }
    return json;
}

export async function regenerateExercise({
    difficulty,
    topic,
    subtopic,
}: {
    difficulty: string;
    topic: string;
    subtopic: string;
}): Promise<Question> {
    const response = await fetch(`http://localhost:5001/api/exercises/regenerate/${difficulty}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, subtopic }),
    });
    const json = await response.json();
    if (!response.ok) {
        const errorMessage = json.error || json.message || 'Unknown error from server';
        throw new Error(errorMessage);
    }
    return json.question as Question;
}
