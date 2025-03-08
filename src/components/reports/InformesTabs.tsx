
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartsTabContent } from "./tabs/ChartsTabContent";
import { DetailsTabContent } from "./tabs/DetailsTabContent";
import { MetricsTabContent } from "./tabs/MetricsTabContent";
import { TaxesTabContent } from "./tabs/TaxesTabContent";
import { CategoriesTabContent } from "./tabs/CategoriesTabContent";
import type { Invoice } from "@/data/invoices";
import { DateRange } from "react-day-picker";

export interface InformesTabsProps {
  filteredInvoices: Invoice[];
  dateRange?: DateRange;
  invoiceType: string;
}

export function InformesTabs({ 
  filteredInvoices, 
  dateRange, 
  invoiceType 
}: InformesTabsProps) {
  return (
    <Tabs defaultValue="charts" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="charts">Gráficos</TabsTrigger>
        <TabsTrigger value="details">Detalles</TabsTrigger>
        <TabsTrigger value="metrics">Métricas</TabsTrigger>
        <TabsTrigger value="taxes">Impuestos</TabsTrigger>
        <TabsTrigger value="categories">Categorías</TabsTrigger>
      </TabsList>
      
      <TabsContent value="charts">
        <ChartsTabContent />
      </TabsContent>
      
      <TabsContent value="details">
        <DetailsTabContent />
      </TabsContent>
      
      <TabsContent value="metrics">
        <MetricsTabContent />
      </TabsContent>
      
      <TabsContent value="taxes">
        <TaxesTabContent />
      </TabsContent>
      
      <TabsContent value="categories">
        <CategoriesTabContent />
      </TabsContent>
    </Tabs>
  );
}
