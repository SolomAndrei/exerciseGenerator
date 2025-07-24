import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';
import { useMutation } from '@tanstack/react-query';
import { LoadingOverlay } from '../atoms/LoadingOverlay';
import { postExercise } from '../../api/exercises';
import { saveNewGeneration } from '../../storage/exercisesStorage';
import { useExercisesStorage } from '../../storage/useExercisesStorage';

export const TopicForm: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { setCurrentGeneration } = useExercisesStorage();

    const [topic, setTopic] = useState('');
    const [subtopic, setSubtopic] = useState('');

    const mutation = useMutation({
        mutationFn: postExercise,
        onSuccess: (data) => {
            setTopic('');
            setSubtopic('');
            saveNewGeneration(data);
            setCurrentGeneration(data.exercises.id);
        },
    });

    const canSubmit = topic.trim() !== '' && subtopic.trim() !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        mutation.mutate({ topic: topic.trim(), subtopic: subtopic.trim() });
    };

    return (
        <div className="max-w-md mx-auto px-4">
            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                <label htmlFor="topic" className="font-semibold">
                    {t('form.topicLabel')}
                </label>
                <input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t('form.topicPlaceholder')}
                    className="border rounded px-3 py-2"
                    required
                    autoComplete="off"
                    dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
                />

                <label htmlFor="subtopic" className="font-semibold">
                    {t('form.subtopicLabel')}
                </label>
                <input
                    id="subtopic"
                    type="text"
                    value={subtopic}
                    onChange={(e) => setSubtopic(e.target.value)}
                    placeholder={t('form.subtopicPlaceholder')}
                    className="border rounded px-3 py-2"
                    required
                    autoComplete="off"
                    dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
                />

                <Button
                    type="submit"
                    disabled={!canSubmit}
                    variant={canSubmit ? 'primary' : 'secondary'}
                    className="w-full"
                >
                    {t('form.generateBtn')}
                </Button>
            </form>
            {mutation.isPending && <LoadingOverlay />}
            {mutation.isError && (
                <p className="text-red-600 break-words">
                    Error: {(mutation.error as Error).message}
                </p>
            )}

            {mutation.isSuccess && mutation.data && (
                <p className="bg-gray-100 p-2 rounded mt-4 text-center">
                    {t('form.dataReceived')} / {t('form.pressStartTestBtn')}
                </p>
            )}
        </div>
    );
};
