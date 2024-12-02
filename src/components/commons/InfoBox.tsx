import { FC, ReactNode } from 'react';

interface InfoBoxProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    variant?: 'default' | 'tip';
}

export const InfoBox: FC<InfoBoxProps> = ({ 
    title, 
    icon, 
    children,
    variant = 'default'
}) => {
    const baseStyles = variant === 'tip' 
        ? 'bg-purple-500/5 border-purple-500/20' 
        : 'bg-gray-800/30 border-gray-700/30';

    return (
        <div className={`p-2.5 rounded-lg border ${baseStyles}`}>
            <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            {children}
        </div>
    );
}; 