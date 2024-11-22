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

const Tab = ({ label, isActive, onClick }: TabProps) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-medium transition-colors duration-200
            ${isActive 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-purple-500'
            }`}
    >
        {label}
    </button>
);

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
    return (
        <div className="border-b border-gray-200">
            <div className="flex space-x-4">
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