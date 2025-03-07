
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { UploadTab } from './UploadTab';
import { SatDownloadTab } from './SatDownloadTab';

export function UploadInvoice() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');

  const configureConnection = () => {
    toast({
      title: "Configuración SAT",
      description: "Se abrirá el formulario para configurar la conexión con el SAT."
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const navigateToInvoices = () => {
    navigate('/facturas');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Cargar Facturas (CFDI)</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="upload" 
          value={activeTab} 
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Carga Manual</TabsTrigger>
            <TabsTrigger value="sat">Descarga SAT</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <UploadTab onNavigateToInvoices={navigateToInvoices} />
          </TabsContent>
          
          <TabsContent value="sat">
            <SatDownloadTab onConfigureConnection={configureConnection} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
