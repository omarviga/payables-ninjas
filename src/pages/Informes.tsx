
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FinancialMetricsChart } from '@/components/reports/FinancialMetricsChart';
import { InvoiceStatusPieChart } from '@/components/reports/InvoiceStatusPieChart';
import { TopClientsBarChart } from '@/components/reports/TopClientsBarChart';
import { ReportsSummary } from '@/components/reports/ReportsSummary';
import { useToast } from '@/components/ui/use-toast';
import { 
  FileDown, Calendar, Filter, Printer, Share2, 
  BarChart3, PieChart, LineChart, LayoutList
} from 'lucide-react';

const Informes = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [invoiceType, setInvoiceType] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);

  // Manejadores para los filtros
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setIsFiltering(true);
    
    setTimeout(() => {
      toast({
        title: "Filtro aplicado",
        description: `Mostrando datos del ${getPeriodText(value)}`,
      });
      setIsFiltering(false);
    }, 500);
  };

  const handleInvoiceTypeChange = (value: string) => {
    setInvoiceType(value);
    setIsFiltering(true);
    
    setTimeout(() => {
      toast({
        title: "Filtro aplicado",
        description: `Mostrando facturas ${getInvoiceTypeText(value)}`,
      });
      setIsFiltering(false);
    }, 500);
  };

  // Manejadores para los botones de acción
  const handlePrint = () => {
    toast({
      title: "Imprimiendo informe",
      description: "Preparando documento para imprimir...",
    });
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleShare = () => {
    toast({
      title: "Compartir informe",
      description: "Función de compartir en desarrollo",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportando datos",
      description: "Preparando archivo de exportación...",
    });
    
    // Simulamos la descarga después de un tiempo
    setTimeout(() => {
      toast({
        title: "Exportación completada",
        description: "El archivo ha sido descargado",
        variant: "success",
      });
    }, 1500);
  };

  const handleCalendarClick = () => {
    toast({
      title: "Calendario",
      description: "Selector de fecha en desarrollo",
    });
  };

  const handleAdvancedFilter = () => {
    toast({
      title: "Filtros avanzados",
      description: "Filtros avanzados en desarrollo",
    });
  };

  // Funciones auxiliares para textos descriptivos
  const getPeriodText = (periodValue: string): string => {
    switch (periodValue) {
      case 'week': return 'esta semana';
      case 'month': return 'este mes';
      case 'quarter': return 'este trimestre';
      case 'year': return 'este año';
      case 'custom': return 'periodo personalizado';
      default: return periodValue;
    }
  };

  const getInvoiceTypeText = (typeValue: string): string => {
    switch (typeValue) {
      case 'all': return 'de todos los tipos';
      case 'receivable': return 'por cobrar';
      case 'payable': return 'por pagar';
      default: return typeValue;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Informes</h1>
          <p className="text-muted-foreground mt-1">
            Visualiza y analiza datos financieros de tu empresa
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="sm:w-auto"
            onClick={handlePrint}
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button 
            variant="outline" 
            className="sm:w-auto"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </Button>
          <Button 
            className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
            onClick={handleExport}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-end justify-between mb-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="w-full sm:w-48">
            <Select 
              value={period} 
              onValueChange={handlePeriodChange}
              disabled={isFiltering}
            >
              <SelectTrigger>
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-48">
            <Select 
              value={invoiceType} 
              onValueChange={handleInvoiceTypeChange}
              disabled={isFiltering}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de factura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="receivable">Por cobrar</SelectItem>
                <SelectItem value="payable">Por pagar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleCalendarClick}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleAdvancedFilter}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <ReportsSummary />
      
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinancialMetricsChart />
            <InvoiceStatusPieChart />
            <TopClientsBarChart />
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Flujo de Efectivo Proyectado</CardTitle>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center bg-muted/50 text-muted-foreground">
                Gráfico de proyección de flujo de efectivo próximamente
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métricas Financieras</CardTitle>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
              Métricas financieras detalladas próximamente
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Análisis por Categorías</CardTitle>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
              Análisis por categorías próximamente
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles de Transacciones</CardTitle>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
              Detalles de transacciones próximamente
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Informes;
