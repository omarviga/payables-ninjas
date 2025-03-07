
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryPieChart } from "../categories/CategoryPieChart";
import { CategoryBarChart } from "../categories/CategoryBarChart";
import { TopCategoriesTable } from "../categories/TopCategoriesTable";

export function CategoriesTabContent() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryPieChart />
        <CategoryBarChart />
      </div>
      
      <TopCategoriesTable />
    </div>
  );
}
