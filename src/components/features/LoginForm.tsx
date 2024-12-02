import { useState, useEffect } from 'react';
import Input from '../commons/Input';
import { api } from '../../services/api';
import { BiSolidInvader } from 'react-icons/bi';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Footer } from '../commons/Footer';

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
                            Welcome Back!
                        </h2>
                        <p className="text-purple-200/90">Log in to your Predi Gamer account</p>
                    </div>
                </div>

                {registrationSuccess && (
                    <div className="mx-8 mt-4 p-4 bg-green-500/10 border border-green-500/20 
                        rounded-lg animate-fadeIn">
                        <p className="text-green-400 text-sm font-medium flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
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
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            }
                            required
                        />

                        {error && (
                            <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg">
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 
                                text-white font-medium rounded-lg shadow-lg hover:from-purple-600 
                                hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
                                focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 
                                disabled:cursor-not-allowed transition-all duration-200 
                                transform hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
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
                                    className="text-purple-400 hover:text-purple-300 font-medium 
                                        focus:outline-none focus:underline transition-colors duration-200"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
