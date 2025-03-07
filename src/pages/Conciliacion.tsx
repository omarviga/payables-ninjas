import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileUp, Calendar, Filter, CreditCard, Wallet, 
  CheckCircle2, AlertCircle, XCircle, Eye, ArrowUpRight,
  ArrowDownLeft, CheckCheck, FilePlus2, Landmark
} from 'lucide-react';

const transactions = [
  {
    id: '1',
    date: '15/05/2023',
    reference: 'TRF987654',
    description: 'TRANSFERENCIA RECIBIDA DE EMPRESA ABC',
    amount: 15000,
    type: 'credit',
    status: 'matched',
    matchedDocument: 'FAC-2023-001',
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '2',
    date: '18/05/2023',
    reference: 'TRF123456',
    description: 'PAGO A PROVEEDOR SUMINISTROS SA',
    amount: 8500,
    type: 'debit',
    status: 'matched',
    matchedDocument: 'PROV-2023-001',
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '3',
    date: '20/05/2023',
    reference: 'TDC98765',
    description: 'CARGO TARJETA CORPORATIVA MUEBLES Y EQ',
    amount: 2000,
    type: 'debit',
    status: 'unmatched',
    matchedDocument: null,
    accountName: 'TARJETA CORPORATIVA'
  },
  {
    id: '4',
    date: '25/05/2023',
    reference: 'DEP123456',
    description: 'DEPÓSITO EN EFECTIVO',
    amount: 3000,
    type: 'credit',
    status: 'matched',
    matchedDocument: 'FAC-2023-002',
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '5',
    date: '28/05/2023',
    reference: 'DOMICIL987',
    description: 'CARGO DOMICILIADO SERVICIOS VARIOS',
    amount: 1200,
    type: 'debit',
    status: 'unmatched',
    matchedDocument: null,
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '6',
    date: '01/06/2023',
    reference: 'CHQ000123',
    description: 'COBRO DE CHEQUE 000123',
    amount: 5000,
    type: 'debit',
    status: 'doubtful',
    matchedDocument: null,
    accountName: 'CUENTA PRINCIPAL BBVA'
  }
];

const statusColors: Record<string, string> = {
  matched: "bg-success/20 text-success hover:bg-success/30",
  unmatched: "bg-warning/20 text-warning hover:bg-warning/30",
  doubtful: "bg-danger/20 text-danger hover:bg-danger/30",
};

const statusMap: Record<string, { text: string, icon: any }> = {
  matched: {
    text: "Conciliado",
    icon: CheckCircle2
  },
  unmatched: {
    text: "Sin Conciliar",
    icon: AlertCircle
  },
  doubtful: {
    text: "Dudoso",
    icon: XCircle
  }
};

const typeMap: Record<string, { text: string, icon: any, className: string }> = {
  credit: {
    text: "Ingreso",
    icon: ArrowDownLeft,
    className: "text-success"
  },
  debit: {
    text: "Egreso",
    icon: ArrowUpRight,
    className: "text-danger"
  }
};

const banks = [
  { id: 'bbva', name: 'BBVA', accounts: 2, balance: 120000 },
  { id: 'santander', name: 'Santander', accounts: 1, balance: 75000 },
  { id: 'banorte', name: 'Banorte', accounts: 1, balance: 45000 }
];

const Conciliacion = () => {
  const matchedTransactions = transactions.filter(tx => tx.status === 'matched');
  const unmatchedTransactions = transactions.filter(tx => tx.status === 'unmatched');
  const doubtfulTransactions = transactions.filter(tx => tx.status === 'doubtful');
  
  const renderTransactionsTable = (txList: typeof transactions) => (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Referencia</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Cuenta</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {txList.map((tx) => {
            const StatusIcon = statusMap[tx.status].icon;
            const TypeIcon = typeMap[tx.type].icon;
            
            return (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell className="font-medium">{tx.reference}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.accountName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TypeIcon className={`h-4 w-4 ${typeMap[tx.type].className}`} />
                    <span>{typeMap[tx.type].text}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${tx.amount.toLocaleString('es-MX')}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[tx.status]}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusMap[tx.status].text}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="Ver detalles">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {tx.status !== 'matched' && (
                      <Button variant="ghost" size="icon" title="Conciliar manualmente">
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Conciliación Bancaria</h1>
          <p className="text-muted-foreground mt-1">
            Concilia tus movimientos bancarios con tus facturas y pagos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild variant="outline" className="sm:w-auto">
            <div>
              <FileUp className="mr-2 h-4 w-4" />
              Cargar Estado de Cuenta
            </div>
          </Button>
          <Button className="bg-payables-600 hover:bg-payables-700 sm:w-auto">
            <CheckCheck className="mr-2 h-4 w-4" />
            Conciliar Automáticamente
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {banks.map(bank => (
          <Card key={bank.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{bank.name}</CardTitle>
              <Landmark className="h-4 w-4 text-payables-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">${bank.balance.toLocaleString('es-MX')}</div>
              <p className="text-xs text-muted-foreground">
                {bank.accounts} {bank.accounts === 1 ? 'cuenta' : 'cuentas'}
              </p>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso de Conciliación</CardTitle>
            <FilePlus2 className="h-4 w-4 text-payables-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">67%</div>
            <Progress value={67} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              4 de 6 movimientos conciliados
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
        <div className="relative flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Buscar por referencia, descripción, monto..."
            className="pl-8 bg-muted/50"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
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
          {renderTransactionsTable(transactions)}
        </TabsContent>
        
        <TabsContent value="matched" className="mt-0">
          {renderTransactionsTable(matchedTransactions)}
        </TabsContent>
        
        <TabsContent value="unmatched" className="mt-0">
          {renderTransactionsTable(unmatchedTransactions)}
        </TabsContent>
        
        <TabsContent value="doubtful" className="mt-0">
          {renderTransactionsTable(doubtfulTransactions)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Conciliacion;
