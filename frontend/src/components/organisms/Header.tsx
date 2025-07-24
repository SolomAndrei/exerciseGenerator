import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';

export const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <div className="text-xl font-bold">{t('header.logo')}</div>
            <LanguageSwitcher />
        </header>
    );
};
