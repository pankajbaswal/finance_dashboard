'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    ArrowLeftRight,
    Settings,
    User,
    Menu,
    X,
    Sun,
    Moon,
    TrendingUp,
    PieChart as PieChartIcon,
    ChevronDown
} from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { cn } from '@/utils/cn';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
    <button
        className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
            active
                ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        )}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </button>
);

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { userRole, setUserRole } = useFinanceStore();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const toggleRole = () => {
        setUserRole(userRole === 'admin' ? 'viewer' : 'admin');
    };

    return (
        <div className={cn("min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300", isDarkMode && "dark")}>
            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 transform",
                !isSidebarOpen && "-translate-x-full lg:translate-x-0 lg:w-20"
            )}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="text-white" size={20} />
                        </div>
                        {isSidebarOpen && <span className="text-xl font-bold dark:text-white tracking-tight">FinDash</span>}
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-500">
                        <X size={24} />
                    </button>
                </div>

                <nav className="mt-6 px-4 space-y-1">
                    <SidebarItem icon={LayoutDashboard} label={isSidebarOpen ? "Dashboard" : ""} active />
                    <SidebarItem icon={ArrowLeftRight} label={isSidebarOpen ? "Transactions" : ""} />
                    <SidebarItem icon={PieChartIcon} label={isSidebarOpen ? "Analytics" : ""} />
                    <SidebarItem icon={Settings} label={isSidebarOpen ? "Settings" : ""} />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden">
                            <Menu size={24} className="dark:text-white" />
                        </button>
                        <h1 className="hidden sm:block text-xl font-bold dark:text-white">Overview</h1>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-6">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 transition-colors"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Profile & Role Switcher */}
                        <div className="flex items-center gap-3 p-1.5 pl-3 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold dark:text-white leading-none">Pankaj Baswal</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-wider">{userRole}</p>
                            </div>
                            <button
                                onClick={toggleRole}
                                className="flex items-center gap-2 bg-white dark:bg-slate-700 px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-xs font-bold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-600"
                            >
                                <span>Switch Role</span>
                                <ChevronDown size={14} />
                            </button>
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200 dark:shadow-none">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};
