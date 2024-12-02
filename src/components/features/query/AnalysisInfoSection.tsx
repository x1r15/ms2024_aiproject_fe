import { FC } from 'react';
import { InfoBox } from '../../commons/InfoBox';

interface AnalysisInfo {
    title: string;
    examples: { code: string; description: string; }[];
}

const analysisInfo: AnalysisInfo[] = [
    {
        title: "Analysis Results Include",
        examples: [
            { code: "Primary and secondary genre matches", description: "" },
            { code: "Feature-genre correlation analysis", description: "" },
            { code: "Missing features identification", description: "" }
        ]
    },
    {
        title: "Quick Tip",
        examples: [
            { 
                code: "Multiple Features Selection", 
                description: "Select multiple features for more accurate genre matching. The analysis engine will consider all selected features to provide comprehensive results." 
            }
        ]
    }
];

export const AnalysisInfoSection: FC = () => {
    return (
        <div className="space-y-4">
            <InfoBox
                title="Analysis Results Include"
                icon={
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
            >
                <ul className="space-y-2.5">
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-purple-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Primary and secondary genre matches
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-purple-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Feature-genre correlation analysis
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-purple-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Missing features identification
                    </li>
                </ul>
            </InfoBox>

            <InfoBox
                title="Quick Tip"
                variant="tip"
                icon={
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            >
                <p className="text-xs text-gray-400">
                    Select multiple features for more accurate genre matching. The analysis engine will consider all selected features to provide comprehensive results.
                </p>
            </InfoBox>
        </div>
    );
}; 