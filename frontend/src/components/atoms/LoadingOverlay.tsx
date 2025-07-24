import React from 'react';
import { PacmanLoader } from 'react-spinners';

export const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black opacity-40 flex justify-center items-center z-50 pointer-events-auto">
            <PacmanLoader size={80} color="#4fa94d" loading={true} aria-label="pacman-loading" />
        </div>
    );
};
