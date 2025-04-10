
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Download, Key, RefreshCw, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useInvoices } from '@/hooks/use-invoices';
import { satService } from '@/services/satService';

interface SatDownloadFormProps {
  onNavigateToInvoices: () => void;
}

export function SatDownloadForm({ onNavigateToInvoices }: SatDownloadFormProps) {
  const { toast } = useToast();
  const { downloadInvoicesFromSAT, loadInvoices } = useInvoices();
  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)),
    to: new Date()
  });
  const [invoiceType, setInvoiceType] = useState<string>("all");
  const [satCredentials, setSatCredentials] = useState<{
    rfc: string;
    authType: string;
    sessionToken?: string;
  } | null>(null);

  // Obtener las credenciales del SAT guardadas
  useEffect(() => {
    const satCredentialsStr = localStorage.getItem('satCredentials');
    if (satCredentialsStr) {
      try {
        const credentials = JSON.parse(satCredentialsStr);
        setSatCredentials({
          rfc: credentials.rfc,
          authType: credentials.authType || 'password',
          sessionToken: credentials.sessionToken
        });
        
        // Verificar si la sesión sigue activa
        if (credentials.sessionToken) {
          satService.checkSessionStatus(credentials.sessionToken)
            .then(isActive => {
              if (!isActive) {
                toast({
                  title: "Sesión expirada",
                  description: "Tu sesión del SAT ha expirado. Por favor, vuelve a autenticarte.",
                  variant: "destructive"
                });
                localStorage.removeItem('satCredentials');
                setSatCredentials(null);
              }
            });
        }
      } catch (e) {
        console.error("Error parsing SAT credentials:", e);
        localStorage.removeItem('satCredentials');
      }
    }
  }, [toast]);

  const handleDownload = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Fecha requerida",
        description: "Debes seleccionar un rango de fechas para la descarga",
        variant: "destructive"
      });
      return;
    }
    
    if (!satCredentials?.sessionToken) {
      toast({
        title: "Autenticación requerida",
        description: "No hay una sesión activa con el SAT. Configura tus credenciales.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setDownloadProgress(0);
    setDownloadStatus("Conectando con el SAT...");
    
    toast({
      title: "Conectando con el SAT",
      description: "Iniciando descarga de facturas...",
    });
    
    // Generate a request ID
    const requestId = 'REQ-' + Date.now();
    
    try {
      // Update progress indicators
      await simulateProgressUpdate(30, "Autenticando con el SAT...");
      
      // Primero intentamos usar el servicio seguro para la descarga
      const downloadResult = await satService.downloadInvoices(
        satCredentials.sessionToken,
        dateRange.from,
        dateRange.to,
        invoiceType
      );
      
      if (downloadResult.success) {
        await simulateProgressUpdate(50, "Descargando facturas disponibles...");
        await simulateProgressUpdate(80, "Procesando facturas descargadas...");
        
        // Si el servicio seguro funcionó, registramos las facturas en el sistema
        const result = await downloadInvoicesFromSAT(requestId);
        
        await simulateProgressUpdate(100, "¡Descarga completada!");
        
        // Reload the invoices to ensure the UI displays the downloaded ones
        await loadInvoices();
        
        toast({
          title: "Descarga exitosa",
          description: `Se han descargado ${downloadResult.downloadedCount || 0} facturas del SAT`,
        });
        
        // Redirect to invoices section
        setTimeout(() => {
          onNavigateToInvoices();
        }, 1500);
      } else {
        setDownloadProgress(0);
        setDownloadStatus("Error en la descarga");
        
        toast({
          title: "Error de descarga",
          description: downloadResult.error || "No se pudieron descargar las facturas del SAT",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error al descargar facturas:", error);
      setDownloadProgress(0);
      setDownloadStatus("Error en la descarga");
      
      toast({
        title: "Error de descarga",
        description: "Ocurrió un error al intentar descargar las facturas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to simulate progress updates
  const simulateProgressUpdate = async (progress: number, status: string) => {
    setDownloadProgress(progress);
    setDownloadStatus(status);
    await new Promise(resolve => setTimeout(resolve, 400));
  };

  return (
    <div className="space-y-6">
      {satCredentials && (
        <div className="rounded-md bg-muted p-3 flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-payables-100 flex items-center justify-center">
            {satCredentials.authType === 'fiel' ? (
              <ShieldCheck className="h-4 w-4 text-payables-600" />
            ) : (
              <Key className="h-4 w-4 text-payables-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">
              Cuenta conectada: <span className="font-semibold">{satCredentials.rfc}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {satCredentials.authType === 'fiel' 
                ? 'Autenticado con e.firma (FIEL)' 
                : 'Autorizado para descarga automática de CFDI'}
            </p>
          </div>
        </div>
      )}
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="date-range">Periodo de descarga</Label>
              <DateRangePicker
                initialDateRange={dateRange}
                onChange={setDateRange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invoice-type">Tipo de comprobante</Label>
              <Select value={invoiceType} onValueChange={setInvoiceType}>
                <SelectTrigger id="invoice-type">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="received">Recibidos (facturas por pagar)</SelectItem>
                  <SelectItem value="issued">Emitidos (facturas por cobrar)</SelectItem>
                  <SelectItem value="payments">Complementos de pago</SelectItem>
                  <SelectItem value="credit-notes">Notas de crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {loading && (
              <div className="space-y-2 py-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{downloadStatus}</span>
                  <span>{downloadProgress}%</span>
                </div>
                <Progress value={downloadProgress} className="h-2" />
              </div>
            )}
            
            <div className="pt-4">
              <Button 
                onClick={handleDownload} 
                className="w-full bg-payables-600 hover:bg-payables-700"
                disabled={loading || !satCredentials?.sessionToken}
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Descargando...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar desde SAT
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Esta función descarga automáticamente los CFDIs desde el portal del SAT utilizando tus credenciales configuradas.</p>
        <p className="mt-1">
          {satCredentials?.authType === 'fiel' 
            ? 'La autenticación con e.firma garantiza la máxima seguridad en la conexión.' 
            : 'El proceso puede tardar algunos minutos dependiendo del volumen de facturas.'}
        </p>
      </div>
    </div>
  );
}
