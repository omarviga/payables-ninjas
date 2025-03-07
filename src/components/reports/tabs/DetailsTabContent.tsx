
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionsTable } from "../details/TransactionsTable";
import { TransactionFilters } from "../details/TransactionFilters";
import { useState } from "react";

export function DetailsTabContent() {
  const [filters, setFilters] = useState({
    dateRange: undefined,
    type: 'all',
    status: 'all',
    minAmount: '',
    maxAmount: ''
  });

  return (
    <div className="space-y-4">
      <TransactionFilters filters={filters} setFilters={setFilters} />
      <TransactionsTable filters={filters} />
    </div>
  );
}
