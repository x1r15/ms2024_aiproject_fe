import { FC } from 'react';

interface GenreResultCardProps {
    genre: string;
    similarity: number;
    matchedFeatures: string[];
    missingFeatures: string[];
    isTopResult?: boolean;
    formatFeatureName: (feature: string) => string;
}

export const GenreResultCard: FC<GenreResultCardProps> = ({
    genre,
    similarity,
    matchedFeatures,
    missingFeatures,
    isTopResult = false,
    formatFeatureName
}) => {
    const getMatchColor = (similarity: number) => {
        if (similarity >= 75) return 'text-green-400 bg-green-500/5 border-green-500/20';
        if (similarity >= 50) return 'text-yellow-400 bg-yellow-500/5 border-yellow-500/20';
        return 'text-red-400 bg-red-500/5 border-red-500/20';
    };

    return (
        <div className={`p-4 rounded-lg border bg-gray-900/30 
            ${isTopResult ? 'border-purple-500/20' : 'border-gray-700/30'}`}
        >
            <div className="flex items-center gap-3 mb-3">
                <h4 className="text-base font-medium text-gray-300 capitalize">
                    {genre.replace('_', ' ')}
                </h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getMatchColor(similarity)}`}>
                    {similarity.toFixed(1)}%
                </span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full">
                    <div 
                        className={`h-1.5 rounded-full transition-all duration-500
                            ${similarity >= 75 ? 'bg-green-500/70' :
                            similarity >= 50 ? 'bg-yellow-500/70' :
                            'bg-red-500/70'}`}
                        style={{ width: `${similarity}%` }}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-purple-300">
                        <span>Matched Features</span>
                        <div className="group relative">
                            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 p-1.5 
                                bg-gray-800 rounded text-xs text-gray-300 opacity-0 invisible
                                group-hover:opacity-100 group-hover:visible transition-all duration-200
                                border border-gray-700/50">
                                Features that match this genre's typical characteristics
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {matchedFeatures.map(feature => (
                            <span key={feature} 
                                className="px-1.5 py-0.5 bg-purple-500/5 border border-purple-500/20 
                                    rounded text-xs text-purple-300"
                            >
                                {formatFeatureName(feature)}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Suggested Features</span>
                        <div className="group relative">
                            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 p-1.5 
                                bg-gray-800 rounded text-xs text-gray-300 opacity-0 invisible
                                group-hover:opacity-100 group-hover:visible transition-all duration-200
                                border border-gray-700/50">
                                Additional features commonly found in this genre
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {missingFeatures.map(feature => (
                            <span key={feature} 
                                className="px-1.5 py-0.5 bg-gray-800 border border-gray-700/50 
                                    rounded text-xs text-gray-400"
                            >
                                {formatFeatureName(feature)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}; 