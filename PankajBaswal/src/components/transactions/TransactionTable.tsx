'use client';

import React, { useMemo } from 'react';
import {
    Search,
    ArrowUpDown,
    Trash2,
} from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { CATEGORIES } from '@/data/mockData';
import { cn } from '@/utils/cn';

export const TransactionTable = () => {
    const {
        transactions,
        userRole,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        typeFilter,
        setTypeFilter,
        sortBy,
        sortOrder,
        setSort,
        deleteTransaction
    } = useFinanceStore();

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter((t) => {
                const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.category.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
                const matchesType = typeFilter === 'all' || t.type === typeFilter;
                return matchesSearch && matchesCategory && matchesType;
            })
            .sort((a, b) => {
                let cmp = 0;
                if (sortBy === 'date') cmp = a.date.localeCompare(b.date);
                else cmp = a.amount - b.amount;
                return sortOrder === 'asc' ? cmp : -cmp;
            });
    }, [transactions, searchQuery, categoryFilter, typeFilter, sortBy, sortOrder]);

    const handleSort = (field: string) => {
        setSort(field, sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc');
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mt-8">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold dark:text-white">Transactions</h3>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm outline-none dark:text-white"
                            />
                        </div>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm outline-none dark:text-white"
                        >
                            <option value="all">Categories</option>
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>

                        <div className="flex bg-slate-50 dark:bg-slate-800 rounded-xl p-1">
                            {['all', 'income', 'expense'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setTypeFilter(type)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-bold capitalize",
                                        typeFilter === type ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50 dark:border-slate-800">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600" onClick={() => handleSort('date')}>
                                <div className="flex items-center gap-1">Date <ArrowUpDown size={14} /></div>
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right cursor-pointer hover:text-slate-600" onClick={() => handleSort('amount')}>
                                <div className="flex items-center justify-end gap-1">Amount <ArrowUpDown size={14} /></div>
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((t) => (
                            <tr key={t.id} className="border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold dark:text-white">{t.description}</p>
                                    <p className="text-xs text-slate-500">{t.date} • {t.category}</p>
                                </td>
                                <td className={cn("px-6 py-4 text-sm font-bold text-right", t.type === 'income' ? "text-emerald-600" : "text-rose-600")}>
                                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {userRole === 'admin' && (
                                        <button onClick={() => deleteTransaction(t.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
