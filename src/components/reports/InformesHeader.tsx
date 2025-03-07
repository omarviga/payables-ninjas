
import { InformesActions } from './InformesActions';

export function InformesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-heading">Informes</h1>
        <p className="text-muted-foreground mt-1">
          Visualiza y analiza datos financieros de tu empresa
        </p>
      </div>
      <InformesActions />
    </div>
  );
}
