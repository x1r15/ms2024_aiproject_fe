import { FC, ReactNode } from 'react';
import { commonStyles } from '../../styles/commonStyles';

interface InfoBoxProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    variant?: 'default' | 'tip';
}

export const InfoBox: FC<InfoBoxProps> = ({ 
    title, 
    icon, 
    children,
    variant = 'default'
}) => {
    const { infoBox } = commonStyles;
    const baseStyles = infoBox.base[variant];

    return (
        <div className={`${infoBox.container} ${baseStyles}`}>
            <h3 className={infoBox.title}>
                {icon}
                {title}
            </h3>
            {children}
        </div>
    );
}; 