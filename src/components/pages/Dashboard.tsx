import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs } from '../commons/Tab';
import { useUserStore } from '../../services/userService'
import { UsersTable } from '../features/UsersTable';
import { KnowledgeBase } from '../features/KnowledgeBase';
import { QueryInterface } from '../features/QueryInterface';
import { Footer } from '../commons/Footer';
import { commonStyles } from '../../styles/commonStyles';
import { SmallLogo, UserIcon, LogoutIcon } from '../commons/icons';

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
        <div className={commonStyles.pageContainer}>
            <header className={commonStyles.header}>
                <div className={commonStyles.headerContent}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <SmallLogo />
                            <h1 className={commonStyles.logo}>
                                Predi Gamer
                            </h1>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            {email && role && (
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-2 text-gray-400/90">
                                        <UserIcon />
                                        {email}
                                    </span>
                                    <div className="h-4 w-px bg-gray-800/80"></div>
                                    <span className={commonStyles.userBadge}>
                                        {role}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={handleLogout}
                                className={commonStyles.logoutButton}
                            >
                                <span>Logout</span>
                                <LogoutIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className={commonStyles.mainContent}>
                <div className={commonStyles.contentCard}>
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