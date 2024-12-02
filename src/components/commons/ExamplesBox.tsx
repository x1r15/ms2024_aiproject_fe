import { FC } from 'react';
import { QueryExample, QueryExampleGroup } from '../../types/query';

interface ExamplesBoxProps {
    groups: QueryExampleGroup[];
    icon?: React.ReactNode;
}

export const ExamplesBox: FC<ExamplesBoxProps> = ({ groups, icon }) => {
    return (
        <div className="space-y-2">
            {groups.map((group) => (
                <div key={group.title} className="p-2.5 bg-gray-800/30 rounded-lg border border-gray-700/30">
                    <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        {icon}
                        {group.title}
                    </h3>
                    <div className="space-y-1.5">
                        {group.examples.map((example) => (
                            <div key={example.code} 
                                className="p-2 bg-gray-900/40 rounded border border-gray-800/30
                                    hover:border-purple-500/20 transition-colors duration-200"
                            >
                                <code className="text-xs font-mono text-purple-400">{example.code}</code>
                                <p className="text-xs text-gray-400 mt-1">{example.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}; 