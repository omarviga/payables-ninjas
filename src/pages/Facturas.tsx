
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, FileUp, Download, Filter, Eye, 
  FileText, FileCog, FileX, Check 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Datos de ejemplo
const invoices = [
  { 
    id: '1', 
    number: 'FAC-2023-001', 
    client: 'Empresa ABC', 
    amount: 15000, 
    date: '15/01/2023', 
    dueDate: '15/02/2023', 
    status: 'paid',
    type: 'receivable'
  },
  { 
    id: '2', 
    number: 'FAC-2023-002', 
    client: 'Corporativo XYZ', 
    amount: 7500, 
    date: '01/02/2023', 
    dueDate: '03/03/2023', 
    status: 'pending',
    type: 'receivable'
  },
  { 
    id: '3', 
    number: 'FAC-2023-003', 
    client: 'Servicios Integrales', 
    amount: 12000, 
    date: '15/02/2023', 
    dueDate: '17/03/2023', 
    status: 'pending',
    type: 'receivable'
  },
  { 
    id: '4', 
    number: 'FAC-2023-004', 
    client: 'Distribuidora Nacional', 
    amount: 5000, 
    date: '10/01/2023', 
    dueDate: '09/02/2023', 
    status: 'overdue',
    type: 'receivable'
  },
  { 
    id: '5', 
    number: 'PROV-2023-001', 
    client: 'Suministros SA', 
    amount: 8500, 
    date: '15/01/2023', 
    dueDate: '14/02/2023', 
    status: 'paid',
    type: 'payable'
  },
  { 
    id: '6', 
    number: 'PROV-2023-002', 
    client: 'Muebles y Equipos', 
    amount: 3700, 
    date: '01/02/2023', 
    dueDate: '03/03/2023', 
    status: 'pending',
    type: 'payable'
  },
  { 
    id: '7', 
    number: 'PROV-2023-003', 
    client: 'Servicios Digitales', 
    amount: 6000, 
    date: '10/02/2023', 
    dueDate: '12/03/2023', 
    status: 'pending',
    type: 'payable'
  },
  { 
    id: '8', 
    number: 'PROV-2023-004', 
    client: 'Papelería Global', 
    amount: 1500, 
    date: '05/01/2023', 
    dueDate: '04/02/2023', 
    status: 'overdue',
    type: 'payable'
  },
];

const statusColors: Record<string, string> = {
  paid: "bg-success/20 text-success hover:bg-success/30",
  pending: "bg-warning/20 text-warning hover:bg-warning/30",
  overdue: "bg-danger/20 text-danger hover:bg-danger/30",
};

const statusMap: Record<string, string> = {
  paid: "Pagado",
  pending: "Pendiente",
  overdue: "Vencido",
};

const Facturas = () => {
  const receiveInvoices = invoices.filter(inv => inv.type === 'receivable');
  const payableInvoices = invoices.filter(inv => inv.type === 'payable');

  const renderInvoiceTable = (invoiceList: typeof invoices) => (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Factura</TableHead>
            <TableHead>Cliente/Proveedor</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Fecha Emisión</TableHead>
            <TableHead>Fecha Vencimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceList.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-right">
                ${invoice.amount.toLocaleString('es-MX')}
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[invoice.status]}>
                  {statusMap[invoice.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" title="Ver factura">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Descargar factura">
                    <Download className="h-4 w-4" />
                  </Button>
                  {invoice.status === 'pending' && (
                    <Button variant="ghost" size="icon" className="text-success" title="Marcar como pagada">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
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
            <h1 className="text-3xl font-bold font-heading">Facturas</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona todas tus facturas emitidas y recibidas
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline" className="sm:w-auto">
              <Link to="/cargar-facturas">
                <FileUp className="mr-2 h-4 w-4" />
                Cargar Facturas
              </Link>
            </Button>
            <Button className="bg-payables-600 hover:bg-payables-700 sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Descargar del SAT
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por cliente, número de factura, monto..."
              className="pl-8 bg-muted/50"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 w-full sm:w-auto">
            <TabsTrigger value="all" className="flex gap-2 items-center">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Todas</span>
              <Badge variant="outline" className="ml-auto">{invoices.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="receivable" className="flex gap-2 items-center">
              <FileCog className="h-4 w-4" />
              <span className="hidden sm:inline">Por Cobrar</span>
              <Badge variant="outline" className="ml-auto">{receiveInvoices.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="payable" className="flex gap-2 items-center">
              <FileCog className="h-4 w-4" />
              <span className="hidden sm:inline">Por Pagar</span>
              <Badge variant="outline" className="ml-auto">{payableInvoices.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue" className="flex gap-2 items-center">
              <FileX className="h-4 w-4" />
              <span className="hidden sm:inline">Vencidas</span>
              <Badge variant="outline" className="ml-auto">
                {invoices.filter(inv => inv.status === 'overdue').length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {renderInvoiceTable(invoices)}
          </TabsContent>
          
          <TabsContent value="receivable" className="mt-0">
            {renderInvoiceTable(receiveInvoices)}
          </TabsContent>
          
          <TabsContent value="payable" className="mt-0">
            {renderInvoiceTable(payableInvoices)}
          </TabsContent>
          
          <TabsContent value="overdue" className="mt-0">
            {renderInvoiceTable(invoices.filter(inv => inv.status === 'overdue'))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Facturas;
