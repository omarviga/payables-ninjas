
import { useState, useCallback, memo } from 'react';
import { UploadInvoice } from '@/components/facturas/UploadInvoice';
import { PageHeader } from '@/components/common/PageHeader';

// Constantes para textos estáticos
const PAGE_TITLE = "Cargar Facturas (CFDI)";
const PAGE_DESCRIPTION = 
  "Sube facturas electrónicas (CFDI) en formato XML o su representación impresa en PDF para procesarlas automáticamente. " +
  "El sistema soporta facturas regulares, complementos de pago y notas de crédito.";

// Componente memoizado para evitar re-renderizados innecesarios
const MemoizedUploadInvoice = memo(UploadInvoice);

const CargarFacturas = () => {
  console.log("Renderizando página CargarFacturas");
  
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
      />
      
      <div className="max-w-3xl mx-auto w-full">
        <MemoizedUploadInvoice />
      </div>
    </div>
  );
};

export default CargarFacturas;
