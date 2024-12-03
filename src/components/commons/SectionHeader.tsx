import { FC } from 'react';
import { commonStyles } from '../../styles/commonStyles';

interface SectionHeaderProps {
    title: string;
    description: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    description
}) => {
    const { sectionHeader } = commonStyles;
    
    return (
        <div className={sectionHeader.container}>
            <div className={sectionHeader.line.wrapper}>
                <div className={sectionHeader.line.blur} />
                <div className={sectionHeader.line.gradient} />
            </div>
            <div>
                <h2 className={sectionHeader.content.title}>{title}</h2>
                <p className={sectionHeader.content.description}>{description}</p>
            </div>
        </div>
    );
}; 