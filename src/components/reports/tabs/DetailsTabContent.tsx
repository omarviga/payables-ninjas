
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionsTable } from "../details/TransactionsTable";
import { TransactionFilters } from "../details/TransactionFilters";
import { useState } from "react";
import { getAllInvoices } from "@/data/invoices";

export function DetailsTabContent() {
  const [filters, setFilters] = useState({
    dateRange: undefined,
    type: 'all',
    status: 'all',
    minAmount: '',
    maxAmount: ''
  });

  // Get all invoices to pass to the TransactionsTable
  const invoices = getAllInvoices();

  return (
    <div className="space-y-4">
      <TransactionFilters filters={filters} setFilters={setFilters} />
      <TransactionsTable invoices={invoices} filters={filters} />
    </div>
  );
}
