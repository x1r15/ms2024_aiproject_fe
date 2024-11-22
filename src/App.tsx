import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { LoginForm } from './components/features/LoginForm';
import { RegistrationForm } from './components/features/RegistrationForm';
import { Dashboard } from './components/pages/Dashboard'
import { api } from './services/api';
import { Toaster } from 'react-hot-toast';

function App() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // Set up axios auth header if token exists
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const AuthLayout = () => (
        <div className="flex bg-gray-50 w-full h-screen border-2 justify-center items-center bg-gradient-to-tr from-gray-800 to-gray-950">
            <div className="flex flex-col w-1/3 h-3/4 bg-white rounded-xl shadow-2xl">
                {isLoginForm ? (
                    <LoginForm 
                        onLoginSuccess={() => window.location.href = '/dashboard'}
                        onSignUpClick={() => {
                            setIsLoginForm(false);
                            setRegistrationSuccess(false);
                        }}
                        registrationSuccess={registrationSuccess}
                    />
                ) : (
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
    );

    return (
        <Router>
            <Toaster position="top-right" />
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
