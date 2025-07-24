import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    className?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseClasses =
        'px-4 py-2 rounded focus:outline-none focus:ring cursor-pointer text-base leading-none select-none disabled:cursor-not-allowed disabled:opacity-50';

    const variantClasses =
        variant === 'primary'
            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500'
            : 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300 disabled:border-gray-300 disabled:text-gray-400';

    return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} />;
};

export const Button = React.memo(ButtonComponent);
