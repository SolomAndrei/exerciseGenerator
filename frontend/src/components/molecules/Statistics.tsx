import React from 'react';
import { useTranslation } from 'react-i18next';
import { useExercisesStorage } from '../../storage/useExercisesStorage';

export const Statistics: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { calculateStats, storage } = useExercisesStorage();
    const stats = calculateStats(storage);

    if (!stats.length)
        return (
            <p dir={i18n.language === 'he' ? 'rtl' : 'ltr'} className="text-center">
                {t('test.noExercisesMessage')}
            </p>
        );

    return (
        <div className="p-4 space-y-6">
            {stats.map(({ id, topic, subtopic, createdAt, levelsStats }) => (
                <section
                    key={id}
                    className="border rounded p-4 shadow bg-white"
                    dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
                    aria-label={`${topic} — ${subtopic} ${t(
                        'statistics.generatedOn',
                        'Generated on'
                    )} ${new Date(createdAt).toLocaleDateString()}`}
                >
                    <h3 className="text-xl font-semibold mb-2">
                        {topic} — {subtopic}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        {t('statistics.generatedOn')}: {new Date(createdAt).toLocaleDateString()}
                    </p>
                    <div className="space-y-2">
                        {Object.entries(levelsStats).map(([level, stat]) => (
                            <div
                                key={level}
                                className="flex justify-between border-t pt-2 text-sm"
                                aria-label={`${t(`statistics.levelNames.${level}`, level)}: ${t(
                                    'statistics.completion'
                                )}: ${stat.completionPercent.toFixed(1)}%, ${t(
                                    'statistics.accuracy'
                                )}: ${stat.accuracyPercent.toFixed(1)}%`}
                            >
                                <span className="font-medium">
                                    {t(`statistics.levelNames.${level}`, level)}
                                </span>
                                <span>
                                    {t('statistics.completion')}:{' '}
                                    {stat.completionPercent.toFixed(1)}%, {t('statistics.accuracy')}
                                    : {stat.accuracyPercent.toFixed(1)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};
