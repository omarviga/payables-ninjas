
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
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const [invoicesList, setInvoicesList] = useState(invoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const receiveInvoices = invoicesList.filter(inv => inv.type === 'receivable');
  const payableInvoices = invoicesList.filter(inv => inv.type === 'payable');
  const overdueInvoices = invoicesList.filter(inv => inv.status === 'overdue');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = () => {
    // Filtrar facturas basado en la búsqueda
    if (!searchQuery.trim()) {
      setInvoicesList(invoices);
      return;
    }

    const filtered = invoices.filter(inv => 
      inv.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.amount.toString().includes(searchQuery)
    );
    
    setInvoicesList(filtered);
    
    toast({
      title: `Resultados de búsqueda`,
      description: `Se encontraron ${filtered.length} facturas que coinciden con "${searchQuery}"`,
    });
  };

  const handleResetFilter = () => {
    setSearchQuery('');
    setInvoicesList(invoices);
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    // Actualizar el estado de la factura a "pagado"
    const updatedInvoices = invoicesList.map(inv => 
      inv.id === invoiceId ? { ...inv, status: 'paid' } : inv
    );
    
    setInvoicesList(updatedInvoices);
    
    toast({
      title: "Factura marcada como pagada",
      description: "La factura ha sido actualizada exitosamente.",
    });
  };

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = invoicesList.find(inv => inv.id === invoiceId);
    
    toast({
      title: `Vista previa de factura: ${invoice?.number}`,
      description: `Cliente: ${invoice?.client}, Monto: $${invoice?.amount.toLocaleString('es-MX')}`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    const invoice = invoicesList.find(inv => inv.id === invoiceId);
    
    toast({
      title: "Descargando factura",
      description: `Descargando factura ${invoice?.number} en formato PDF.`,
    });
  };

  const handleExportInvoices = () => {
    toast({
      title: "Exportando facturas",
      description: `Se están exportando ${
        activeTab === 'all' ? invoicesList.length : 
        activeTab === 'receivable' ? receiveInvoices.length :
        activeTab === 'payable' ? payableInvoices.length : 
        overdueInvoices.length
      } facturas a formato CSV.`,
    });
  };

  const handleImportInvoices = () => {
    toast({
      title: "Importar facturas",
      description: "Esta funcionalidad permitirá importar facturas desde un archivo CSV.",
    });
  };

  const handleDownloadFromSAT = () => {
    toast({
      title: "Conectando con el SAT",
      description: "Iniciando proceso de descarga de facturas desde el portal del SAT.",
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Ver factura"
                    onClick={() => handleViewInvoice(invoice.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Descargar factura"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {invoice.status === 'pending' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-success" 
                      title="Marcar como pagada"
                      onClick={() => handleMarkAsPaid(invoice.id)}
                    >
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
            <Button 
              variant="outline" 
              className="sm:w-auto"
              onClick={handleImportInvoices}
            >
              <FileUp className="mr-2 h-4 w-4" />
              Cargar Facturas
            </Button>
            <Button 
              className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
              onClick={handleDownloadFromSAT}
            >
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
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleFilter}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={handleExportInvoices}
            >
              Exportar
            </Button>
          </div>
        </div>
        
        <Tabs 
          defaultValue="all" 
          className="w-full"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-4 mb-4 w-full sm:w-auto">
            <TabsTrigger value="all" className="flex gap-2 items-center">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Todas</span>
              <Badge variant="outline" className="ml-auto">{invoicesList.length}</Badge>
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
                {overdueInvoices.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {renderInvoiceTable(invoicesList)}
          </TabsContent>
          
          <TabsContent value="receivable" className="mt-0">
            {renderInvoiceTable(receiveInvoices)}
          </TabsContent>
          
          <TabsContent value="payable" className="mt-0">
            {renderInvoiceTable(payableInvoices)}
          </TabsContent>
          
          <TabsContent value="overdue" className="mt-0">
            {renderInvoiceTable(overdueInvoices)}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Facturas;
