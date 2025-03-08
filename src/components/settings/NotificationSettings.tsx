
import React, { useState } from 'react';
import { SettingsToggleItem } from './SettingsToggleItem';
import { Separator } from '@/components/ui/separator';
import { Bell, FileStack, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    weeklyReport: true,
    paymentAlerts: true
  });

  const handleToggleChange = (setting: keyof typeof settings, checked: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: checked }));
    
    const settingLabels = {
      emailNotifications: "Notificaciones por Email",
      weeklyReport: "Resumen Semanal",
      paymentAlerts: "Alertas de Pagos"
    };
    
    toast({
      title: `${checked ? 'Activado' : 'Desactivado'}`,
      description: `${settingLabels[setting]} ${checked ? 'activado' : 'desactivado'} correctamente.`,
    });
  };

  return (
    <div className="space-y-4">
      <SettingsToggleItem 
        id="notificaciones-email" 
        label="Notificaciones por Email" 
        icon={Bell}
        defaultChecked={settings.emailNotifications}
        onChange={(checked) => handleToggleChange('emailNotifications', checked)}
      />
      <Separator />
      <SettingsToggleItem 
        id="resumen-semanal" 
        label="Resumen Semanal" 
        icon={FileStack}
        defaultChecked={settings.weeklyReport}
        onChange={(checked) => handleToggleChange('weeklyReport', checked)}
      />
      <Separator />
      <SettingsToggleItem 
        id="alertas-pago" 
        label="Alertas de Pagos" 
        icon={CreditCard}
        defaultChecked={settings.paymentAlerts}
        onChange={(checked) => handleToggleChange('paymentAlerts', checked)}
      />
    </div>
  );
};
