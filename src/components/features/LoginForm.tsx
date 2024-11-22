import { useState, useEffect } from 'react';
import Input from '../commons/Input';
import { api } from '../../services/api';

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post<{ result: { tokens: { accessToken: string, refreshToken: string } } }>(
                '/login', 
                { email, password }
            );
            const { accessToken, refreshToken } = response.data.result.tokens;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            setError(null);
            onLoginSuccess?.();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to log in. Please check your credentials.');
            console.error('Login error:', err.response || err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col w-full">
            <div className="flex flex-col justify-center items-center w-full px-4 py-8">
                <div className="text-lg">Login to your account</div>
                {registrationSuccess && (
                    <div className="text-green-500 mt-2 text-center">
                        Registration successful! Please login with your credentials.
                    </div>
                )}
                <div className="text-gray-400 mt-2">
                    Don't have an account? {' '}
                    <button 
                        type="button"
                        onClick={onSignUpClick}
                        className="text-purple-500 underline hover:text-purple-700"
                    >
                        Sign Up!
                    </button>
                </div>
            </div>

            <Input
                label="Username or Email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="px-5 -mt-2 mb-2 flex justify-end">
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-purple-500 text-sm hover:text-purple-700"
                >
                    {showPassword ? "Hide password" : "Show password"}
                </button>
            </div>

            <div className="px-5 py-3 w-full flex flex-col justify-center items-center">
                <button 
                    type="submit"
                    className="shadow-md text-white w-2/3 bg-gradient-to-tr from-purple-500 to-purple-900 p-2 mt-10 rounded-md"
                >
                    LOGIN
                </button>

                <div className="py-3">
                    {error && <div className="px-5 text-red-500">{error}</div>}
                </div>
            </div>
        </form>
    );
}
