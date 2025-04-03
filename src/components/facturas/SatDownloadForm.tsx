
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface SatDownloadFormProps {
  onNavigateToInvoices: () => void;
}

export function SatDownloadForm({ onNavigateToInvoices }: SatDownloadFormProps) {
  const { toast } = useToast();
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
    
    // Simulación del proceso de descarga con actualizaciones visuales
    await simulateDownloadSteps();
    
    setLoading(false);
    setDownloadProgress(100);
    setDownloadStatus("¡Descarga completada!");
    
    toast({
      title: "Descarga exitosa",
      description: "Se han descargado 12 facturas del SAT",
      variant: "default", 
    });
    
    // Redirigir a la sección de facturas
    setTimeout(() => {
      onNavigateToInvoices();
    }, 1500);
  };

  // Simula los pasos de descarga con actualizaciones de progreso
  const simulateDownloadSteps = async () => {
    const steps = [
      { progress: 10, status: "Autenticando con el SAT...", delay: 500 },
      { progress: 20, status: "Validando sesión JWT...", delay: 400 },
      { progress: 30, status: "Buscando facturas disponibles...", delay: 800 },
      { progress: 40, status: "Encontradas 12 facturas para descargar", delay: 500 },
      { progress: 50, status: "Descargando facturas emitidas...", delay: 700 },
      { progress: 70, status: "Descargando complementos de pago...", delay: 800 },
      { progress: 85, status: "Procesando documentos XML...", delay: 600 },
      { progress: 95, status: "Guardando en su base de datos...", delay: 600 }
    ];

    for (const step of steps) {
      setDownloadProgress(step.progress);
      setDownloadStatus(step.status);
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }
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
