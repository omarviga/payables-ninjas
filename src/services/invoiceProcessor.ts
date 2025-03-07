
import type { Invoice } from '@/data/invoices';

// Función para procesar un archivo XML y extraer datos de factura
export const processXmlFile = (file: File): Promise<Invoice> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const xmlContent = e.target?.result as string;
      // Aquí normalmente se implementaría un parser XML para extraer datos
      // Para esta demostración, generamos datos simulados basados en el nombre del archivo
      
      const type = file.name.toLowerCase().includes('prov') ? 'payable' : 'receivable';
      const status = Math.random() > 0.7 ? 'pending' : 'paid';
      const amount = Math.floor(Math.random() * 10000) + 1000;
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 30);
      
      const formatDate = (date: Date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      };
      
      const invoice: Invoice = {
        id: `xml-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        number: `CFDI-${Math.floor(Math.random() * 10000)}`,
        client: file.name.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' '),
        amount: amount,
        date: formatDate(today),
        dueDate: formatDate(dueDate),
        status: status,
        type: type
      };
      
      resolve(invoice);
    };
    
    reader.onerror = () => {
      // En caso de error, devolver una factura con datos genéricos
      resolve({
        id: `error-${Date.now()}`,
        number: `Error-${file.name}`,
        client: 'Error al procesar',
        amount: 0,
        date: new Date().toLocaleDateString('es-MX'),
        dueDate: new Date().toLocaleDateString('es-MX'),
        status: 'pending',
        type: 'receivable'
      });
    };
    
    reader.readAsText(file);
  });
};

// Función para detectar tipo de CFDI basado en el nombre del archivo
export const detectCfdiType = (fileName: string): string => {
  if (!fileName.endsWith('.xml')) return '';
  
  if (fileName.toLowerCase().includes('pago')) {
    return 'complemento-pago';
  } else if (fileName.toLowerCase().includes('nota') || fileName.toLowerCase().includes('credito')) {
    return 'nota-credito';
  } else {
    return 'factura';
  }
};

// Función para filtrar archivos válidos (XML y PDF)
export const filterValidFiles = (files: File[]): File[] => {
  return files.filter(file => 
    file.type === 'application/xml' || 
    file.type === 'text/xml' ||
    file.name.endsWith('.xml') ||
    file.type === 'application/pdf'
  );
};
