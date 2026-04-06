import { Transaction } from '@/store/useFinanceStore';

export const calculateSummary = (transactions: Transaction[]) => {
    const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    return { income, expenses, balance: income - expenses };
};

export const getCategoryStats = (transactions: Transaction[]) => {
    const stats: Record<string, number> = {};
    transactions
        .filter((t) => t.type === 'expense')
        .forEach((t) => {
            stats[t.category] = (stats[t.category] || 0) + t.amount;
        });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
};

export const getDailyBalanceTrend = (transactions: Transaction[]) => {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    const trend: { date: string; balance: number }[] = [];
    let runningBalance = 0;

    const dates = Array.from(new Set(sorted.map((t) => t.date))).sort();
    dates.forEach((date) => {
        sorted.filter((t) => t.date === date).forEach((t) => {
            if (t.type === 'income') runningBalance += t.amount;
            else runningBalance -= t.amount;
        });
        trend.push({ date, balance: runningBalance });
    });

    return trend;
};

export const getInsights = (transactions: Transaction[]) => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    if (expenses.length === 0) return null;

    // Top category
    const catStats = getCategoryStats(transactions);
    const highestCategory = catStats.sort((a, b) => b.value - a.value)[0];

    // Avg spending
    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
    const avgDailySpending = totalExpense / (new Set(transactions.map(t => t.date)).size || 1);

    // Simple monthly comparison (current vs previous transactions)
    const currentMonth = new Date().toISOString().slice(0, 7);
    const currentMonthSpending = expenses
        .filter(t => t.date.startsWith(currentMonth))
        .reduce((acc, t) => acc + t.amount, 0);

    return {
        highestCategory,
        avgDailySpending,
        currentMonthSpending,
    };
};
