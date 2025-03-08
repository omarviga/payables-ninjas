
import { useState, useCallback } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';
import { 
  FileUp, Filter, CreditCard, 
  CheckCircle2, AlertCircle, XCircle, 
  FilePlus2, Landmark, CheckCheck
} from 'lucide-react';
import { BankCard } from '@/components/conciliacion/BankCard';
import { TransactionsTable } from '@/components/conciliacion/TransactionsTable';
import { Spinner } from '@/components/ui/spinner';
import { transactions, banks } from '@/data/conciliacion';

const Conciliacion = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const matchedTransactions = transactions.filter(tx => tx.status === 'matched');
  const unmatchedTransactions = transactions.filter(tx => tx.status === 'unmatched');
  const doubtfulTransactions = transactions.filter(tx => tx.status === 'doubtful');
  
  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    if (range?.from && range?.to && range.from > range.to) {
      toast({
        title: "Error",
        description: "La fecha de inicio no puede ser mayor que la fecha de fin.",
        variant: "destructive",
      });
      return;
    }
    
    setDateRange(range);
    if (range?.from) {
      toast({
        title: "Rango de fechas seleccionado",
        description: range.to 
          ? `Del ${range.from.toLocaleDateString('es-MX')} al ${range.to.toLocaleDateString('es-MX')}`
          : `${range.from.toLocaleDateString('es-MX')}`,
      });
    }
  }, [toast]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearch();
    }
  }, [searchTerm]);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulación de búsqueda asíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Búsqueda realizada",
        description: `Buscando: "${searchTerm}"`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, toast]);

  const handleAutoConciliate = useCallback(() => {
    toast({
      title: "Conciliación automática",
      description: "Iniciando proceso de conciliación automática...",
    });
  }, [toast]);

  const handleUploadStatement = useCallback(() => {
    toast({
      title: "Cargar estado de cuenta",
      description: "Selecciona un archivo para cargar el estado de cuenta.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Conciliación Bancaria"
        description="Concilia tus movimientos bancarios con tus facturas y pagos"
      />
      
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-end">
        <Button 
          variant="outline" 
          className="sm:w-auto"
          onClick={handleUploadStatement}
        >
          <FileUp className="mr-2 h-4 w-4" />
          Cargar Estado de Cuenta
        </Button>
        <Button 
          className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
          onClick={handleAutoConciliate}
        >
          <CheckCheck className="mr-2 h-4 w-4" />
          Conciliar Automáticamente
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {banks.map(bank => (
          <BankCard
            key={bank.id}
            name={bank.name}
            balance={bank.balance}
            accounts={bank.accounts}
            icon={Landmark}
          />
        ))}
        <BankCard
          name="Progreso de Conciliación"
          balance={67}
          accounts={4}
          icon={FilePlus2}
          valueIsCurrency={false}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
        <div className="relative flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Buscar por referencia, descripción, monto..."
            className="pl-8 bg-muted/50"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Spinner size="sm" />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <DateRangePicker onChange={handleDateRangeChange} />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 w-full sm:w-auto">
          <TabsTrigger value="all" className="flex gap-2 items-center">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Todos</span>
            <Badge variant="outline" className="ml-auto">{transactions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="matched" className="flex gap-2 items-center">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="hidden sm:inline">Conciliados</span>
            <Badge variant="outline" className="ml-auto">{matchedTransactions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="unmatched" className="flex gap-2 items-center">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="hidden sm:inline">Sin Conciliar</span>
            <Badge variant="outline" className="ml-auto">{unmatchedTransactions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="doubtful" className="flex gap-2 items-center">
            <XCircle className="h-4 w-4 text-danger" />
            <span className="hidden sm:inline">Dudosos</span>
            <Badge variant="outline" className="ml-auto">{doubtfulTransactions.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <TransactionsTable transactions={transactions} />
        </TabsContent>
        
        <TabsContent value="matched" className="mt-0">
          <TransactionsTable transactions={matchedTransactions} />
        </TabsContent>
        
        <TabsContent value="unmatched" className="mt-0">
          <TransactionsTable transactions={unmatchedTransactions} />
        </TabsContent>
        
        <TabsContent value="doubtful" className="mt-0">
          <TransactionsTable transactions={doubtfulTransactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Conciliacion;
