
// Import the functions that we'll re-export
import { authenticateWithFiel } from './sat/fielAuth';
import { downloadInvoices } from './sat/invoiceDownloader'; 
import { checkSessionStatus } from './sat/sessionManager';

// Re-export types with the 'export type' syntax (fixing TS1205 errors)
export type { SatAuthResult, SatDownloadResult } from './sat/types';

// Re-export functions
export { authenticateWithFiel } from './sat/fielAuth';
export { downloadInvoices } from './sat/invoiceDownloader'; 
export { checkSessionStatus } from './sat/sessionManager';

// Provide satService object with explicit property-value assignments (fixing TS18004 errors)
export const satService = {
  authenticateWithFiel: authenticateWithFiel,
  downloadInvoices: downloadInvoices,
  checkSessionStatus: checkSessionStatus
};
