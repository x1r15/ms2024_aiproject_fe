import { FC, ReactNode } from 'react';
import { commonStyles } from '../../styles/commonStyles';

interface ChecklistCardProps {
    title: string;
    subtitle?: string;
    headerIcon?: ReactNode;
    headerRight?: ReactNode;
    children: ReactNode;
    className?: string;
}

export const ChecklistCard: FC<ChecklistCardProps> = ({
    title,
    subtitle,
    headerIcon,
    headerRight,
    children,
    className = ''
}) => {
    const { container, header } = commonStyles.checklistCard;
    
    return (
        <div className={`${container} ${className}`}>
            <div className={header.wrapper}>
                <div className={header.titleWrapper}>
                    <h3 className={header.title}>
                        {headerIcon}
                        <span>{title}</span>
                    </h3>
                    {subtitle && (
                        <p className={header.subtitle}>{subtitle}</p>
                    )}
                </div>
                {headerRight && (
                    <div className={header.right}>
                        {headerRight}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}; 