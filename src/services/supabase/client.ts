
import { createClient } from '@supabase/supabase-js';

// URL y clave por defecto para modo de demostración/desarrollo
const DEFAULT_SUPABASE_URL = 'https://demo.supabasehost.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTl9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Usar variables de entorno o valores por defecto para desarrollo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || DEFAULT_SUPABASE_KEY;

// Asegurarnos de tener valores para ambos parámetros
if (!supabaseUrl || !supabaseKey) {
  console.error('No se encontraron valores válidos para Supabase URL o Key. Usando valores por defecto.');
}

console.log('Inicializando cliente Supabase con URL:', supabaseUrl);

export const supabase = createClient(
  supabaseUrl || DEFAULT_SUPABASE_URL,
  supabaseKey || DEFAULT_SUPABASE_KEY
);
