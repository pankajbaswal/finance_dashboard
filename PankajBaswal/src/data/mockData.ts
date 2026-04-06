import { Transaction } from '@/store/useFinanceStore';

export const CATEGORIES = [
    'Salary',
    'Housing',
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Investment',
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: '1',
        date: '2024-03-20',
        amount: 75000,
        category: 'Salary',
        type: 'income',
        description: 'Monthly Salary',
    },
    {
        id: '2',
        date: '2024-03-19',
        amount: 15000,
        category: 'Housing',
        type: 'expense',
        description: 'Rent Payment',
    },
    {
        id: '3',
        date: '2024-03-18',
        amount: 4500,
        category: 'Food',
        type: 'expense',
        description: 'Grocery Shopping',
    },
    {
        id: '4',
        date: '2024-03-17',
        amount: 12000,
        category: 'Investment',
        type: 'income',
        description: 'Stock Dividends',
    },
    {
        id: '5',
        date: '2024-03-15',
        amount: 800,
        category: 'Transport',
        type: 'expense',
        description: 'Petrol Refill',
    },
    {
        id: '6',
        date: '2024-03-12',
        amount: 2500,
        category: 'Entertainment',
        type: 'expense',
        description: 'Friday Night Movie',
    },
    {
        id: '7',
        date: '2024-03-10',
        amount: 3500,
        category: 'Shopping',
        type: 'expense',
        description: 'New Clothes',
    },
];
