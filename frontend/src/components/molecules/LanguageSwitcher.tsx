import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';

export const LanguageSwitcher: React.FC = () => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === 'en' ? 'he' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Button onClick={toggleLang} aria-label="Toggle language" variant="secondary">
            {i18n.language === 'en' ? t('header.langHe') : t('header.langEn')}
        </Button>
    );
};
