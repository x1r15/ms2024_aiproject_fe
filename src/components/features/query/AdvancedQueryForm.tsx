import { FC } from 'react';
import { commonStyles } from '../../../styles/commonStyles';
import { LoadingSpinner, ExecuteIcon, CopyIcon } from '../../commons/icons';
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
    const { advancedQuery: styles } = commonStyles;

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div>
                    <label htmlFor="query" className={styles.label.wrapper}>
                        <span>Query Input</span>
                        <span className={styles.label.badge}>
                            Prolog Syntax
                        </span>
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            id="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !querying && query.trim()) {
                                    handleQuery();
                                }
                            }}
                            className={styles.input}
                            placeholder="Enter your query (e.g., feature(Feature))"
                            autoComplete="off"
                        />
                        <button
                            onClick={handleQuery}
                            disabled={querying || !query.trim()}
                            className={styles.button.execute}
                        >
                            {querying ? (
                                <>
                                    <LoadingSpinner />
                                    <span>Processing</span>
                                </>
                            ) : (
                                <>
                                    <span>Execute</span>
                                    <ExecuteIcon />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <div className={styles.labelWrapper}>
                        <label htmlFor="answer" className={styles.label.wrapper}>
                            Query Result
                        </label>
                        {answer && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(answer);
                                    showToast.success('Copied to clipboard');
                                }}
                                className={styles.button.copy}
                                title="Copy to clipboard"
                            >
                                <CopyIcon />
                                <span className="text-sm">Copy</span>
                            </button>
                        )}
                    </div>
                    <div className={styles.resultWrapper}>
                        <textarea
                            id="answer"
                            readOnly
                            value={answer}
                            rows={8}
                            className={styles.textarea}
                            placeholder="Results will be displayed here in JSON format..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};