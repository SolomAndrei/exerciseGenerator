import React from 'react';
import { useTranslation } from 'react-i18next';
import { useExercisesStorage } from '../../../storage/useExercisesStorage';
import { DifficultyTabs } from './DifficultyTabs';
import type { Difficulty } from './DifficultyTabs';
import { QuestionNavigator } from './QuestionNavigator';

export const ExerciseTest: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { lastGeneration, saveAnswer, topic, subtopic, updateCurrentGen } = useExercisesStorage();

    const [difficulty, setDifficulty] = React.useState<Difficulty>('beginner');

    if (!lastGeneration)
        return (
            <p dir={i18n.language === 'he' ? 'rtl' : 'ltr'} className="text-center">
                {t('test.noExercisesMessage')}
            </p>
        );

    return (
        <div className="flex flex-col gap-4">
            <DifficultyTabs activeTab={difficulty} onChange={setDifficulty} />
            <div>
                <div style={{ display: difficulty === 'beginner' ? 'block' : 'none' }}>
                    <QuestionNavigator
                        questions={lastGeneration.exercises.levels.beginner}
                        onAnswer={saveAnswer}
                        difficulty={difficulty}
                        topic={topic}
                        subtopic={subtopic}
                        updateCurrentGen={updateCurrentGen}
                    />
                </div>
                <div style={{ display: difficulty === 'intermediate' ? 'block' : 'none' }}>
                    <QuestionNavigator
                        questions={lastGeneration.exercises.levels.intermediate}
                        onAnswer={saveAnswer}
                        difficulty={difficulty}
                        topic={topic}
                        subtopic={subtopic}
                        updateCurrentGen={updateCurrentGen}
                    />
                </div>
                <div style={{ display: difficulty === 'expert' ? 'block' : 'none' }}>
                    <QuestionNavigator
                        questions={lastGeneration.exercises.levels.expert}
                        onAnswer={saveAnswer}
                        difficulty={difficulty}
                        topic={topic}
                        subtopic={subtopic}
                        updateCurrentGen={updateCurrentGen}
                    />
                </div>
            </div>
        </div>
    );
};
