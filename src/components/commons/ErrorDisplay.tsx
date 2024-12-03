import { commonStyles } from '../../styles/commonStyles';
import { ErrorIcon } from './icons';

interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
    const { errorDisplay } = commonStyles;

    return (
        <div className={errorDisplay.container}>
            <div className={errorDisplay.content}>
                <ErrorIcon />
                <div>
                    <p className={errorDisplay.text}>{error}</p>
                    <button 
                        onClick={onRetry}
                        className={errorDisplay.button}
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
} 