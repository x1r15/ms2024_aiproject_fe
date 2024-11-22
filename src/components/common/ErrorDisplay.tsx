interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
    return (
        <div className="text-red-500 bg-red-50 p-4 rounded-md">
            <p>{error}</p>
            <button 
                onClick={onRetry}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
                Try again
            </button>
        </div>
    );
} 