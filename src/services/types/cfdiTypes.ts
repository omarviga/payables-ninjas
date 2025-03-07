
import type { Invoice } from '@/data/invoices';

// Enum para los tipos de CFDI
export enum CfdiType {
  INGRESO = 'ingreso',
  EGRESO = 'egreso',
  TRASLADO = 'traslado',
  NOMINA = 'nomina',
  PAGO = 'pago',
  DONATIVO = 'donativo',
  EXPORTACION = 'exportacion'
}

// Enum para los tipos de comprobante según el SAT
export enum TipoDeComprobante {
  INGRESO = 'I',
  EGRESO = 'E',
  TRASLADO = 'T',
  NOMINA = 'N',
  PAGO = 'P'
}

// Interfaz para información extraída del XML
export interface CfdiMetadata {
  uuid?: string;
  tipoDeComprobante?: TipoDeComprobante;
  rfcEmisor?: string;
  nombreEmisor?: string;
  rfcReceptor?: string;
  nombreReceptor?: string;
  total?: number;
  subtotal?: number;
  fechaEmision?: string;
  conceptos?: Array<{
    descripcion: string;
    importe: number;
    claveProdServ?: string;
  }>;
  relacionados?: Array<{
    uuid: string;
    tipoRelacion: string;
  }>;
  complementos?: {
    pagos?: Array<{
      fechaPago: string;
      formaDePago: string;
      monto: number;
      doctoRelacionado?: Array<{
        idDocumento: string;
        serie?: string;
        folio?: string;
        monedaDR?: string;
        metodoDePagoDR?: string;
        numParcialidad?: number;
        impSaldoAnt?: number;
        impPagado?: number;
        impSaldoInsoluto?: number;
      }>;
    }>;
    nomina?: {
      // Información relevante de nómina
    };
  };
}
