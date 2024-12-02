import { FC } from 'react';

interface CodeExampleProps {
    code: string;
    description: string;
}

export const CodeExample: FC<CodeExampleProps> = ({ code, description }) => {
    return (
        <div className="p-2 bg-gray-900/50 rounded border border-gray-700/30 hover:border-purple-500/20 transition-colors duration-200">
            <code className="text-xs font-mono text-purple-400">{code}</code>
            <p className="text-xs text-gray-400 mt-1 font-normal">{description}</p>
        </div>
    );
}; 