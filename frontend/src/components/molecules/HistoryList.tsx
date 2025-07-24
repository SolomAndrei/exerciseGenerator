import React from 'react';
import { useTranslation } from 'react-i18next';
import { useExercisesStorage } from '../../storage/useExercisesStorage';

export const HistoryList: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { generationsArray, setCurrentGeneration, currentGenId } = useExercisesStorage();

    if (generationsArray.length === 0) {
        return (
            <p className="text-center p-4" dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
                {t('history.noGenerations')}
            </p>
        );
    }

    return (
        <section
            className="p-4 border rounded shadow space-y-2"
            dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
            aria-label={t('history.title')}
        >
            <h2 className="text-xl font-semibold mb-4">{t('history.title')}</h2>
            <ul>
                {generationsArray.map(({ id, topic, subtopic, createdAt }) => {
                    const isActive = id === currentGenId;
                    return (
                        <li
                            key={id}
                            tabIndex={0}
                            role="button"
                            onClick={() => setCurrentGeneration(id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setCurrentGeneration(id);
                                }
                            }}
                            className={`
                                cursor-pointer border-b py-2 last:border-b-0
                                overflow-hidden whitespace-nowrap
                                ${isActive ? 'bg-blue-100 font-semibold' : 'bg-white'}
                                hover:bg-blue-50 focus:bg-blue-50 focus:outline-none
                                
                                `}
                            aria-current={isActive ? 'true' : undefined}
                            title={`${topic} — ${subtopic}`}
                        >
                            <div className="text-ellipsis font-semibold" title={topic}>
                                {topic}
                            </div>
                            <div className="text-ellipsis" title={subtopic}>
                                {subtopic}
                            </div>
                            <small className="text-gray-500">{createdAt}</small>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
