
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AdvancedFilters } from "@/components/reports/InformesAdvancedFilters";

interface OptionsFilterCardProps {
  incluirCanceladas: boolean;
  incluirBorradores: boolean;
  onChange: (field: keyof AdvancedFilters, value: any) => void;
}

export function OptionsFilterCard({ 
  incluirCanceladas, 
  incluirBorradores, 
  onChange 
}: OptionsFilterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Opciones Adicionales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluirCanceladas" 
            checked={incluirCanceladas}
            onCheckedChange={(checked) => onChange('incluirCanceladas', checked === true)}
          />
          <Label htmlFor="incluirCanceladas">Incluir facturas canceladas</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluirBorradores" 
            checked={incluirBorradores}
            onCheckedChange={(checked) => onChange('incluirBorradores', checked === true)}
          />
          <Label htmlFor="incluirBorradores">Incluir borradores</Label>
        </div>
      </CardContent>
    </Card>
  );
}
