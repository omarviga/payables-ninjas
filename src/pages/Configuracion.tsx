
import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building, CreditCard, Lock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { SettingsCard } from '@/components/settings/SettingsCard';
import { PersonalInfoForm } from '@/components/settings/PersonalInfoForm';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { SessionItem } from '@/components/settings/SessionItem';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SettingsToggleItem } from '@/components/settings/SettingsToggleItem';

const Configuracion = () => {
  const { toast } = useToast();
  const [activeSessions, setActiveSessions] = useState([
    { id: '1', device: "Windows 11 • Chrome", location: "Ciudad de México", status: "Activo ahora", isCurrentSession: true },
    { id: '2', device: "iPhone 14 • Safari", location: "Ciudad de México", status: "Hace 2 días", isCurrentSession: false },
  ]);

  const handleLogoutSession = useCallback((sessionId: string) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
    toast({
      title: "Sesión cerrada",
      description: "La sesión ha sido cerrada exitosamente.",
    });
  }, [toast]);

  const handleSavePersonalInfo = useCallback(async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Saving personal info:", data);
  }, []);

  const handlePasswordChange = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido actualizada exitosamente.",
    });
  }, [toast]);

  const handle2FAToggle = useCallback((checked: boolean) => {
    toast({
      title: checked ? "2FA Activado" : "2FA Desactivado",
      description: checked 
        ? "La autenticación de dos factores ha sido activada correctamente." 
        : "La autenticación de dos factores ha sido desactivada.",
    });
  }, [toast]);

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administra la configuración de tu cuenta y preferencias del sistema.
        </p>
      </div>

      <Tabs defaultValue="cuenta" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-2 h-auto">
          <TabsTrigger value="cuenta" className="flex items-center gap-2 py-2">
            <User className="h-4 w-4" />
            <span>Cuenta</span>
          </TabsTrigger>
          <TabsTrigger value="empresa" className="flex items-center gap-2 py-2">
            <Building className="h-4 w-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="facturacion" className="flex items-center gap-2 py-2">
            <CreditCard className="h-4 w-4" />
            <span>Facturación</span>
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="flex items-center gap-2 py-2">
            <Lock className="h-4 w-4" />
            <span>Seguridad</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cuenta" className="space-y-4 mt-4">
          <SettingsCard 
            title="Información Personal"
            description="Actualiza tu información personal y detalles de contacto."
          >
            <PersonalInfoForm 
              initialData={{
                nombre: "Carlos Martínez",
                apellido: "Rodríguez",
                email: "carlos@payablesninjas.com",
                telefono: "(+52) 555 123 4567"
              }}
              onSave={handleSavePersonalInfo}
            />
          </SettingsCard>

          <SettingsCard 
            title="Preferencias de Notificaciones"
            description="Configura cómo y cuándo recibes notificaciones."
          >
            <NotificationSettings />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="empresa" className="space-y-4 mt-4">
          <SettingsCard 
            title="Información de la Empresa"
            description="Actualiza los datos fiscales y de contacto de tu empresa."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="razon-social">Razón Social</Label>
                <Input id="razon-social" placeholder="Razón social" defaultValue="Payables Ninjas S.A. de C.V." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rfc">RFC</Label>
                <Input id="rfc" placeholder="RFC" defaultValue="PNI230517HT5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección Fiscal</Label>
                <Input id="direccion" placeholder="Dirección" defaultValue="Av. Reforma 123, CDMX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo-postal">Código Postal</Label>
                <Input id="codigo-postal" placeholder="CP" defaultValue="06500" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="w-full md:w-auto">Guardar Cambios</Button>
            </div>
          </SettingsCard>

          <SettingsCard 
            title="Configuración de Facturación"
            description="Configura las opciones para la generación automática de facturas."
          >
            <div className="space-y-4">
              <SettingsToggleItem 
                id="facturacion-automatica" 
                label="Facturación Automática" 
              />
              <SettingsToggleItem 
                id="envio-automatico" 
                label="Envío Automático de Facturas" 
                defaultChecked={true}
              />
            </div>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="facturacion" className="space-y-4 mt-4">
          <SettingsCard 
            title="Métodos de Pago"
            description="Administra tus métodos de pago para servicios premium."
          >
            <div className="rounded-md border border-border p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <CreditCard className="h-6 w-6" />
                <div>
                  <p className="font-medium">Visa terminada en 4242</p>
                  <p className="text-sm text-muted-foreground">Expira: 12/25</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Editar</Button>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="w-full md:w-auto">
                Agregar Método de Pago
              </Button>
            </div>
          </SettingsCard>

          <SettingsCard 
            title="Plan de Suscripción"
            description="Información sobre tu plan actual y opciones de actualización."
          >
            <div className="rounded-md bg-secondary p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Plan Empresarial</h3>
                  <p className="text-sm text-muted-foreground">$299 MXN / mes</p>
                </div>
                <Button variant="secondary">Cambiar Plan</Button>
              </div>
            </div>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4 mt-4">
          <SettingsCard 
            title="Cambiar Contraseña"
            description="Actualiza tu contraseña para mantener tu cuenta segura."
          >
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="w-full md:w-auto">Actualizar Contraseña</Button>
              </div>
            </form>
          </SettingsCard>

          <SettingsCard 
            title="Autenticación de Dos Factores"
            description="Añade una capa adicional de seguridad a tu cuenta."
          >
            <div className="space-y-4">
              <SettingsToggleItem 
                id="2fa" 
                label="Activar Autenticación de Dos Factores" 
                icon={Shield}
                onChange={handle2FAToggle}
              />
              <p className="text-sm text-muted-foreground">
                La autenticación de dos factores añade una capa adicional de seguridad a tu cuenta al requerir un código además de tu contraseña.
              </p>
            </div>
          </SettingsCard>

          <SettingsCard 
            title="Sesiones Activas"
            description="Administra las sesiones donde tu cuenta está conectada."
          >
            <div className="space-y-4">
              {activeSessions.map(session => (
                <SessionItem 
                  key={session.id}
                  device={session.device}
                  location={session.location}
                  status={session.status}
                  isCurrentSession={session.isCurrentSession}
                  onLogout={session.isCurrentSession ? undefined : () => handleLogoutSession(session.id)}
                />
              ))}
            </div>
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracion;
