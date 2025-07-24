import type { Difficulty } from '../components/molecules/exerciseTest/DifficultyTabs';

export interface Question {
    question: string;
    choices: string[];
    correctAnswer: number;
    explanation: string;
    id: string;
    userAnswer: null | number;
}

export interface ExerciseGeneration {
    exercises: {
        createdAt: number;
        id: string;
        topic: string;
        subtopic: string;
        levels: {
            beginner: Question[];
            intermediate: Question[];
            expert: Question[];
        };
    };
}

export interface ExercisesStorage {
    [generationId: string]: ExerciseGeneration;
}

export interface LevelStats {
    answeredCount: number;
    totalCount: number;
    correctCount: number;
    completionPercent: number;
    accuracyPercent: number;
}

export interface GenerationStats {
    id: string;
    topic: string;
    subtopic: string;
    createdAt: number;
    levelsStats: Record<string, LevelStats>;
}

export interface UpdateCurrentGenParams {
    question: Question;
    difficulty: Difficulty;
    currentQuestionId: string;
}
