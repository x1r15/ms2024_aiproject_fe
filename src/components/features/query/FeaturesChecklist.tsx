import { FC } from 'react';
import { ChecklistCard } from '../../commons/ChecklistCard';
import { FeatureCheckbox } from './FeatureCheckbox';

interface Feature {
    Feature: string;
}

interface FeaturesChecklistProps {
    features: Feature[];
    selectedFeatures: string[];
    onFeatureToggle: (feature: string) => void;
    formatFeatureName: (feature: string) => string;
    isLoading: boolean;
    onAnalyze: () => void;
    isAnalyzing: boolean;
}

export const FeaturesChecklist: FC<FeaturesChecklistProps> = ({
    features,
    selectedFeatures,
    onFeatureToggle,
    formatFeatureName,
    isLoading,
    onAnalyze,
    isAnalyzing
}) => {
    return (
        <ChecklistCard
            title="Game Features"
            headerIcon={
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            }
            headerRight={`${selectedFeatures.length} selected`}
        >
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3 text-gray-400">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Loading features...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {features.map(({ Feature }) => (
                            <FeatureCheckbox
                                key={Feature}
                                feature={Feature}
                                isSelected={selectedFeatures.includes(Feature)}
                                onToggle={onFeatureToggle}
                                formatFeatureName={formatFeatureName}
                            />
                        ))}
                    </div>

                    {/* Analysis Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={onAnalyze}
                            disabled={isAnalyzing || selectedFeatures.length === 0}
                            className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 
                                text-purple-400 rounded-lg hover:bg-purple-500/30 
                                focus:outline-none focus:ring-2 focus:ring-purple-500/40 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200
                                flex items-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Analyzing Features...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    <span>Analyze Features</span>
                                </>
                            )}
                        </button>
                    </div>
                </>
            )}
        </ChecklistCard>
    );
}; 