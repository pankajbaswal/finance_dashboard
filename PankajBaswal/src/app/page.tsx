'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { Visualizations } from '@/components/dashboard/Visualizations';
import { Insights } from '@/components/dashboard/Insights';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionDialog } from '@/components/transactions/TransactionDialog';
import { Plus } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userRole } = useFinanceStore();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-12">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold dark:text-white">Finance Overview</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Track your spending and manage your budget efficiently.
            </p>
          </div>

          {userRole === 'admin' && (
            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          )}
        </div>

        {/* Components */}
        <SummaryCards />
        <Insights />
        <Visualizations />
        <TransactionTable />

        {/* Dialog */}
        <TransactionDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
