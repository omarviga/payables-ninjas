
// Define los tipos para los resultados de operaciones SAT
export interface SatAuthResult {
  success: boolean;
  message?: string;
  error?: string;
  rfc?: string;
  sessionToken?: string;
}

export interface SatDownloadResult {
  success: boolean;
  downloadedCount?: number;
  error?: string;
}
