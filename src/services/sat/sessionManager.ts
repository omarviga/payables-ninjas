
import { supabase } from '../supabase/client';

/**
 * Verifica el estado de una sesión SAT
 */
export const checkSessionStatus = async (sessionToken: string): Promise<boolean> => {
  try {
    // Verificar si hay un usuario autenticado
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      // En modo demo, usar la lógica simple de verificación por tiempo
      return sessionToken.includes('FIEL_TOKEN_') && 
             Date.now() - parseInt(sessionToken.split('FIEL_TOKEN_')[1]) < 24 * 60 * 60 * 1000;
    }
    
    // En un caso real, verificaríamos con la tabla sat_credentials
    const { data, error } = await supabase
      .from('sat_credentials')
      .select('active, created_at')
      .eq('user_id', userData.user.id)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1);
      
    if (error || !data || data.length === 0) {
      console.error("Error al verificar credenciales SAT:", error);
      return false;
    }
    
    // Verificar que la credencial esté activa
    return data[0].active === true;
  } catch (error) {
    console.error("Error al verificar estado de sesión SAT:", error);
    return false;
  }
};
