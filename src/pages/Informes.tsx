
import { useState, useEffect, Suspense, lazy } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReportsSummary } from '@/components/reports/ReportsSummary';
import { useToast } from '@/hooks/use-toast';
import { 
  FileDown, Calendar, Filter, Printer, Share2, 
  BarChart3, PieChart, LineChart, LayoutList, Loader2
} from 'lucide-react';

// Regular imports for smaller components
import { FinancialMetricsChart } from '@/components/reports/FinancialMetricsChart';
import { InvoiceStatusPieChart } from '@/components/reports/InvoiceStatusPieChart';
import { TopClientsBarChart } from '@/components/reports/TopClientsBarChart';

const Informes = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [invoiceType, setInvoiceType] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Effect to handle filtering state and toast notifications
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
        toast({
          title: "Filtro aplicado",
          description: `Mostrando datos del ${getPeriodText(period)} y facturas ${getInvoiceTypeText(invoiceType)}`,
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isFiltering, period, invoiceType]);

  // Manejadores para los filtros - simplifícados
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setIsFiltering(true);
  };

  const handleInvoiceTypeChange = (value: string) => {
    setInvoiceType(value);
    setIsFiltering(true);
  };

  // Improved action handlers with error handling and loading states
  const handlePrint = () => {
    try {
      setIsPrinting(true);
      toast({
        title: "Imprimiendo informe",
        description: "Preparando documento para imprimir...",
      });
      
      setTimeout(() => {
        window.print();
        setIsPrinting(false);
      }, 500);
    } catch (error) {
      setIsPrinting(false);
      toast({
        title: "Error al imprimir",
        description: "Ocurrió un error al intentar imprimir el informe.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    try {
      setIsSharing(true);
      toast({
        title: "Compartir informe",
        description: "Preparando opciones para compartir...",
      });
      
      setTimeout(() => {
        // Simulation for share functionality
        setIsSharing(false);
        toast({
          title: "Compartir",
          description: "Función de compartir en desarrollo",
        });
      }, 800);
    } catch (error) {
      setIsSharing(false);
      toast({
        title: "Error al compartir",
        description: "Ocurrió un error al intentar compartir el informe.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      toast({
        title: "Exportando datos",
        description: "Preparando archivo de exportación...",
      });
      
      // Simulación de generación y descarga de archivo CSV
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a simple CSV file
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Fecha,Concepto,Monto\n" +
        "2023-01-15,Factura #001,25000\n" +
        "2023-01-22,Factura #002,18000\n" +
        "2023-02-05,Factura #003,32000";
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `informe_financiero_${period}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Exportación completada",
        description: "El archivo ha sido descargado",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error al exportar",
        description: "Ocurrió un error durante la exportación.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
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

  // Tab content components
  const ChartsTabContent = () => (
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
  );

  const MetricsTabContent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Métricas Financieras</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
        Métricas financieras detalladas próximamente
      </CardContent>
    </Card>
  );

  const CategoriesTabContent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Análisis por Categorías</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
        Análisis por categorías próximamente
      </CardContent>
    </Card>
  );

  const DetailsTabContent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalles de Transacciones</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
        Detalles de transacciones próximamente
      </CardContent>
    </Card>
  );

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
            disabled={isPrinting}
          >
            {isPrinting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Printer className="mr-2 h-4 w-4" />
            )}
            {isPrinting ? "Imprimiendo..." : "Imprimir"}
          </Button>
          <Button 
            variant="outline" 
            className="sm:w-auto"
            onClick={handleShare}
            disabled={isSharing}
          >
            {isSharing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Share2 className="mr-2 h-4 w-4" />
            )}
            {isSharing ? "Compartiendo..." : "Compartir"}
          </Button>
          <Button 
            className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="mr-2 h-4 w-4" />
            )}
            {isExporting ? "Exportando..." : "Exportar"}
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
                {isFiltering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                {isFiltering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
    </div>
  );
};

export default Informes;
