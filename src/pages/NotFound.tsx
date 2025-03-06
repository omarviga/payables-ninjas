
import { Link } from "react-router-dom";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="bg-payables-100 p-4 rounded-full inline-flex mb-6">
          <FileSearch className="h-12 w-12 text-payables-700" />
        </div>
        <h1 className="text-4xl font-bold mb-4 font-heading text-payables-900">Página no encontrada</h1>
        <p className="text-lg text-muted-foreground mb-8">
          La página que estás buscando no existe o ha sido movida a otra ubicación.
        </p>
        <Button asChild size="lg" className="bg-payables-600 hover:bg-payables-700">
          <Link to="/">Volver al Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
