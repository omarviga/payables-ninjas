
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Invoice } from '@/data/invoices';
import { addInvoices } from '@/data/invoices';

// Define the SATDownloadResult type inline to avoid import issues
export interface SATDownloadResult {
  success: boolean;
  downloadedCount?: number;
  error?: string;
}

export const useSATDownload = (
  setAllInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const downloadInvoicesFromSAT = useCallback(async (requestId: string): Promise<SATDownloadResult> => {
    const satCredentialsStr = localStorage.getItem('satCredentials');
    if (!satCredentialsStr) {
      toast({
        title: "Error de configuración",
        description: "No hay credenciales configuradas para el SAT",
        variant: "destructive"
      });
      return { success: false, error: "Credenciales no configuradas" };
    }

    try {
      const satCredentials = JSON.parse(satCredentialsStr);
      
      if (satCredentials.expiresAt && Date.now() > satCredentials.expiresAt) {
        toast({
          title: "Sesión expirada",
          description: "Tu sesión del SAT ha expirado. Por favor, inicia sesión nuevamente.",
          variant: "destructive"
        });
        localStorage.removeItem('satCredentials');
        return { success: false, error: "Sesión expirada" };
      }

      setIsLoading(true);
      toast({
        title: "Descargando facturas",
        description: "Iniciando descarga de facturas desde el SAT...",
      });

      console.log("Descargando facturas del SAT con:", { 
        rfc: satCredentials.rfc,
        token: satCredentials.token.substring(0, 15) + "...",
        requestId 
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      const demoInvoices: Invoice[] = [
        {
          id: `sat-${Date.now()}-1`,
          number: `SAT-${Math.floor(Math.random() * 10000)}`,
          client: "SERVICIO DE ADMINISTRACIÓN TRIBUTARIA",
          amount: Math.floor(Math.random() * 10000) + 1000,
          date: new Date().toLocaleDateString('es-MX'),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX'),
          status: Math.random() > 0.5 ? 'paid' : 'pending',
          type: Math.random() > 0.5 ? 'receivable' : 'payable',
          uuid: `uuid-sat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        },
        {
          id: `sat-${Date.now()}-2`,
          number: `SAT-${Math.floor(Math.random() * 10000)}`,
          client: "CFE SUMINISTRADOR DE SERVICIOS BÁSICOS",
          amount: Math.floor(Math.random() * 10000) + 1000,
          date: new Date().toLocaleDateString('es-MX'),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX'),
          status: 'pending',
          type: 'payable',
          uuid: `uuid-sat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        }
      ];

      // Usar addInvoices para asegurar que las facturas se guarden correctamente
      await addInvoices(demoInvoices);
      
      // Actualizar el estado local también
      setAllInvoices(prev => [...prev, ...demoInvoices]);
      
      toast({
        title: "Descarga completada",
        description: `Se descargaron ${demoInvoices.length} facturas del SAT exitosamente.`,
      });
      
      return { success: true, downloadedCount: demoInvoices.length };
    } catch (error) {
      console.error("Error al descargar facturas del SAT:", error);
      toast({
        title: "Error de descarga",
        description: "Ocurrió un error al intentar descargar facturas del SAT.",
        variant: "destructive"
      });
      return { success: false, error: "Error al conectar con el SAT" };
    } finally {
      setIsLoading(false);
    }
  }, [toast, setAllInvoices, setIsLoading]);

  return { downloadInvoicesFromSAT };
};
