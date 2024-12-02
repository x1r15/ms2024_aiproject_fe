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
        className={`px-4 py-3 transition-colors duration-200 relative
            ${isActive 
                ? 'text-purple-400' 
                : 'text-gray-400 hover:text-gray-200'
            }
            first:ml-2 last:mr-2
            focus:outline-none
            text-sm tracking-wide
        `}
    >
        <div className="flex items-center gap-2.5">
            <span className="relative z-10">{label}</span>
            {isActive && (
                <div className="w-1 h-1 rounded-full bg-purple-500 opacity-70" />
            )}
        </div>
        {isActive && (
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        )}
    </button>
);

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
    return (
        <div className="border-b border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
            <div className="flex">
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