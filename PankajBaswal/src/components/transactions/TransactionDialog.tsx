'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinanceStore, TransactionType } from '@/store/useFinanceStore';
import { CATEGORIES } from '@/data/mockData';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const TransactionDialog = ({ isOpen, onClose }: Props) => {
    const { addTransaction } = useFinanceStore();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: CATEGORIES[0],
        type: 'expense' as TransactionType,
        date: new Date().toISOString().split('T')[0],
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTransaction({
            ...formData,
            amount: parseFloat(formData.amount),
        });
        setFormData({
            description: '',
            amount: '',
            category: CATEGORIES[0],
            type: 'expense',
            date: new Date().toISOString().split('T')[0],
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-xl font-bold dark:text-white">New Transaction</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {['expense', 'income'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: type as TransactionType })}
                                className={`py-2 rounded-lg text-sm font-bold capitalize transition-all ${formData.type === type ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <input
                            required
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                        <input
                            required
                            type="number"
                            placeholder="Amount (₹)"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        >
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <input
                            required
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 mt-4">
                        Create Transaction
                    </button>
                </form>
            </div>
        </div>
    );
};
