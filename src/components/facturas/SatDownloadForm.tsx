
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface SatDownloadFormProps {
  onNavigateToInvoices: () => void;
}

export function SatDownloadForm({ onNavigateToInvoices }: SatDownloadFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)),
    to: new Date()
  });
  const [invoiceType, setInvoiceType] = useState<string>("all");

  const handleDownload = async () => {
    setLoading(true);
    
    // Simulación de descarga
    toast({
      title: "Conectando con el SAT",
      description: "Iniciando descarga de facturas...",
    });
    
    // Simulamos una espera
    setTimeout(() => {
      toast({
        title: "Descarga exitosa",
        description: "Se han descargado 12 facturas del SAT",
        variant: "default", // Changed from "success" to "default"
      });
      setLoading(false);
      
      // Redirigir a la sección de facturas
      setTimeout(() => {
        onNavigateToInvoices();
      }, 1500);
    }, 3000);
  };

  return (
    <div className="space-y-6">
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
