import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../atoms/Button';

export type Difficulty = 'beginner' | 'intermediate' | 'expert';

interface DifficultyTabsProps {
    activeTab: Difficulty;
    onChange: (tab: Difficulty) => void;
}

export const DifficultyTabs: React.FC<DifficultyTabsProps> = ({ activeTab, onChange }) => {
    const { t } = useTranslation();
    const difficulties: Difficulty[] = ['beginner', 'intermediate', 'expert'];

    return (
        <nav className="flex justify-between" role="tablist" aria-label="Select difficulty">
            {difficulties.map((level) => (
                <Button
                    key={level}
                    role="tab"
                    aria-selected={activeTab === level}
                    variant={activeTab === level ? 'primary' : 'secondary'}
                    onClick={() => onChange(level)}
                    className="px-4 py-2"
                >
                    {t(`test.difficulty.${level}`)}
                </Button>
            ))}
        </nav>
    );
};
