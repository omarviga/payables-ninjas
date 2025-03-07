
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

// Función para subir archivos XML a Supabase Storage
export const uploadXmlToStorage = async (file: File, userId?: string): Promise<string | null> => {
  try {
    // Verificar si el usuario está autenticado o si estamos en modo demo
    if (!userId) {
      console.log('Usuario no autenticado, modo demo: no se guardará el archivo físicamente');
      return `demo-storage/${file.name}`;
    }
    
    // Crear un path único para el archivo
    const timestamp = Date.now();
    const filePath = `cfdi/${userId}/${timestamp}_${file.name}`;
    
    // Subir el archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from('facturas')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error al subir XML a Supabase Storage:', error);
      return null;
    }
    
    console.log('XML subido exitosamente a Supabase Storage:', data.path);
    return data.path;
  } catch (error) {
    console.error('Error inesperado al subir XML:', error);
    return null;
  }
};

// Función para obtener la URL pública de un archivo en Storage
export const getPublicUrl = (path: string): string | null => {
  if (!path) return null;
  
  if (path.startsWith('demo-storage/')) {
    // En modo demo, devolvemos una URL ficticia
    return `https://demo.storage.supabase.co/${path}`;
  }
  
  const { data } = supabase.storage
    .from('facturas')
    .getPublicUrl(path);
  
  return data?.publicUrl || null;
};
