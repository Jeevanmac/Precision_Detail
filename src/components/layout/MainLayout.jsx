import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const MainLayout = ({ children, hasSidebar = false }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-grow pt-24">
                {children}
            </main>
            <div className={hasSidebar ? 'lg:ml-72' : ''}>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
