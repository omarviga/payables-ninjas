

import { 
  BarChart3, 
  FileText, 
  ArrowDownUp, 
  CreditCard, 
  BarChart, 
  Users, 
  Settings,
  HelpCircle,
  FileUp
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';

// Definición de los elementos del menú
const menuItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    path: '/'
  },
  {
    title: 'Facturas',
    icon: FileText,
    path: '/facturas'
  },
  {
    title: 'Cargar Facturas',
    icon: FileUp,
    path: '/cargar-facturas'
  },
  {
    title: 'Pagos y Cobros',
    icon: ArrowDownUp,
    path: '/pagos'
  },
  {
    title: 'Conciliación',
    icon: CreditCard,
    path: '/conciliacion'
  },
  {
    title: 'Informes',
    icon: BarChart,
    path: '/informes'
  },
  {
    title: 'Contactos',
    icon: Users,
    path: '/contactos'
  }
];

// Elementos del menú administrativo
const adminMenuItems = [
  {
    title: 'Configuración',
    icon: Settings,
    path: '/configuracion'
  },
  {
    title: 'Ayuda',
    icon: HelpCircle,
    path: '/ayuda'
  }
];

export function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-payables-600 grid place-items-center">
              <span className="text-white font-bold">PN</span>
            </span>
            <span className="font-heading font-bold text-xl text-payables-900 dark:text-white">Payables<span className="text-payables-600">Ninjas</span></span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="absolute bottom-4 left-0 right-0">
        <div className="mx-3 p-3 rounded-lg bg-payables-800 bg-opacity-10 text-sm">
          <div className="font-medium text-payables-800 dark:text-white mb-1">¿Necesitas ayuda?</div>
          <div className="text-xs text-payables-700 dark:text-gray-300">Contacta con soporte para resolver cualquier duda.</div>
          <button className="mt-2 w-full py-1.5 rounded-md bg-payables-600 text-white text-xs font-medium hover:bg-payables-700 transition-colors">
            Contactar
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
