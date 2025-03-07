
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  User, 
  CreditCard, 
  Lock, 
  Building, 
  FileStack,
  PanelLeft, 
  Shield, 
  Mail
} from 'lucide-react';

const Configuracion = () => {
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
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información personal y detalles de contacto.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Tu nombre" defaultValue="Carlos Martínez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input id="apellido" placeholder="Tu apellido" defaultValue="Rodríguez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" defaultValue="carlos@payablesninjas.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="Tu número de teléfono" defaultValue="(+52) 555 123 4567" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="w-full md:w-auto">Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo recibes notificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="notificaciones-email">Notificaciones por Email</Label>
                  </div>
                  <Switch id="notificaciones-email" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileStack className="h-4 w-4" />
                    <Label htmlFor="resumen-semanal">Resumen Semanal</Label>
                  </div>
                  <Switch id="resumen-semanal" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <Label htmlFor="alertas-pago">Alertas de Pagos</Label>
                  </div>
                  <Switch id="alertas-pago" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="empresa" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>
                Actualiza los datos fiscales y de contacto de tu empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Facturación</CardTitle>
              <CardDescription>
                Configura las opciones para la generación automática de facturas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileStack className="h-4 w-4" />
                    <Label htmlFor="facturacion-automatica">Facturación Automática</Label>
                  </div>
                  <Switch id="facturacion-automatica" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="envio-automatico">Envío Automático de Facturas</Label>
                  </div>
                  <Switch id="envio-automatico" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facturacion" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
              <CardDescription>
                Administra tus métodos de pago para servicios premium.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan de Suscripción</CardTitle>
              <CardDescription>
                Información sobre tu plan actual y opciones de actualización.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-secondary p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Plan Empresarial</h3>
                    <p className="text-sm text-muted-foreground">$299 MXN / mes</p>
                  </div>
                  <Button variant="secondary">Cambiar Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>
                Actualiza tu contraseña para mantener tu cuenta segura.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña Actual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button className="w-full md:w-auto">Actualizar Contraseña</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticación de Dos Factores</CardTitle>
              <CardDescription>
                Añade una capa adicional de seguridad a tu cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <Label htmlFor="2fa">Activar Autenticación de Dos Factores</Label>
                </div>
                <Switch id="2fa" />
              </div>
              <p className="text-sm text-muted-foreground">
                La autenticación de dos factores añade una capa adicional de seguridad a tu cuenta al requerir un código además de tu contraseña.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>
                Administra las sesiones donde tu cuenta está conectada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-border p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Windows 11 • Chrome</p>
                  <p className="text-sm text-muted-foreground">Ciudad de México • Activo ahora</p>
                </div>
                <p className="text-sm text-green-500 font-medium">Actual</p>
              </div>
              <div className="rounded-md border border-border p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">iPhone 14 • Safari</p>
                  <p className="text-sm text-muted-foreground">Ciudad de México • Hace 2 días</p>
                </div>
                <Button variant="outline" size="sm">Cerrar Sesión</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracion;
