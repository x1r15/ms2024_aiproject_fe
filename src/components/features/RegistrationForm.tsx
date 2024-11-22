import { useState } from 'react';
import Input from '../commons/Input';
import { api } from '../../services/api';

interface RegistrationFormProps {
    onRegistrationSuccess?: () => void;
    onLoginClick?: () => void;
}

export function RegistrationForm({ onRegistrationSuccess, onLoginClick }: RegistrationFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        confirmPassword?: string;
        general?: string;
    }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const hasMinLength = password.length >= 8;
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: hasMinLength && hasLowerCase && hasUpperCase && hasSpecialChar,
            message: !hasMinLength 
                ? 'Password must be at least 8 characters long'
                : !hasLowerCase 
                ? 'Password must contain a lowercase letter'
                : !hasUpperCase 
                ? 'Password must contain an uppercase letter'
                : !hasSpecialChar 
                ? 'Password must contain a special character'
                : ''
        };
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.message;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            await api.post('/register', { 
                email, 
                password 
            });
            
            setErrors({});
            onRegistrationSuccess?.();
        } catch (err: any) {
            setErrors({
                general: err.response?.data?.message || 'Registration failed. Please try again.'
            });
            console.error('Registration error:', err.response || err);
        }
    };

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
            }} 
            className="flex flex-col w-full"
        >
            <div className="flex flex-col justify-center items-center w-full px-4 py-8">
                <div className="text-lg">Create your account</div>
                <div className="text-gray-400">
                    Already have an account? {' '}
                    <button 
                        type="button"
                        onClick={onLoginClick}
                        className="text-purple-500 underline hover:text-purple-700"
                    >
                        Login!
                    </button>
                </div>
            </div>

            <Input
                label="Email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
            />

            <Input
                label="Password"
                type={showPasswords ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
            />

            <Input
                label="Confirm Password"
                type={showPasswords ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
            />

            <div className="px-5 -mt-2 mb-2 flex justify-end">
                <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="text-purple-500 text-sm hover:text-purple-700"
                >
                    {showPasswords ? "Hide passwords" : "Show passwords"}
                </button>
            </div>

            <div className="px-5 py-3 w-full flex flex-col justify-center items-center">
                    <button type="submit"
                        className="shadow-md text-white w-2/3 bg-gradient-to-tr from-purple-500 to-purple-900 p-2 mt-10 rounded-md"
                    >SIGN UP</button>

                    <div className="py-3">
                        {errors && <div className="px-5 text-red-500">{errors.general && <div className="px-5 mt-3 text-red-500">{errors.general}</div>}</div>}
                    </div>
                </div>

            
        </form>
    );
} 