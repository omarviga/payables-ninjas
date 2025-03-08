
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from '@/hooks/use-toast';

interface PersonalInfoFormProps {
  initialData: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
  };
  onSave?: (data: PersonalInfoFormProps['initialData']) => Promise<void>;
}

export const PersonalInfoForm = ({ initialData, onSave }: PersonalInfoFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.includes('@')) {
      toast({
        title: "Error",
        description: "El correo electrónico no es válido.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      if (onSave) {
        await onSave(formData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      toast({
        title: "Cambios guardados",
        description: "Tu información personal ha sido actualizada correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input 
            id="nombre" 
            placeholder="Tu nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input 
            id="apellido" 
            placeholder="Tu apellido" 
            value={formData.apellido} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="tu@email.com" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input 
            id="telefono" 
            placeholder="Tu número de teléfono" 
            value={formData.telefono} 
            onChange={handleChange} 
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="w-full md:w-auto" disabled={isSaving}>
          {isSaving && <Spinner className="mr-2 h-4 w-4" />}
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
};
