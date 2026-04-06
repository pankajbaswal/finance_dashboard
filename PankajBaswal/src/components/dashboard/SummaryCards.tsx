'use client';

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    ArrowUpCircle,
    ArrowDownCircle
} from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { calculateSummary } from '@/utils/financeUtils';
import { cn } from '@/utils/cn';

interface CardProps {
    title: string;
    amount: number;
    icon: React.ElementType;
    trend?: number;
    color: string;
}

const SummaryCard = ({ title, amount, icon: Icon, trend, color }: CardProps) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-2xl", color)}>
                <Icon className="text-white" size={24} />
            </div>
            {trend !== undefined && (
                <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
                    trend >= 0
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
                        : "bg-rose-50 text-rose-600 dark:bg-rose-900/20"
                )}>
                    {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(trend)}%
                </div>
            )}
        </div>
        <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
            <h3 className="text-2xl lg:text-3xl font-bold dark:text-white mt-1">
                ₹{amount.toLocaleString()}
            </h3>
        </div>
    </div>
);

export const SummaryCards = () => {
    const { transactions } = useFinanceStore();
    const { income, expenses, balance } = calculateSummary(transactions);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard
                title="Total Balance"
                amount={balance}
                icon={Wallet}
                color="bg-blue-600"
            />
            <SummaryCard
                title="Total Income"
                amount={income}
                icon={ArrowUpCircle}
                trend={12}
                color="bg-emerald-500"
            />
            <SummaryCard
                title="Total Expenses"
                amount={expenses}
                icon={ArrowDownCircle}
                trend={-5}
                color="bg-rose-500"
            />
        </div>
    );
};
