import { FC } from 'react';
import { commonStyles } from '../../styles/commonStyles';

interface CodeExampleProps {
    code: string;
    description: string;
}

export const CodeExample: FC<CodeExampleProps> = ({ code, description }) => {
    const { codeExample } = commonStyles;
    
    return (
        <div className={codeExample.container}>
            <code className={codeExample.code}>{code}</code>
            <p className={codeExample.description}>{description}</p>
        </div>
    );
}; 