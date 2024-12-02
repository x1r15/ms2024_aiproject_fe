import { FC, KeyboardEvent } from 'react';
import { showToast } from '../../../utils/toast';

interface AdvancedQueryFormProps {
    query: string;
    setQuery: (query: string) => void;
    handleQuery: () => void;
    querying: boolean;
    answer: string;
}

export const AdvancedQueryForm: FC<AdvancedQueryFormProps> = ({
    query,
    setQuery,
    handleQuery,
    querying,
    answer
}) => {
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !querying && query.trim()) {
            handleQuery();
        }
    };

    return (
        <div className="bg-gray-900/50 p-6 rounded-lg shadow-lg border border-gray-800/50">
            <div className="space-y-4">
                <div>
                    <label htmlFor="query" className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
                        <span>Query Input</span>
                        <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full">
                            Prolog Syntax
                        </span>
                    </label>
                    <div className="mt-1 flex gap-2">
                        <input
                            type="text"
                            id="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                                text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 
                                focus:border-purple-500/40 text-sm font-mono placeholder-gray-500"
                            placeholder="Enter your query (e.g., feature(Feature))"
                            autoComplete="off"
                        />
                        <button
                            onClick={handleQuery}
                            disabled={querying || !query.trim()}
                            className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 
                                text-purple-400 rounded-lg hover:bg-purple-500/30 
                                focus:outline-none focus:ring-2 focus:ring-purple-500/40 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200 flex items-center gap-2"
                        >
                            {querying ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Processing</span>
                                </>
                            ) : (
                                <>
                                    <span>Execute</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="answer" className="block text-sm font-medium text-gray-200 mb-2">
                        Query Result
                    </label>
                    <div className="relative">
                        <textarea
                            id="answer"
                            readOnly
                            value={answer}
                            rows={8}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                                text-gray-200 font-mono text-sm placeholder-gray-500"
                            placeholder="Results will be displayed here in JSON format..."
                        />
                        {answer && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(answer);
                                    showToast.success('Copied to clipboard');
                                }}
                                className="absolute top-2 right-2 p-2 text-gray-400 
                                    hover:text-purple-400 rounded-md hover:bg-gray-700/50
                                    transition-colors"
                                title="Copy to clipboard"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 