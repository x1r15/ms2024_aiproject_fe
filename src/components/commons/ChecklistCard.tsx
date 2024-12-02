import { FC, ReactNode } from 'react';

interface ChecklistCardProps {
    title: string;
    subtitle?: string;
    headerIcon?: ReactNode;
    headerRight?: ReactNode;
    children: ReactNode;
    className?: string;
}

export const ChecklistCard: FC<ChecklistCardProps> = ({
    title,
    subtitle,
    headerIcon,
    headerRight,
    children,
    className = ''
}) => {
    return (
        <div className={`bg-gray-900/50 p-6 rounded-lg shadow-lg border border-gray-800/50 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                    <h3 className="text-base font-medium text-gray-200 flex items-center gap-2">
                        {headerIcon}
                        <span>{title}</span>
                    </h3>
                    {subtitle && (
                        <p className="text-sm text-gray-400">{subtitle}</p>
                    )}
                </div>
                {headerRight && (
                    <div className="text-sm text-gray-400">
                        {headerRight}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}; 