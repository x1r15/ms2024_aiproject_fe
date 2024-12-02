import { FC, ReactNode } from 'react';
import { ExamplesBox } from '../../commons/ExamplesBox';
import { InfoBox } from '../../commons/InfoBox';
import { PROLOG_QUERY_EXAMPLES } from '../../../data/queryExamples';

export const QueryExamplesSection: FC = () => {
    const queryIcon = (
        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    );

    return (
        <div className="space-y-4">
            <ExamplesBox 
                groups={PROLOG_QUERY_EXAMPLES} 
                icon={queryIcon}
            />

            <InfoBox
                title="Quick Tips"
                variant="tip"
                icon={
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            >
                <div className="text-xs text-gray-400">
                    <p className="mb-1">Use square brackets for lists: <code className="text-purple-400">[item1, item2]</code></p>
                    <p>Variables must be capitalized: <code className="text-purple-400">Feature, Genre</code></p>
                </div>
            </InfoBox>
        </div>
    );
}; 