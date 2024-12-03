import { FC } from 'react';
import { commonStyles } from '../../styles/commonStyles';

export const Footer: FC = () => {
    const { footer } = commonStyles;
    
    return (
        <footer className={footer.container}>
            <div className={footer.content}>
                <div className={footer.wrapper}>
                    <div className={footer.copyright}>
                        © 2024 Predi Gamer. Created by Piotr Wyszynski
                    </div>
                    <div className={footer.description}>
                        This is a non-commercial project developed for the Expert Systems course
                        at the University of Humanities and Economics in Lodz (AHE)
                    </div>
                    <div className={footer.badge.wrapper}>
                        <span className={footer.badge.dot}></span>
                        <span>Educational Purpose Only</span>
                        <span className={footer.badge.dot}></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}; 