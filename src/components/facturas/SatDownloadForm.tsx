
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useInvoices } from '@/hooks/use-invoices';

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
  const [connectedRFC, setConnectedRFC] = useState<string>("");

  // Obtener el RFC de las credenciales guardadas
  useEffect(() => {
    const satCredentialsStr = localStorage.getItem('satCredentials');
    if (satCredentialsStr) {
      try {
        const satCredentials = JSON.parse(satCredentialsStr);
        setConnectedRFC(satCredentials.rfc);
      } catch (e) {
        console.error("Error parsing SAT credentials:", e);
      }
    }
  }, []);

  const handleDownload = async () => {
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
      await simulateProgressUpdate(50, "Buscando facturas disponibles...");
      
      // Perform the actual download
      const result = await downloadInvoicesFromSAT(requestId);
      
      if (result.success) {
        await simulateProgressUpdate(80, "Procesando facturas descargadas...");
        await simulateProgressUpdate(100, "¡Descarga completada!");
        
        // Reload the invoices to ensure the UI displays the downloaded ones
        await loadInvoices();
        
        toast({
          title: "Descarga exitosa",
          description: `Se han descargado ${result.downloadedCount || 0} facturas del SAT`,
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
          description: result.error || "No se pudieron descargar las facturas del SAT",
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
      {connectedRFC && (
        <div className="rounded-md bg-muted p-3 flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-payables-100 flex items-center justify-center">
            <CalendarIcon className="h-4 w-4 text-payables-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Cuenta conectada: <span className="font-semibold">{connectedRFC}</span></p>
            <p className="text-xs text-muted-foreground">Autorizado para descarga automática de CFDI</p>
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
                disabled={loading}
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
        <p className="mt-1">El proceso puede tardar algunos minutos dependiendo del volumen de facturas.</p>
      </div>
    </div>
  );
}
