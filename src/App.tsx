import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoginForm } from './components/features/LoginForm';
import { RegistrationForm } from './components/features/RegistrationForm';
import { Dashboard } from './components/pages/Dashboard'
import { api } from './services/api';
import { Toaster } from 'react-hot-toast';

function App() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const AuthLayout = () => (
        <div className="min-h-screen w-full flex items-center justify-center 
            bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
            {/* Enhanced Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
            
            {/* Premium Gradient Overlays - More pronounced but still elegant */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/15 via-transparent to-transparent animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-purple-800/10 to-transparent animate-gradient-shift-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/5 to-transparent animate-gradient-shift-slower"></div>
            </div>
            
            {/* Enhanced Animated Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div key={i} 
                        className={`particle absolute rounded-full blur-sm
                            ${i % 2 === 0 
                                ? 'w-1 h-1 bg-gradient-to-r from-purple-400/30 to-purple-500/30' 
                                : 'w-2 h-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20'
                            }`}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float-particle ${20 + i * 5}s infinite linear`,
                            animationDelay: `${-i * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Enhanced Glow Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 
                    bg-purple-500/10 blur-[100px] animate-glow-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 
                    bg-purple-600/10 blur-[100px] animate-glow-pulse-slow"></div>
                <div className="absolute top-1/4 right-0 w-1/3 h-1/3 
                    bg-purple-700/5 blur-[80px] animate-glow-pulse-slower"></div>
            </div>

            {/* Subtle Vignette Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>

            {/* Content */}
            <div className="w-full max-w-md transform transition-all duration-500 
                relative z-10 scale-100 opacity-100">
                <div className="relative">
                    {/* Form Switch Animation */}
                    <div className={`transform transition-all duration-500 ease-out-cubic
                        ${isLoginForm ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0 pointer-events-none absolute'}`}>
                        {isLoginForm && (
                            <LoginForm 
                                onLoginSuccess={() => {
                                    window.location.href = '/dashboard';
                                }}
                                onSignUpClick={() => {
                                    setIsLoginForm(false);
                                    setRegistrationSuccess(false);
                                }}
                                registrationSuccess={registrationSuccess}
                            />
                        )}
                    </div>
                    <div className={`transform transition-all duration-500 ease-out-cubic
                        ${!isLoginForm ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none absolute'}`}>
                        {!isLoginForm && (
                            <RegistrationForm 
                                onRegistrationSuccess={() => {
                                    setIsLoginForm(true);
                                    setRegistrationSuccess(true);
                                }}
                                onLoginClick={() => setIsLoginForm(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Router>
            <Toaster 
                position="top-right"
                toastOptions={{
                    className: 'bg-gray-900 text-gray-100 border border-gray-800',
                    duration: 4000,
                    style: {
                        background: 'rgba(17, 24, 39, 0.9)',
                        color: '#fff',
                        backdropFilter: 'blur(8px)',
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<AuthLayout />} />
                <Route 
                    path="/dashboard" 
                    element={
                        localStorage.getItem('accessToken') 
                            ? <Dashboard /> 
                            : <Navigate to="/" />
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
