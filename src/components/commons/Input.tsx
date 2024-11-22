import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = ({
    label,
    error,
    className = '',
    ...props
}: InputProps) => {
    return (
        <div className="px-5 py-3 w-full">
            <div>{label}</div>
            <div className="relative">
                <input
                    className={`border border-gray-200 w-full p-3 rounded-md focus:outline-purple-500 ${className}`}
                    {...props}
                />
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default Input;
