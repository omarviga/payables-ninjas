
// Re-exportamos todas las funcionalidades desde los módulos específicos
export { SatAuthResult, SatDownloadResult } from './sat/types';
export { authenticateWithFiel } from './sat/fielAuth';
export { downloadInvoices } from './sat/invoiceDownloader'; 
export { checkSessionStatus } from './sat/sessionManager';

// Proveemos un objeto satService para mantener la compatibilidad con el código existente
export const satService = {
  authenticateWithFiel,
  downloadInvoices,
  checkSessionStatus
};
