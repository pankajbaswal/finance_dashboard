import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: string;
    type: TransactionType;
    description: string;
}

export type UserRole = 'admin' | 'viewer';

interface FinanceState {
    transactions: Transaction[];
    userRole: UserRole;
    searchQuery: string;
    categoryFilter: string;
    typeFilter: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';

    // Basic Actions
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateTransaction: (id: string, updates: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;

    // UI State
    setUserRole: (role: UserRole) => void;
    setSearchQuery: (query: string) => void;
    setCategoryFilter: (category: string) => void;
    setTypeFilter: (type: string) => void;
    setSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

export const useFinanceStore = create<FinanceState>()(
    persist(
        (set) => ({
            transactions: MOCK_TRANSACTIONS,
            userRole: 'admin',
            searchQuery: '',
            categoryFilter: 'all',
            typeFilter: 'all',
            sortBy: 'date',
            sortOrder: 'desc',

            addTransaction: (transaction) => set((state) => ({
                transactions: [{ ...transaction, id: Math.random().toString(36).substring(2, 9) }, ...state.transactions],
            })),

            updateTransaction: (id, updates) => set((state) => ({
                transactions: state.transactions.map((t) => t.id === id ? { ...t, ...updates } : t),
            })),

            deleteTransaction: (id) => set((state) => ({
                transactions: state.transactions.filter((t) => t.id !== id),
            })),

            setUserRole: (role) => set({ userRole: role }),
            setSearchQuery: (query) => set({ searchQuery: query }),
            setCategoryFilter: (category) => set({ categoryFilter: category }),
            setTypeFilter: (type) => set({ typeFilter: type }),
            setSort: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
        }),
        { name: 'finance-app-state' }
    )
);
