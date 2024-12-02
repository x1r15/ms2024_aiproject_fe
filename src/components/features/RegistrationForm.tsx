import { useState } from 'react';
import Input from '../commons/Input';
import { api } from '../../services/api';
import { BiSolidInvader } from 'react-icons/bi';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Footer } from '../commons/Footer';

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
        <>
            <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden 
                transform transition-all duration-300 border border-gray-800/50">
                <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-br from-purple-600/80 
                    to-purple-900/80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                    <div className="relative z-10">
                        <BiSolidInvader className="w-16 h-16 mx-auto text-purple-300 mb-4 
                            transform hover:scale-110 transition-transform duration-200 
                            hover:rotate-3" />
                        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                            Create Account
                        </h2>
                        <p className="text-purple-200/90">Join the Predi Gamer community</p>
                    </div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }} 
                className="p-8 space-y-6"
                >
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        icon={<span className="text-gray-400">@</span>}
                        required
                        autoFocus
                    />

                    <div className="space-y-4">
                        <Input
                            label="Password"
                            type={showPasswords ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(!showPasswords)}
                                    className="text-gray-400 hover:text-gray-300 focus:outline-none"
                                >
                                    {showPasswords ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            }
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type={showPasswords ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
                            required
                        />
                    </div>

                    <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10">
                        <h3 className="text-sm font-medium text-purple-400 mb-2">Password Requirements</h3>
                        <ul className="space-y-1">
                            {[
                                { check: password.length >= 8, text: 'At least 8 characters' },
                                { check: /[a-z]/.test(password), text: 'One lowercase letter' },
                                { check: /[A-Z]/.test(password), text: 'One uppercase letter' },
                                { check: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'One special character' }
                            ].map((req, index) => (
                                <li key={index} className="flex items-center gap-2 text-xs">
                                    <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                        ${req.check 
                                            ? 'bg-green-500/10 text-green-400' 
                                            : 'bg-gray-800/50 text-gray-500'}`}>
                                        {req.check ? '✓' : '·'}
                                    </span>
                                    <span className={req.check ? 'text-gray-300' : 'text-gray-500'}>
                                        {req.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {errors.general && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg 
                            animate-fadeIn">
                            <p className="text-red-400 text-sm flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" 
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                        strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.general}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 
                            text-white font-medium rounded-lg shadow-lg 
                            hover:from-purple-600 hover:to-purple-700 
                            focus:outline-none focus:ring-2 focus:ring-purple-500/40 
                            focus:ring-offset-2 focus:ring-offset-gray-900
                            transition-all duration-200 transform hover:scale-[1.02]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            disabled:hover:scale-100"
                    >
                        Create Account
                    </button>

                    <div className="text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={onLoginClick}
                                className="text-purple-400 hover:text-purple-300 font-medium 
                                    focus:outline-none focus:underline transition-colors duration-200"
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
} 