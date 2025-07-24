import type { ExercisesStorage, ExerciseGeneration } from './types';
import { STORAGE_KEY, MAX_GENERATIONS } from './constants';

export function readStorage(STORAGE_KEY: string): ExercisesStorage {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    try {
        return JSON.parse(raw) as ExercisesStorage;
    } catch {
        return {};
    }
}

export function writeStorage(data: ExercisesStorage, STORAGE_KEY: string) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveNewGeneration(newGen: ExerciseGeneration) {
    const storage = readStorage(STORAGE_KEY);
    const updatedStorage = { ...storage, [newGen.exercises.id]: newGen };
    const generationsArray = Object.values(updatedStorage);
    if (generationsArray.length > MAX_GENERATIONS) {
        generationsArray.sort((a, b) => a.exercises.createdAt - b.exercises.createdAt);
        const limitedGenerations = generationsArray.slice(-MAX_GENERATIONS);
        const limitedStorage: ExercisesStorage = {};
        for (const gen of limitedGenerations) {
            limitedStorage[gen.exercises.id] = gen;
        }
        writeStorage(limitedStorage, STORAGE_KEY);
    } else {
        writeStorage(updatedStorage, STORAGE_KEY);
    }
}

export const updateGeneration = (updatedGen: ExerciseGeneration) => {
    const storage = readStorage(STORAGE_KEY);
    const updatedStorage = { ...storage, [updatedGen.exercises.id]: updatedGen };
    writeStorage(updatedStorage, STORAGE_KEY);
};
