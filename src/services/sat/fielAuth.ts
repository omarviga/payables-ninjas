
import { supabase } from '../supabase/client';
import { SatAuthResult } from './types';

/**
 * Autentica al usuario utilizando los archivos FIEL (e.firma)
 */
export const authenticateWithFiel = async (
  keyFile: File, 
  cerFile: File, 
  password: string
): Promise<SatAuthResult> => {
  try {
    console.log("Autenticando con FIEL:", { 
      keyFile: keyFile.name, 
      cerFile: cerFile.name, 
      passwordLength: password.length 
    });
    
    // Obtener el usuario actual
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    
    if (!userId) {
      console.log("Usuario no autenticado, modo demo");
      
      // Simulación para modo demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extraer RFC del nombre del archivo (simulado)
      const fileName = cerFile.name.toUpperCase();
      let rfc = "XAXX010101000"; // RFC por defecto para simulación
      
      // Intenta extraer un RFC del nombre del archivo (para simulación)
      const rfcMatch = fileName.match(/([A-Z]{3,4}\d{6}[A-Z0-9]{3})/);
      if (rfcMatch && rfcMatch[1]) {
        rfc = rfcMatch[1];
      }
      
      return {
        success: true,
        rfc,
        sessionToken: `FIEL_TOKEN_${Date.now()}`,
        message: "Autenticación con e.firma exitosa (modo demo)"
      };
    }
    
    // En un escenario real, aquí subiríamos los archivos a Supabase Storage
    const timestamp = Date.now();
    const keyPath = `fiel/${userId}/${timestamp}_${keyFile.name}`;
    const cerPath = `fiel/${userId}/${timestamp}_${cerFile.name}`;
    
    // Subir archivo .key
    const { error: keyError } = await supabase.storage
      .from('sat_certificados')
      .upload(keyPath, keyFile, {
        cacheControl: '0',
        upsert: false
      });
      
    if (keyError) {
      console.error("Error al subir archivo .key:", keyError);
      return {
        success: false,
        error: "No se pudo subir el archivo .key"
      };
    }
    
    // Subir archivo .cer
    const { error: cerError } = await supabase.storage
      .from('sat_certificados')
      .upload(cerPath, cerFile, {
        cacheControl: '0',
        upsert: false
      });
      
    if (cerError) {
      console.error("Error al subir archivo .cer:", cerError);
      // Si falló la subida del .cer, eliminar el .key
      await supabase.storage
        .from('sat_certificados')
        .remove([keyPath]);
        
      return {
        success: false,
        error: "No se pudo subir el archivo .cer"
      };
    }
    
    // Almacenar referencia a los archivos en la tabla sat_credentials
    const { error: dbError } = await supabase
      .from('sat_credentials')
      .insert({
        user_id: userId,
        key_path: keyPath,
        cer_path: cerPath,
        password_hash: "**SECURE**", // En un caso real, habría que cifrar esta contraseña
        active: true
      });
      
    if (dbError) {
      console.error("Error al guardar credenciales en base de datos:", dbError);
      // Limpiar archivos subidos si falla el guardado en DB
      await supabase.storage
        .from('sat_certificados')
        .remove([keyPath, cerPath]);
        
      return {
        success: false,
        error: "No se pudieron guardar las credenciales"
      };
    }
    
    // En un caso real, el backend verificaría los certificados y devolvería el RFC extraído
    // Para esta demo, simulamos un RFC extrayéndolo del nombre del archivo
    const fileName = cerFile.name.toUpperCase();
    let rfc = "XAXX010101000"; // RFC por defecto
    
    const rfcMatch = fileName.match(/([A-Z]{3,4}\d{6}[A-Z0-9]{3})/);
    if (rfcMatch && rfcMatch[1]) {
      rfc = rfcMatch[1];
    }
    
    // Guardar datos de sesión en localStorage para su uso posterior
    const sessionToken = `FIEL_TOKEN_${Date.now()}`;
    localStorage.setItem('satCredentials', JSON.stringify({
      sessionToken,
      rfc,
      timestamp: Date.now()
    }));
    
    return {
      success: true,
      rfc,
      sessionToken,
      message: "Autenticación con e.firma exitosa"
    };
  } catch (error) {
    console.error("Error en autenticación FIEL:", error);
    return {
      success: false,
      error: "No se pudo procesar los archivos FIEL"
    };
  }
};
