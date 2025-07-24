import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';
import { TopicForm } from '../molecules/TopicForm';
import { ExerciseTest } from '../molecules/exerciseTest/ExerciseTest';
import { HistoryList } from '../molecules/HistoryList';
import { Statistics } from '../molecules/Statistics';

type Mode = 'form' | 'test' | 'history' | 'stats';

export const Content: React.FC = () => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<Mode>('form');

    const modes: { key: Mode; label: string }[] = [
        { key: 'form', label: t('navigation.formTab') },
        { key: 'test', label: t('navigation.startTestBtn') },
        { key: 'history', label: t('navigation.history') },
        { key: 'stats', label: t('navigation.stats') },
    ];

    return (
        <main className="p-4 flex-grow flex flex-col">
            <nav
                className="mb-4 flex space-x-4 justify-between"
                role="tablist"
                aria-label="Content navigation"
            >
                {modes.map(({ key, label }) => (
                    <Button
                        key={key}
                        onClick={() => setMode(key)}
                        variant={mode === key ? 'primary' : 'secondary'}
                        aria-selected={mode === key}
                        role="tab"
                    >
                        {label}
                    </Button>
                ))}
            </nav>

            <section
                className="flex-grow border rounded p-4 shadow"
                role="tabpanel"
                aria-live="polite"
            >
                {mode === 'form' && <TopicForm />}
                {mode === 'test' && <ExerciseTest />}
                {mode === 'history' && <HistoryList />}
                {mode === 'stats' && <Statistics />}
            </section>
        </main>
    );
};
