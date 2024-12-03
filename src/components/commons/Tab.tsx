import { commonStyles } from '../../styles/commonStyles';

interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

interface TabsProps {
    tabs: {
        id: string;
        label: string;
    }[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const Tab = ({ label, isActive, onClick }: TabProps) => {
    const { tab } = commonStyles;
    
    return (
        <button
            onClick={onClick}
            className={`${tab.button} ${isActive ? tab.active : tab.inactive}`}
        >
            <div className="flex items-center gap-2.5">
                <span className="relative z-10">{label}</span>
                {isActive && (
                    <div className={tab.indicator.dot} />
                )}
            </div>
            {isActive && (
                <div className={tab.indicator.line} />
            )}
        </button>
    );
};

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
    const { tab } = commonStyles;
    
    return (
        <div className={tab.container}>
            <div className={tab.wrapper}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.id}
                        label={tab.label}
                        isActive={activeTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                    />
                ))}
            </div>
        </div>
    );
}; 