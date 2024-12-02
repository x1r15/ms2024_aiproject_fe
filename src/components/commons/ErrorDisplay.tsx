interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
    return (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <p className="text-red-400">{error}</p>
                    <button 
                        onClick={onRetry}
                        className="mt-2 text-sm text-red-400 hover:text-red-300 
                            underline underline-offset-2 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
} 