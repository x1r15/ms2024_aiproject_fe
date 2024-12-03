import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoginForm } from './components/features/LoginForm';
import { RegistrationForm } from './components/features/RegistrationForm';
import { Dashboard } from './components/pages/Dashboard'
import { api } from './services/api';
import { Toaster } from 'react-hot-toast';
import { commonStyles } from './styles/commonStyles';

function App() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const { appLayout: styles } = commonStyles;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const AuthLayout = () => (
        <div className={styles.auth.container}>
            <div className={styles.auth.grid}></div>
            
            <div className={styles.auth.gradients.wrapper}>
                <div className={styles.auth.gradients.top}></div>
                <div className={styles.auth.gradients.middle}></div>
                <div className={styles.auth.gradients.bottom}></div>
            </div>
            
            <div className={styles.auth.particles.container}>
                {[...Array(8)].map((_, i) => (
                    <div key={i} 
                        className={`${styles.auth.particles.base}
                            ${i % 2 === 0 
                                ? styles.auth.particles.small
                                : styles.auth.particles.large
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

            <div className={styles.auth.glowEffects.wrapper}>
                <div className={styles.auth.glowEffects.top}></div>
                <div className={styles.auth.glowEffects.bottom}></div>
                <div className={styles.auth.glowEffects.right}></div>
            </div>

            <div className={styles.auth.overlays.horizontal}></div>
            <div className={styles.auth.overlays.vertical}></div>

            <div className={styles.auth.content}>
                <div className={styles.forms.wrapper}>
                    <div className={`${styles.forms.transition} 
                        ${isLoginForm ? styles.forms.login.active : styles.forms.login.inactive}`}>
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
                    <div className={`${styles.forms.transition} 
                        ${!isLoginForm ? styles.forms.register.active : styles.forms.register.inactive}`}>
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
