import { InputHTMLAttributes } from 'react';
import { commonStyles } from '../../styles/commonStyles';
import { InputErrorIcon } from './icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export default function Input({ 
    label, 
    error, 
    icon, 
    rightIcon, 
    className = '', 
    ...props 
}: InputProps) {
    const { input } = commonStyles;
    
    return (
        <div className={input.wrapper}>
            <label className={input.label}>
                {label}
            </label>
            <div className={input.container}>
                {icon && (
                    <div className={input.iconWrapper.left}>
                        {icon}
                    </div>
                )}
                <input
                    {...props}
                    className={`
                        ${input.field.base}
                        ${icon ? input.field.withLeftIcon : input.field.withoutLeftIcon} 
                        ${rightIcon ? input.field.withRightIcon : input.field.withoutRightIcon}
                        ${error ? input.field.error : ''}
                        ${className}
                    `}
                />
                {rightIcon && (
                    <div className={input.iconWrapper.right}>
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p className={input.error.message}>
                    <InputErrorIcon />
                    {error}
                </p>
            )}
        </div>
    );
}
