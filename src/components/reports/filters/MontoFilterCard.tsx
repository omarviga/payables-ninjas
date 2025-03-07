
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdvancedFilters } from "@/components/reports/InformesAdvancedFilters";

interface MontoFilterCardProps {
  montoMin?: number;
  montoMax?: number;
  onChange: (field: keyof AdvancedFilters, value: any) => void;
}

export function MontoFilterCard({ montoMin, montoMax, onChange }: MontoFilterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Monto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="montoMin">Mínimo</Label>
            <Input 
              id="montoMin" 
              type="number" 
              placeholder="0.00" 
              value={montoMin || ''} 
              onChange={(e) => onChange('montoMin', parseFloat(e.target.value) || undefined)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="montoMax">Máximo</Label>
            <Input 
              id="montoMax" 
              type="number" 
              placeholder="0.00" 
              value={montoMax || ''} 
              onChange={(e) => onChange('montoMax', parseFloat(e.target.value) || undefined)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
