
import React from 'react';
import { Button } from '@/components/ui/button';

interface SessionItemProps {
  device: string;
  location: string;
  status: string;
  isCurrentSession?: boolean;
  onLogout?: () => void;
}

export const SessionItem = ({ 
  device, 
  location, 
  status, 
  isCurrentSession = false,
  onLogout 
}: SessionItemProps) => {
  return (
    <div className="rounded-md border border-border p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{device}</p>
        <p className="text-sm text-muted-foreground">{location} • {status}</p>
      </div>
      {isCurrentSession ? (
        <p className="text-sm text-green-500 font-medium">Actual</p>
      ) : (
        <Button variant="outline" size="sm" onClick={onLogout}>
          Cerrar Sesión
        </Button>
      )}
    </div>
  );
};
