import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
    ExercisesStorage,
    ExerciseGeneration,
    GenerationStats,
    LevelStats,
    UpdateCurrentGenParams,
} from './types';
import { STORAGE_KEY, CURRENT_GEN_KEY } from './constants';
import { readStorage, updateGeneration } from './exercisesStorage';
import type { Difficulty } from '../components/molecules/exerciseTest/DifficultyTabs';

function getLastGeneration(storage: ExercisesStorage): ExerciseGeneration | null {
    const generations = Object.values(storage);
    if (generations.length === 0) return null;
    return generations.reduce((latest, current) =>
        current.exercises.createdAt > latest.exercises.createdAt ? current : latest
    );
}

export function useExercisesStorage() {
    const [storage, setStorage] = useState<ExercisesStorage>({});
    const [currentGen, setCurrentGen] = useState<ExerciseGeneration | null>(null);

    useEffect(() => {
        const initialStorage = readStorage(STORAGE_KEY);
        setStorage(initialStorage);
        const savedCurrentId = localStorage.getItem(CURRENT_GEN_KEY);
        let currentGeneration: ExerciseGeneration | null = null;
        if (savedCurrentId && initialStorage[savedCurrentId]) {
            currentGeneration = initialStorage[savedCurrentId];
        } else {
            currentGeneration = getLastGeneration(initialStorage);
            if (currentGeneration) {
                localStorage.setItem(CURRENT_GEN_KEY, currentGeneration.exercises.id);
            }
        }
        setCurrentGen(currentGeneration);

        const onStorageChange = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY || event.key === CURRENT_GEN_KEY) {
                const updatedStorage = readStorage(STORAGE_KEY);
                setStorage(updatedStorage);

                const updatedCurrentId = localStorage.getItem(CURRENT_GEN_KEY);
                if (updatedCurrentId && updatedStorage[updatedCurrentId]) {
                    setCurrentGen(updatedStorage[updatedCurrentId]);
                } else {
                    const lastGen = getLastGeneration(updatedStorage);
                    setCurrentGen(lastGen);
                    if (lastGen) {
                        localStorage.setItem(CURRENT_GEN_KEY, lastGen.exercises.id);
                    }
                }
            }
        };

        window.addEventListener('storage', onStorageChange);
        return () => window.removeEventListener('storage', onStorageChange);
    }, []);

    const saveAnswer = useCallback(
        (questionId: string, selectedAnswer: number, difficulty: Difficulty) => {
            if (!currentGen) return;
            const updatedQuestions = currentGen.exercises.levels[difficulty].map((q) => {
                if (q.id === questionId) {
                    return { ...q, userAnswer: selectedAnswer };
                }
                return q;
            });
            const updatedGen = {
                exercises: {
                    ...currentGen.exercises,
                    levels: {
                        ...currentGen.exercises.levels,
                        [difficulty]: updatedQuestions,
                    },
                },
            };
            setCurrentGen(updatedGen);
            updateGeneration(updatedGen);
        },
        [currentGen]
    );

    const updateCurrentGen = useCallback(
        ({ question, difficulty, currentQuestionId }: UpdateCurrentGenParams) => {
            if (!currentGen) return;
            const updatedQuestions = currentGen.exercises.levels[difficulty].map((q) =>
                q.id === currentQuestionId ? question : q
            );
            const updatedGen = {
                exercises: {
                    ...currentGen.exercises,
                    levels: {
                        ...currentGen.exercises.levels,
                        [difficulty]: updatedQuestions,
                    },
                },
            };
            setCurrentGen(updatedGen);
            updateGeneration(updatedGen);
        },
        [currentGen]
    );

    const generationsArray = useMemo(() => {
        return Object.values(storage)
            .sort((a, b) => b.exercises.createdAt - a.exercises.createdAt)
            .map((gen) => {
                return {
                    ...gen.exercises,
                    createdAt: new Date(gen.exercises.createdAt).toLocaleDateString(),
                };
            });
    }, [storage]);

    const setCurrentGeneration = useCallback(
        (id: string) => {
            setCurrentGen(storage[id]);
            localStorage.setItem(CURRENT_GEN_KEY, id);
        },
        [storage]
    );

    const calculateStats = useCallback((storage: ExercisesStorage): GenerationStats[] => {
        return Object.values(storage).map((gen) => {
            const { id, topic, subtopic, createdAt, levels } = gen.exercises;
            const levelsStats: Record<string, LevelStats> = {};
            for (const [levelName, questions] of Object.entries(levels)) {
                const totalCount = questions.length;
                let answeredCount = 0;
                let correctCount = 0;
                for (const q of questions) {
                    if (q.userAnswer !== null && q.userAnswer !== undefined) {
                        answeredCount++;
                        if (q.userAnswer === q.correctAnswer) {
                            correctCount++;
                        }
                    }
                }
                levelsStats[levelName] = {
                    answeredCount,
                    totalCount,
                    correctCount,
                    completionPercent: totalCount === 0 ? 0 : (answeredCount / totalCount) * 100,
                    accuracyPercent: totalCount === 0 ? 0 : (correctCount / totalCount) * 100,
                };
            }
            return {
                id,
                topic,
                subtopic,
                createdAt,
                levelsStats,
            };
        });
    }, []);

    return {
        lastGeneration: currentGen,
        saveAnswer,
        generationsArray,
        setCurrentGeneration,
        currentGenId: currentGen?.exercises.id,
        calculateStats,
        storage,
        topic: currentGen?.exercises.topic || '',
        subtopic: currentGen?.exercises.subtopic || '',
        updateCurrentGen,
    };
}
