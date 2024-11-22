import { toast } from 'react-hot-toast';

const toastStyles = {
    success: {
        duration: 4000,
        style: {
            background: '#10B981',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
        },
    },
    error: {
        duration: 4000,
        style: {
            background: '#EF4444',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
        },
    },
};

export const showToast = {
    success: (message: string) => toast.success(message, toastStyles.success),
    error: (message: string) => toast.error(message, toastStyles.error),
}; 