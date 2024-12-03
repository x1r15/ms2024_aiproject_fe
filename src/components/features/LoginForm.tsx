import { useState, useEffect } from 'react';
import Input from '../commons/Input';
import { api } from '../../services/api';
import { Footer } from '../commons/Footer';
import { commonStyles } from '../../styles/commonStyles';
import { Logo, ShowPasswordIcon, HidePasswordIcon, SuccessIcon, LoadingSpinner } from '../commons/icons';

interface LoginFormProps {
    onLoginSuccess?: () => void;
    onSignUpClick?: () => void;
    registrationSuccess?: boolean;
}

export function LoginForm({ onLoginSuccess, onSignUpClick, registrationSuccess }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (registrationSuccess) {
            setEmail(''); // Clear email if coming from registration
        }
    }, [registrationSuccess]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await api.post<{ result: { tokens: { accessToken: string, refreshToken: string } } }>(
                '/login',
                { email, password }
            );
            const { accessToken, refreshToken } = response.data.result.tokens;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            onLoginSuccess?.();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to log in. Please check your credentials.');
            console.error('Login error:', err.response || err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={commonStyles.formContainer}>
            <div className={commonStyles.cardWrapper}>
                <div className={commonStyles.headerGradient}>
                    <div className={commonStyles.gridBackground}></div>
                    <div className="relative z-10">
                        <Logo />
                        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                            Welcome Back!
                        </h2>
                        <p className="text-purple-200/90">Log in to your Predi Gamer account</p>
                    </div>
                </div>

                {registrationSuccess && (
                    <div className={commonStyles.successContainer}>
                        <p className={commonStyles.successText}>
                            <SuccessIcon />
                            Registration successful! Please log in with your credentials.
                        </p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="p-8 pt-6 space-y-6">
                    <div className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<span className="text-gray-400">@</span>}
                            required
                            autoFocus
                        />

                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-300 focus:outline-none"
                                >
                                    {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                                </button>
                            }
                            required
                        />

                        {error && (
                            <div className={commonStyles.errorContainer}>
                                <p className={commonStyles.errorText}>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={commonStyles.primaryButton}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <LoadingSpinner />
                                    Logging in...
                                </div>
                            ) : (
                                'Log In'
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={onSignUpClick}
                                    className={commonStyles.linkButton}
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
