import React, { useState } from 'react';
import Card from '../components/Card';
import { HOME_FEATURES } from '../constants';
import { Bot, Mic, Users, X } from 'lucide-react';
import { Page } from '../types';

const colorClasses: { [key: string]: { bg: string, text: string } } = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-500' },
    green: { bg: 'bg-green-100', text: 'text-green-500' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-500' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-500' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-500' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-500' },
};

const FeatureCard: React.FC<{ icon: React.ElementType, label: string, color: string, onClick: () => void }> = ({ icon: Icon, label, color, onClick }) => {
    const classes = colorClasses[color] || { bg: 'bg-gray-100', text: 'text-gray-500' };
    return (
        <div className="flex flex-col items-center space-y-2">
            <button onClick={onClick} className={`w-16 h-16 ${classes.bg} ${classes.text} dark:bg-gray-700 dark:text-orange-400 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105`}>
                <Icon size={32} />
            </button>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</p>
        </div>
    );
};

// New component for Spiritual & Safety to match the image
const ServiceButton: React.FC<{
    icon: React.ElementType;
    label: string;
    color: string;
    onClick: () => void;
    className?: string;
}> = ({ icon: Icon, label, color, onClick, className = '' }) => {
    const colorStyles: {[key: string]: { bg: string, icon: string }} = {
        orange: { bg: 'bg-yellow-100', icon: 'text-yellow-600' },
        pink: { bg: 'bg-red-100', icon: 'text-red-500' },
        purple: { bg: 'bg-purple-100', icon: 'text-purple-500' },
    };
    const style = colorStyles[color] || { bg: 'bg-gray-100', icon: 'text-gray-500' };

    return (
        <button
            onClick={onClick}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col items-center justify-center space-y-3 ${className}`}
        >
            <div className={`w-14 h-14 ${style.bg} rounded-full flex items-center justify-center`}>
                <Icon size={28} className={style.icon} />
            </div>
            <p className="font-bold text-gray-800 dark:text-gray-200">{label}</p>
        </button>
    );
};

interface HomePageProps {
    setChatOpen: (isOpen: boolean) => void;
    setActivePage: (page: Page, context?: any) => void;
}

const pageNavigationConfig: { [key: string]: { page: Page, context?: any } } = {
    'Ride': { page: Page.Booking, context: { initialTab: 'Transport' } },
    'Stay': { page: Page.Booking, context: { initialTab: 'Stay' } },
    'Food': { page: Page.Navigation },
    'Water': { page: Page.Navigation },
    'Holy Site': { page: Page.Navigation },
    'Doctor': { page: Page.Emergency },
    'Report': { page: Page.Report },
};


const HomePage: React.FC<HomePageProps> = ({ setChatOpen, setActivePage }) => {
    const [showCrowdAlert, setShowCrowdAlert] = useState(true);
    
    const handleNavigation = (label: string) => {
        const config = pageNavigationConfig[label];
        if (config) {
            setActivePage(config.page, config.context);
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
             {showCrowdAlert && (
                <Card className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 !p-3 animate-fade-in">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 dark:bg-red-800/30 rounded-full flex-shrink-0">
                                <Users size={24} className="text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-800 dark:text-red-300">High Crowd Alert</h3>
                                <p className="text-sm text-red-700 dark:text-red-400">High crowd density reported near Mahakaleshwar Temple.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <button 
                                onClick={() => setActivePage(Page.Navigation)}
                                className="text-sm font-semibold text-red-800 dark:text-red-200 bg-red-200 dark:bg-red-800/50 px-3 py-1.5 rounded-md hover:bg-red-300 dark:hover:bg-red-800/80 whitespace-nowrap"
                            >
                                View Map
                            </button>
                            <button onClick={() => setShowCrowdAlert(false)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </Card>
            )}
             <div>
              <p className="text-md text-gray-500 dark:text-gray-400">Welcome, Pilgrim</p>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Ujjain Simhastha Dashboard</h1>
            </div>
            
            <Card>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-lg text-gray-800 dark:text-white">Need Help?</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ask our AI assistant</p>
                    </div>
                    <button 
                        onClick={() => setChatOpen(true)}
                        className="bg-orange-500 text-white rounded-full p-4 shadow-lg hover:bg-orange-600 transition-colors"
                        aria-label="Open AI assistant"
                    >
                        <Bot size={24} />
                    </button>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">Daily Needs</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {HOME_FEATURES.dailyNeeds.map(feature => <FeatureCard key={feature.label} {...feature} onClick={() => handleNavigation(feature.label)} />)}
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">Spiritual & Safety</h3>
                <div className="grid grid-cols-2 gap-4">
                    {HOME_FEATURES.spiritualSafety.map(feature => (
                        <ServiceButton
                            key={feature.label}
                            icon={feature.icon}
                            label={feature.label}
                            color={feature.color}
                            onClick={() => handleNavigation(feature.label)}
                            className={feature.label === 'Report' ? 'col-span-2' : ''}
                        />
                    ))}
                </div>
            </Card>

            <button 
                onClick={() => setChatOpen(true)}
                className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-xl z-40 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 md:hidden"
                aria-label="Open AI Assistant"
            >
                <Mic size={24} />
            </button>
        </div>
    );
};

export default HomePage;