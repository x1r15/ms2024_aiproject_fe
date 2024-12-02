import { FC } from 'react';

interface SectionHeaderProps {
    title: string;
    description: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    description
}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="relative h-12">
                <div className="absolute w-0.5 h-full bg-purple-500/20 rounded-full blur-[2px]" />
                <div className="relative w-0.5 h-full bg-gradient-to-b from-purple-500 to-purple-500/50 rounded-full" />
            </div>
            <div>
                <h2 className="text-lg font-medium text-gray-200">{title}</h2>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    );
}; 