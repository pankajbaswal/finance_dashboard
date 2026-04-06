'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { useFinanceStore } from '@/store/useFinanceStore';
import { getDailyBalanceTrend, getCategoryStats } from '@/utils/financeUtils';

const COLORS = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
    '#f97316', // orange-500
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Balance: <span className="text-blue-600">₹{payload[0].value.toLocaleString()}</span>
                </p>
            </div>
        );
    }
    return null;
};

export const Visualizations = () => {
    const { transactions } = useFinanceStore();
    const trendData = getDailyBalanceTrend(transactions);
    const categoryData = getCategoryStats(transactions);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Line Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold dark:text-white mb-6">Balance Trend</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94A3B8', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94A3B8', fontSize: 12 }}
                                tickFormatter={(value) => `₹${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="balance"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold dark:text-white mb-6">Spending by Category</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                                verticalAlign="middle"
                                align="right"
                                layout="vertical"
                                iconType="circle"
                                wrapperStyle={{ paddingLeft: '20px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
