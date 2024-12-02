import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs } from '../commons/Tab';
import { useUserStore } from '../../services/userService'
import { UsersTable } from '../../components/features/UsersTable';
import { KnowledgeBase } from '../../components/features/KnowledgeBase';
import { BiSolidInvader } from 'react-icons/bi';
import { QueryInterface } from '../features/QueryInterface';
import { Footer } from '../commons/Footer';

export function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // Get tab from URL or default to 'query'
    const defaultTab = searchParams.get('tab') || 'query';
    const [activeTab, setActiveTab] = useState(defaultTab);

    // Handle tab changes
    const handleTabChange = (newTab: string) => {
        setActiveTab(newTab);
        setSearchParams({ tab: newTab });
    };

    const { email, role, clearUser, hasRole, setUser } = useUserStore();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setUser(token);
        }
    }, [setUser]);

    useEffect(() => {
        console.log('Current user state:', { email, role });
    }, [email, role]);

    const handleLogout = () => {
        clearUser();
        navigate('/');
    };

    const tabs = [
        { id: 'query', label: 'Query', show: true },
        { 
            id: 'knowledge-base', 
            label: 'Knowledge Base',
            show: hasRole('expert') || hasRole('admin')
        },
        { 
            id: 'users', 
            label: 'Users',
            show: hasRole('admin')
        },
    ];
    
    const filteredTabs = tabs.filter(tab => tab.show !== false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900">
            <header className="bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <BiSolidInvader className="w-8 h-8 text-purple-500/90" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                                Predi Gamer
                            </h1>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            {email && role && (
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-2 text-gray-400/90">
                                        <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {email}
                                    </span>
                                    <div className="h-4 w-px bg-gray-800/80"></div>
                                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 
                                        rounded-full text-xs font-medium capitalize tracking-wide">
                                        {role}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-400/90 hover:text-purple-400 
                                    transition-colors duration-200 px-3 py-1.5 rounded-lg 
                                    hover:bg-purple-500/10 group"
                            >
                                <span>Logout</span>
                                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl 
                    shadow-2xl border border-gray-800/50 overflow-hidden backdrop-blur-sm">
                    <div className="border-b border-gray-800/50">
                        <Tabs
                            tabs={filteredTabs}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    </div>
                    
                    <div className="p-4">
                        {activeTab === 'query' && <QueryInterface />}
                        {activeTab === 'knowledge-base' && <KnowledgeBase />}
                        {activeTab === 'users' && <UsersTable />}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 