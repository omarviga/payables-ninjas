
import { useState } from 'react';
import { useContacts } from './use-contacts';
import { useToast } from './use-toast';
import type { Contact } from '@/data/contacts';

export interface QATestResult {
  testName: string;
  passed: boolean;
  error?: string;
  details?: string;
}

export function useQATests() {
  const [results, setResults] = useState<QATestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const contactsHook = useContacts();
  const { toast } = useToast();

  // Helper function to record test results
  const recordResult = (testName: string, passed: boolean, error?: string, details?: string) => {
    const result: QATestResult = {
      testName,
      passed,
      error,
      details
    };
    setResults(prev => [...prev, result]);
    return result;
  };

  // Test contacts loading functionality
  const testContactsLoading = async () => {
    try {
      await contactsHook.loadContacts();
      const passed = Array.isArray(contactsHook.contacts) && contactsHook.contacts.length > 0;
      return recordResult(
        'Carga de contactos', 
        passed, 
        passed ? undefined : 'No se cargaron contactos',
        `${contactsHook.contacts.length} contactos cargados`
      );
    } catch (error) {
      return recordResult(
        'Carga de contactos', 
        false, 
        `Error al cargar contactos: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // Test contact filtering
  const testContactFiltering = () => {
    try {
      const result = contactsHook.applyFilters({ search: 'María', type: '', status: '' });
      const passed = result.success && result.filteredCount > 0;
      return recordResult(
        'Filtrado de contactos', 
        passed,
        passed ? undefined : 'El filtro no devolvió resultados',
        `Filtrado completado con ${result.filteredCount} resultados`
      );
    } catch (error) {
      return recordResult(
        'Filtrado de contactos', 
        false, 
        `Error al filtrar contactos: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // Test adding a new contact
  const testAddContact = () => {
    try {
      const newContact: Contact = {
        id: `test-${Date.now()}`,
        name: 'Usuario de Prueba',
        company: 'Empresa de Pruebas',
        email: 'test@example.com',
        phone: '555-TEST',
        type: 'client',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      const result = contactsHook.addContact(newContact);
      const passed = result.success;
      
      return recordResult(
        'Agregar contacto', 
        passed,
        passed ? undefined : 'No se pudo agregar el contacto',
        'Contacto agregado correctamente'
      );
    } catch (error) {
      return recordResult(
        'Agregar contacto', 
        false, 
        `Error al agregar contacto: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunning(true);
    setResults([]);
    
    try {
      // Run the tests in sequence
      await testContactsLoading();
      testContactFiltering();
      testAddContact();
      
      toast({
        title: "Pruebas completadas",
        description: "Todas las pruebas de QA han finalizado",
      });
    } catch (error) {
      toast({
        title: "Error en pruebas",
        description: `Ocurrió un error durante las pruebas: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  return {
    results,
    isRunning,
    runAllTests,
    testContactsLoading,
    testContactFiltering,
    testAddContact
  };
}
