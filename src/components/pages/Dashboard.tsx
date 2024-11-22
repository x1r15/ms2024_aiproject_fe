import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs } from '../commons/Tab';
import { useUserStore } from '../../services/userService'
import { UsersTable } from '../../components/features/UsersTable';
import { KnowledgeBase } from '../../components/features/KnowledgeBase';
import { BiSolidInvader } from 'react-icons/bi';

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
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <BiSolidInvader className="w-8 h-8" />
                        Predi Gamer
                    </h1>
                    <div className="flex items-center space-x-4">
                        {email && role && (
                            <span className="text-gray-600">
                                {email} | <span className="font-medium capitalize">{role}</span>
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-sm text-purple-600 hover:text-purple-800 underline"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs
                    tabs={filteredTabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
                
                <div className="mt-6">
                    {activeTab === 'query' && (
                        <div>query</div>
                    )}
                    {activeTab === 'knowledge-base' && <KnowledgeBase />}
                    {activeTab === 'users' && <UsersTable />}
                </div>
            </main>
        </div>
    );
} 