import React, { useState, useEffect } from 'react';
import type { Question, UpdateCurrentGenParams } from '../../../storage/types';
import { useTranslation } from 'react-i18next';
import { Button } from '../../atoms/Button';
import { LoadingOverlay } from '../../atoms/LoadingOverlay';
import type { Difficulty } from './DifficultyTabs';
import { regenerateExercise } from '../../../api/exercises';
import { useMutation } from '@tanstack/react-query';

interface QuestionNavigatorProps {
    questions: Question[];
    onAnswer?: (questionId: string, selectedAnswer: number, difficulty: Difficulty) => void;
    difficulty: Difficulty;
    updateCurrentGen: ({ question, difficulty, currentQuestionId }: UpdateCurrentGenParams) => void;
    topic: string;
    subtopic: string;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
    questions,
    onAnswer,
    difficulty,
    updateCurrentGen,
    topic,
    subtopic,
}) => {
    const { t, i18n } = useTranslation();
    const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number | null>>(() =>
        Object.fromEntries(questions.map((q) => [q.id, q.userAnswer]))
    );

    useEffect(() => {
        setAnswers(Object.fromEntries(questions.map((q) => [q.id, q.userAnswer])));
    }, [questions]);

    const currentQuestion = questions[currentIndex];
    const selectedAnswer = answers[currentQuestion.id];

    const mutation = useMutation({
        mutationFn: regenerateExercise,
        onSuccess: (data) => {
            updateCurrentGen({
                question: data,
                difficulty,
                currentQuestionId: currentQuestion.id,
            });
        },
    });

    const handleSelectAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: index }));
        if (onAnswer) {
            onAnswer(currentQuestion.id, index, difficulty);
        }
    };

    const goNext = () => {
        if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleRegenerate = () => {
        mutation.mutate({ difficulty, topic, subtopic });
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-lg font-semibold mb-2">
                {t('test.questionProgress', { current: currentIndex + 1, total: questions.length })}
            </h2>
            <span className="mb-4 w-100 block">{currentQuestion.question}</span>
            <ul className="mb-4 space-y-2 list-none p-0">
                {currentQuestion.choices.map((choice, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = currentQuestion.correctAnswer === idx;
                    const isAnswered = selectedAnswer !== null;
                    let bgColor = 'bg-gray-100 hover:bg-gray-200 cursor-pointer';
                    if (isAnswered) {
                        if (isSelected && isCorrect) bgColor = 'bg-green-300';
                        else if (isSelected && !isCorrect) bgColor = 'bg-red-300';
                        else if (isCorrect) bgColor = 'bg-green-200';
                        else bgColor = 'bg-gray-100';
                    }
                    return (
                        <li
                            key={idx}
                            className={`w-100 block p-3 rounded border ${bgColor} ${
                                isAnswered ? 'cursor-default' : 'cursor-pointer'
                            }`}
                            onClick={() => !isAnswered && handleSelectAnswer(idx)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if ((e.key === 'Enter' || e.key === ' ') && !isAnswered) {
                                    handleSelectAnswer(idx);
                                }
                            }}
                            aria-pressed={isSelected}
                        >
                            {choice}
                        </li>
                    );
                })}
            </ul>

            {selectedAnswer !== null && (
                <div
                    dir={dir}
                    className="p-3 w-100 block bg-gray-100 rounded border-l-4 border-blue-500 mb-4"
                >
                    <strong dir={dir}>
                        {t('test.explanationLabel')}
                        <br />
                    </strong>
                    {currentQuestion.explanation}
                </div>
            )}
            <div className="flex justify-between">
                <Button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    variant="secondary"
                    className="px-4 py-2 rounded disabled:opacity-50"
                >
                    {t('test.prev')}
                </Button>

                <Button
                    onClick={goNext}
                    disabled={currentIndex === questions.length - 1}
                    variant="secondary"
                    className="px-4 py-2 rounded disabled:opacity-50"
                >
                    {t('test.next')}
                </Button>
            </div>
            <Button onClick={handleRegenerate} variant="primary" className="w-full mt-4">
                {t('test.regenerate')}
            </Button>
            {mutation.isPending && <LoadingOverlay />}
            {mutation.isError && (
                <p className="text-red-600 break-words">
                    Error: {(mutation.error as Error).message}
                </p>
            )}
        </div>
    );
};
