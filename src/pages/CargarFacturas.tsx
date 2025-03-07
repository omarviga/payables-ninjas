
import { UploadInvoice } from '@/components/facturas/UploadInvoice';

const CargarFacturas = () => {
  console.log("Renderizando página CargarFacturas");
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-heading">Cargar Facturas (CFDI)</h1>
      <p className="text-muted-foreground">
        Sube facturas electrónicas (CFDI) en formato XML o su representación impresa en PDF para procesarlas automáticamente. 
        El sistema soporta facturas regulares, complementos de pago y notas de crédito.
      </p>
      
      <div className="max-w-3xl mx-auto w-full">
        <UploadInvoice />
      </div>
    </div>
  );
};

export default CargarFacturas;
