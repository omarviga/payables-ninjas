
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LucideIcon } from 'lucide-react';

interface SettingsToggleItemProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
  icon?: LucideIcon;
  onChange?: (checked: boolean) => void;
}

export const SettingsToggleItem = ({ 
  id, 
  label, 
  defaultChecked = false, 
  icon: Icon, 
  onChange 
}: SettingsToggleItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-4 w-4" />}
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Switch 
        id={id}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
      />
    </div>
  );
};
