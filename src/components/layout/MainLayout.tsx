
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Toaster } from '@/components/ui/toaster';
import { MainHeader } from './MainHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <MainHeader />
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
          <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
            <p>© {new Date().getFullYear()} Payables Ninjas - Gestión de Cuentas por Pagar y Cobrar</p>
          </footer>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default MainLayout;
