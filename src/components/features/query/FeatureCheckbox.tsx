import { FC } from 'react';

interface FeatureCheckboxProps {
    feature: string;
    isSelected: boolean;
    onToggle: (feature: string) => void;
    formatFeatureName: (feature: string) => string;
}

export const FeatureCheckbox: FC<FeatureCheckboxProps> = ({
    feature,
    isSelected,
    onToggle,
    formatFeatureName
}) => {
    return (
        <label
            className={`relative flex items-center p-2 rounded-lg cursor-pointer
                select-none transition-all duration-200 group
                ${isSelected 
                    ? 'bg-purple-500/5 border border-purple-500/30' 
                    : 'hover:bg-gray-800/80 border border-gray-700/50'}`}
        >
            <div className="relative flex items-center h-5">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(feature)}
                    className="sr-only peer"
                />
                <div className={`
                    w-4 h-4 rounded flex items-center justify-center
                    transition-all duration-200
                    ${isSelected
                        ? 'bg-purple-500'
                        : 'border border-gray-500 bg-gray-800 group-hover:border-purple-500/30'
                    }
                    peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500/30
                    peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-gray-900
                `}>
                    {isSelected && (
                        <svg 
                            className="w-3 h-3 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <span className={`ml-2 text-sm transition-colors duration-200
                ${isSelected
                    ? 'text-purple-300'
                    : 'text-gray-400 group-hover:text-gray-300'
                }`}>
                {formatFeatureName(feature)}
            </span>
        </label>
    );
}; 