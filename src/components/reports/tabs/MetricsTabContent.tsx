
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialMetricsTable } from "../metrics/FinancialMetricsTable";
import { FinancialMetricsChart } from "../FinancialMetricsChart";
import { FinancialRatiosCard } from "../metrics/FinancialRatiosCard";

export function MetricsTabContent() {
  return (
    <div className="space-y-4">
      <FinancialMetricsChart />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FinancialMetricsTable />
        <FinancialRatiosCard />
      </div>
    </div>
  );
}
