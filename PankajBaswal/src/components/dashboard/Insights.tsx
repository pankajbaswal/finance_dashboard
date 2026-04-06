'use client';

import React from 'react';
import {
    Zap,
    Calendar,
    Wallet
} from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { getInsights } from '@/utils/financeUtils';

export const Insights = () => {
    const { transactions } = useFinanceStore();
    const insights = getInsights(transactions);

    if (!insights) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Highest Spending Category */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                    <Zap size={22} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Spending</p>
                    <h4 className="text-lg font-bold dark:text-white mt-1">
                        {insights.highestCategory?.name || 'N/A'}
                    </h4>
                    <p className="text-sm text-slate-500 mt-0.5">
                        ₹{insights.highestCategory?.value.toLocaleString() ?? 0} total
                    </p>
                </div>
            </div>

            {/* Average Daily Spending */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                    <Wallet size={22} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Daily</p>
                    <h4 className="text-lg font-bold dark:text-white mt-1">
                        ₹{insights.avgDailySpending.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </h4>
                    <p className="text-sm text-slate-500 mt-0.5">Based on history</p>
                </div>
            </div>

            {/* Monthly Spending */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-2xl text-violet-600">
                    <Calendar size={22} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">This Month</p>
                    <h4 className="text-lg font-bold dark:text-white mt-1">
                        ₹{insights.currentMonthSpending.toLocaleString()}
                    </h4>
                    <p className="text-sm text-slate-500 mt-0.5">Total expenses</p>
                </div>
            </div>
        </div>
    );
};
