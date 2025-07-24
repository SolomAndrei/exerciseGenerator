import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="text-center p-4 border-t mt-auto bg-gray-50">
            <small className="text-gray-600">{t('footer.text')}</small>
        </footer>
    );
};
