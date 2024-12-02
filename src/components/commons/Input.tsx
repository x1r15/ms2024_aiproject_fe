import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export default function Input({ 
    label, 
    error, 
    icon, 
    rightIcon, 
    className = '', 
    ...props 
}: InputProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <div className="relative rounded-lg shadow-sm">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    {...props}
                    className={`
                        block w-full rounded-lg
                        ${icon ? 'pl-10' : 'pl-4'} 
                        ${rightIcon ? 'pr-10' : 'pr-4'}
                        py-2.5 
                        bg-gray-800/50 
                        border ${error ? 'border-red-500/50' : 'border-gray-700/50'}
                        text-gray-200 
                        placeholder-gray-500
                        transition-all duration-200
                        focus:ring-2 
                        focus:ring-purple-500/20 
                        focus:border-purple-500/50 
                        focus:outline-none
                        hover:bg-gray-800/70
                        ${className}
                    `}
                />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}
