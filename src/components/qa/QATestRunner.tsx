
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQATests } from "@/hooks/use-qa-tests";
import { CheckCircle, XCircle, Play } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

export function QATestRunner() {
  const { results, isRunning, runAllTests } = useQATests();

  useEffect(() => {
    console.log("QATestRunner rendered, results:", results, "isRunning:", isRunning);
  }, [results, isRunning]);

  const handleRunTests = async () => {
    console.log("⏱️ Iniciando pruebas...");
    await runAllTests();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Pruebas de QA</span>
          <Button 
            onClick={handleRunTests} 
            disabled={isRunning}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isRunning ? <Spinner size="sm" /> : <Play className="h-4 w-4" />}
            <span>{isRunning ? 'Ejecutando...' : 'Ejecutar Pruebas'}</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {results.length === 0 && !isRunning ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay resultados de pruebas disponibles.</p>
            <p className="text-sm">Haz clic en "Ejecutar Pruebas" para comenzar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{result.testName}</h3>
                  {result.passed ? (
                    <div className="flex items-center text-success">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span>Exitoso</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-destructive">
                      <XCircle className="h-5 w-5 mr-1" />
                      <span>Fallido</span>
                    </div>
                  )}
                </div>
                {result.error && (
                  <div className="bg-destructive/10 text-destructive p-2 rounded text-sm mt-2">
                    {result.error}
                  </div>
                )}
                {result.details && (
                  <div className="text-sm text-muted-foreground mt-2">
                    {result.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
