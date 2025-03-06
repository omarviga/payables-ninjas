import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Calendar, Plus, ArrowUpRight, ArrowDownLeft,
  CreditCard, Wallet, MoreHorizontal, Eye, FileText, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const payments = [
  {
    id: '1',
    date: '15/05/2023',
    type: 'outgoing',
    recipient: 'Suministros SA',
    concept: 'Pago de factura PROV-2023-001',
    amount: 8500,
    method: 'Transferencia',
    status: 'completed',
    invoiceId: 'PROV-2023-001'
  },
  {
    id: '2',
    date: '20/05/2023',
    type: 'outgoing',
    recipient: 'Muebles y Equipos',
    concept: 'Anticipo de compra',
    amount: 2000,
    method: 'Tarjeta Corporativa',
    status: 'completed',
    invoiceId: null
  },
  {
    id: '3',
    date: '01/06/2023',
    type: 'outgoing',
    recipient: 'Servicios Digitales',
    concept: 'Pago de factura PROV-2023-003',
    amount: 6000,
    method: 'Transferencia',
    status: 'pending',
    invoiceId: 'PROV-2023-003'
  },
  {
    id: '4',
    date: '10/05/2023',
    type: 'incoming',
    recipient: 'Empresa ABC',
    concept: 'Pago de factura FAC-2023-001',
    amount: 15000,
    method: 'Transferencia',
    status: 'completed',
    invoiceId: 'FAC-2023-001'
  },
  {
    id: '5',
    date: '25/05/2023',
    type: 'incoming',
    recipient: 'Corporativo XYZ',
    concept: 'Pago parcial de factura FAC-2023-002',
    amount: 3000,
    method: 'Depósito en Efectivo',
    status: 'completed',
    invoiceId: 'FAC-2023-002'
  },
  {
    id: '6',
    date: '08/06/2023',
    type: 'incoming',
    recipient: 'Servicios Integrales',
    concept: 'Pago de factura FAC-2023-003',
    amount: 12000,
    method: 'Transferencia',
    status: 'pending',
    invoiceId: 'FAC-2023-003'
  }
];

const statusColors: Record<string, string> = {
  completed: "bg-success/20 text-success hover:bg-success/30",
  pending: "bg-warning/20 text-warning hover:bg-warning/30",
  failed: "bg-danger/20 text-danger hover:bg-danger/30",
};

const statusMap: Record<string, string> = {
  completed: "Completado",
  pending: "Pendiente",
  failed: "Fallido",
};

const typeMap: Record<string, { text: string, icon: any, className: string }> = {
  incoming: {
    text: "Ingreso",
    icon: ArrowDownLeft,
    className: "text-success"
  },
  outgoing: {
    text: "Egreso",
    icon: ArrowUpRight,
    className: "text-danger"
  }
};

const Pagos = () => {
  const incomingPayments = payments.filter(payment => payment.type === 'incoming');
  const outgoingPayments = payments.filter(payment => payment.type === 'outgoing');

  const renderPaymentsTable = (paymentList: typeof payments) => (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Cliente/Proveedor</TableHead>
            <TableHead>Concepto</TableHead>
            <TableHead>Método</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentList.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {payment.type === 'incoming' ? (
                    <ArrowDownLeft className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-danger" />
                  )}
                  <span>{payment.type === 'incoming' ? 'Ingreso' : 'Egreso'}</span>
                </div>
              </TableCell>
              <TableCell>{payment.recipient}</TableCell>
              <TableCell>{payment.concept}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell className="text-right font-medium">
                ${payment.amount.toLocaleString('es-MX')}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[payment.status]}>
                  {statusMap[payment.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" title="Ver detalles">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {payment.invoiceId && (
                    <Button variant="ghost" size="icon" title="Ver factura relacionada">
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" title="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading">Pagos y Cobros</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona todos los pagos realizados y cobros recibidos
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline" className="sm:w-auto">
              <Link to="#">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Registrar Pago
              </Link>
            </Button>
            <Button className="bg-payables-600 hover:bg-payables-700 sm:w-auto">
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Registrar Cobro
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cobrado</CardTitle>
              <Wallet className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$30,000.00</div>
              <p className="text-xs text-muted-foreground">
                +15% respecto al mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
              <CreditCard className="h-4 w-4 text-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$16,500.00</div>
              <p className="text-xs text-muted-foreground">
                +5% respecto al mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <Wallet className="h-4 w-4 text-payables-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$13,500.00</div>
              <p className="text-xs text-muted-foreground">
                En el periodo actual
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por cliente, concepto, monto..."
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
          <TabsList className="grid grid-cols-3 mb-4 w-full sm:w-auto">
            <TabsTrigger value="all" className="flex gap-2 items-center">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Todos</span>
              <Badge variant="outline" className="ml-auto">{payments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="incoming" className="flex gap-2 items-center">
              <ArrowDownLeft className="h-4 w-4 text-success" />
              <span className="hidden sm:inline">Cobros</span>
              <Badge variant="outline" className="ml-auto">{incomingPayments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex gap-2 items-center">
              <ArrowUpRight className="h-4 w-4 text-danger" />
              <span className="hidden sm:inline">Pagos</span>
              <Badge variant="outline" className="ml-auto">{outgoingPayments.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {renderPaymentsTable(payments)}
          </TabsContent>
          
          <TabsContent value="incoming" className="mt-0">
            {renderPaymentsTable(incomingPayments)}
          </TabsContent>
          
          <TabsContent value="outgoing" className="mt-0">
            {renderPaymentsTable(outgoingPayments)}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Pagos;
