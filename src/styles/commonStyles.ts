export const commonStyles = {
    // Layout & Container styles
    pageContainer: "min-h-screen bg-gradient-to-br from-gray-950 to-gray-900",
    mainContent: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
    formContainer: "my-8",
    
    // Card & Container Components
    cardWrapper: "bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 border border-gray-800/50",
    contentCard: "bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl shadow-2xl border border-gray-800/50 overflow-hidden backdrop-blur-sm",
    checklistCard: {
        container: "bg-gray-900/50 p-6 rounded-lg shadow-lg border border-gray-800/50",
        header: {
            wrapper: "flex items-center justify-between mb-6",
            titleWrapper: "space-y-1",
            title: "text-base font-medium text-gray-200 flex items-center gap-2",
            subtitle: "text-sm text-gray-400",
            right: "text-sm text-gray-400"
        }
    },
    
    // Header Styles
    header: "bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50",
    headerContent: "max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8",
    headerGradient: "px-8 pt-8 pb-6 text-center bg-gradient-to-br from-purple-600/80 to-purple-900/80 relative overflow-hidden",
    gridBackground: "absolute inset-0 bg-[url('/grid.svg')] opacity-10",
    
    // Text & Branding
    logo: "text-2xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 bg-clip-text text-transparent",
    
    // Button Styles
    primaryButton: "w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]",
    linkButton: "text-purple-400 hover:text-purple-300 font-medium focus:outline-none focus:underline transition-colors duration-200",
    logoutButton: "flex items-center gap-2 text-gray-400/90 hover:text-purple-400 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-purple-500/10 group",
    
    // Status & Feedback
    errorContainer: "p-4 bg-red-900/50 border border-red-700 rounded-lg",
    errorText: "text-red-300 text-sm",
    successContainer: "p-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-fadeIn",
    successText: "text-green-400 text-sm font-medium flex items-center",
    userBadge: "px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-medium capitalize tracking-wide",
    
    // Query Interface
    queryContainer: "space-y-6 mt-4",
    queryGrid: "grid grid-cols-3 gap-6",
    resultsSection: "bg-gray-900/50 p-6 rounded-lg shadow-lg border border-gray-800/50",
    resultsHeader: "text-lg font-medium text-gray-200 mb-4 flex items-center gap-2",
    noResults: "text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700",
    noResultsText: "text-gray-400",
    
    // Footer styles
    footer: {
        container: "border-t border-gray-800/50 bg-gray-950/80 backdrop-blur-sm mt-8",
        content: "max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8",
        wrapper: "flex flex-col items-center gap-3 text-center",
        copyright: "text-sm text-gray-400",
        description: "text-xs text-gray-500",
        badge: {
            wrapper: "flex items-center gap-2 text-xs text-purple-400/70",
            dot: "w-1 h-1 rounded-full bg-purple-500/50"
        }
    },

    // Code Example styles
    codeExample: {
        container: "p-2 bg-gray-900/50 rounded border border-gray-700/30 hover:border-purple-500/20 transition-colors duration-200",
        code: "text-xs font-mono text-purple-400",
        description: "text-xs text-gray-400 mt-1 font-normal"
    },

    // DataTable styles
    dataTable: {
        wrapper: "overflow-hidden",
        table: "min-w-full divide-y divide-gray-800/50",
        th: "px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-900/30 first:pl-6 last:pr-6",
        tbody: "divide-y divide-gray-800/50"
    },

    // Error Display styles
    errorDisplay: {
        container: "bg-red-500/10 border border-red-500/20 p-4 rounded-lg",
        content: "flex items-start gap-3",
        icon: "w-5 h-5 text-red-400 mt-0.5",
        text: "text-red-400",
        button: "mt-2 text-sm text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
    },

    // InfoBox styles
    infoBox: {
        base: {
            default: "bg-gray-800/30 border-gray-700/30",
            tip: "bg-purple-500/5 border-purple-500/20"
        },
        container: "p-2.5 rounded-lg border",
        title: "text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
    },

    // Loading Display styles
    loading: {
        container: "text-center p-8"
    },

    // Section Header styles
    sectionHeader: {
        container: "flex items-center gap-3",
        line: {
            wrapper: "relative h-12",
            blur: "absolute w-0.5 h-full bg-purple-500/20 rounded-full blur-[2px]",
            gradient: "relative w-0.5 h-full bg-gradient-to-b from-purple-500 to-purple-500/50 rounded-full"
        },
        content: {
            title: "text-lg font-medium text-gray-200",
            description: "text-sm text-gray-400"
        }
    },

    // Input styles
    input: {
        wrapper: "space-y-1",
        label: "block text-sm font-medium text-gray-300",
        container: "relative rounded-lg shadow-sm",
        iconWrapper: {
            left: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
            right: "absolute inset-y-0 right-0 pr-3 flex items-center"
        },
        field: {
            base: `
                block w-full rounded-lg
                py-2.5 
                bg-gray-800/50 
                border border-gray-700/50
                text-gray-200 
                placeholder-gray-500
                transition-all duration-200
                focus:ring-2 
                focus:ring-purple-500/20 
                focus:border-purple-500/50 
                focus:outline-none
                hover:bg-gray-800/70
            `,
            withLeftIcon: "pl-10",
            withRightIcon: "pr-10",
            withoutLeftIcon: "pl-4",
            withoutRightIcon: "pr-4",
            error: "border-red-500/50"
        },
        error: {
            message: "text-sm text-red-400 mt-1 flex items-center gap-1"
        }
    },

    // Tab styles
    tab: {
        button: `px-4 py-3 transition-colors duration-200 relative
            first:ml-2 last:mr-2
            focus:outline-none
            text-sm tracking-wide`,
        active: "text-purple-400",
        inactive: "text-gray-400 hover:text-gray-200",
        indicator: {
            dot: "w-1 h-1 rounded-full bg-purple-500 opacity-70",
            line: "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        },
        container: "border-b border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-sm",
        wrapper: "flex"
    },

    // Advanced Query Form styles
    advancedQuery: {
        container: "bg-gray-900/50 p-6 rounded-lg shadow-lg border border-gray-800/50",
        section: "space-y-4",
        labelWrapper: "flex items-center justify-between mb-2",
        label: {
            wrapper: "block text-sm font-medium text-gray-200 flex items-center gap-2",
            badge: "text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full"
        },
        inputWrapper: "mt-1 flex gap-2",
        input: `
            flex-1 px-4 py-2 
            bg-gray-800/90 
            border border-gray-700/50 
            rounded-lg 
            text-gray-200 
            focus:outline-none 
            focus:ring-2 
            focus:ring-purple-500/40 
            focus:border-purple-500/40 
            text-sm font-mono 
            placeholder-gray-500
        `,
        button: {
            execute: `
                px-4 py-2 
                bg-purple-500/20 
                border border-purple-500/30 
                text-purple-400 
                rounded-lg 
                hover:bg-purple-500/30 
                focus:outline-none 
                focus:ring-2 
                focus:ring-purple-500/40 
                disabled:opacity-50 
                disabled:cursor-not-allowed 
                transition-all duration-200 
                flex items-center gap-2
            `,
            copy: `
                p-1 
                text-gray-400 
                hover:text-purple-400 
                rounded-md 
                hover:bg-gray-700/50 
                transition-colors
                flex items-center gap-1
                text-xs
            `
        },
        resultWrapper: "relative mt-1",
        textarea: `
            w-full px-4 py-2 
            bg-gray-800/90 
            border border-gray-700/50 
            rounded-lg 
            text-gray-200 
            font-mono text-sm 
            placeholder-gray-500
            scrollbar-thin 
            scrollbar-track-gray-800/40
            scrollbar-thumb-gray-700/60 
            hover:scrollbar-thumb-gray-600/80
            scrollbar-thumb-rounded
            focus:outline-none 
            focus:ring-2 
            focus:ring-purple-500/40 
            focus:border-purple-500/40
            resize-none
        `
    },

    // App Layout styles
    appLayout: {
        auth: {
            container: "min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden",
            grid: "absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]",
            gradients: {
                wrapper: "absolute inset-0",
                top: "absolute inset-0 bg-gradient-to-tr from-purple-900/15 via-transparent to-transparent animate-gradient-shift",
                middle: "absolute inset-0 bg-gradient-to-bl from-transparent via-purple-800/10 to-transparent animate-gradient-shift-slow",
                bottom: "absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/5 to-transparent animate-gradient-shift-slower"
            },
            particles: {
                container: "absolute inset-0 overflow-hidden",
                small: "w-1 h-1 bg-gradient-to-r from-purple-400/30 to-purple-500/30",
                large: "w-2 h-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20",
                base: "particle absolute rounded-full blur-sm"
            },
            glowEffects: {
                wrapper: "absolute inset-0",
                top: "absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[100px] animate-glow-pulse",
                bottom: "absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-600/10 blur-[100px] animate-glow-pulse-slow",
                right: "absolute top-1/4 right-0 w-1/3 h-1/3 bg-purple-700/5 blur-[80px] animate-glow-pulse-slower"
            },
            overlays: {
                horizontal: "absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20",
                vertical: "absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"
            },
            content: "w-full max-w-md transform transition-all duration-500 relative z-10 scale-100 opacity-100"
        },
        forms: {
            wrapper: "relative",
            login: {
                active: "translate-x-0 opacity-100",
                inactive: "-translate-x-8 opacity-0 pointer-events-none absolute"
            },
            register: {
                active: "translate-x-0 opacity-100",
                inactive: "translate-x-8 opacity-0 pointer-events-none absolute"
            },
            transition: "transform transition-all duration-500 ease-out-cubic"
        }
    }
}; 