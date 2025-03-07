
import { useState, Suspense, lazy } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, PieChart, LineChart, LayoutList, Loader2 } from 'lucide-react';
import { ChartsTabContent } from './tabs/ChartsTabContent';
import { MetricsTabContent } from './tabs/MetricsTabContent';
import { CategoriesTabContent } from './tabs/CategoriesTabContent';
import { DetailsTabContent } from './tabs/DetailsTabContent';

export function InformesTabs() {
  return (
    <Tabs defaultValue="charts" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4 w-full sm:w-auto">
        <TabsTrigger value="charts" className="flex gap-2 items-center">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Gráficos</span>
        </TabsTrigger>
        <TabsTrigger value="metrics" className="flex gap-2 items-center">
          <LineChart className="h-4 w-4" />
          <span className="hidden sm:inline">Métricas</span>
        </TabsTrigger>
        <TabsTrigger value="categories" className="flex gap-2 items-center">
          <PieChart className="h-4 w-4" />
          <span className="hidden sm:inline">Categorías</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex gap-2 items-center">
          <LayoutList className="h-4 w-4" />
          <span className="hidden sm:inline">Detalles</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="charts" className="mt-0">
        <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <ChartsTabContent />
        </Suspense>
      </TabsContent>
      
      <TabsContent value="metrics" className="mt-0">
        <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <MetricsTabContent />
        </Suspense>
      </TabsContent>
      
      <TabsContent value="categories" className="mt-0">
        <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <CategoriesTabContent />
        </Suspense>
      </TabsContent>
      
      <TabsContent value="details" className="mt-0">
        <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <DetailsTabContent />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
