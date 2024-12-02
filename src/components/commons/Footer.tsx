import { FC } from 'react';

export const Footer: FC = () => {
    return (
        <footer className="border-t border-gray-800/50 bg-gray-950/80 backdrop-blur-sm mt-8">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="text-sm text-gray-400">
                        © 2024 Predi Gamer. Created by Piotr Wyszynski
                    </div>
                    <div className="text-xs text-gray-500">
                        This is a non-commercial project developed for the Expert Systems course
                        at the University of Humanities and Economics in Lodz (AHE)
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-400/70">
                        <span className="w-1 h-1 rounded-full bg-purple-500/50"></span>
                        <span>Educational Purpose Only</span>
                        <span className="w-1 h-1 rounded-full bg-purple-500/50"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}; 