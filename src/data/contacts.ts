
export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: 'client' | 'supplier' | 'employee' | 'other';
  status: 'active' | 'inactive';
  notes?: string;
  createdAt: string;
}

export const contacts: Contact[] = [
  {
    id: "cont-001",
    name: "María López",
    company: "Soluciones Digitales SL",
    email: "maria@solucionesdigitales.com",
    phone: "+34 612 345 678",
    type: "client",
    status: "active",
    notes: "Cliente principal, facturación mensual",
    createdAt: "2023-01-15T09:30:00.000Z"
  },
  {
    id: "cont-002",
    name: "Carlos Rodríguez",
    company: "Distribuciones Rápidas",
    email: "carlos@distribuciones.com",
    phone: "+34 623 456 789",
    type: "supplier",
    status: "active",
    createdAt: "2023-02-22T14:15:00.000Z"
  },
  {
    id: "cont-003",
    name: "Elena Martín",
    company: "Consultoría Financiera",
    email: "elena@consultoria.com",
    phone: "+34 634 567 890",
    type: "client",
    status: "active",
    notes: "Facturación trimestral",
    createdAt: "2023-03-10T11:45:00.000Z"
  },
  {
    id: "cont-004",
    name: "Javier García",
    company: "Tecnología Avanzada",
    email: "javier@tecnoavanzada.com",
    phone: "+34 645 678 901",
    type: "client",
    status: "inactive",
    createdAt: "2023-01-30T16:20:00.000Z"
  },
  {
    id: "cont-005",
    name: "Laura Sánchez",
    company: "Materiales Construcción",
    email: "laura@materiales.com",
    phone: "+34 656 789 012",
    type: "supplier",
    status: "active",
    createdAt: "2023-02-05T10:10:00.000Z"
  },
  {
    id: "cont-006",
    name: "Antonio Pérez",
    company: "Transportes Rápidos",
    email: "antonio@transportes.com",
    phone: "+34 667 890 123",
    type: "supplier",
    status: "active",
    notes: "Proveedor principal de logística",
    createdAt: "2023-03-20T09:00:00.000Z"
  },
  {
    id: "cont-007",
    name: "Carmen Ruiz",
    company: "Diseño Gráfico",
    email: "carmen@diseno.com",
    phone: "+34 678 901 234",
    type: "client",
    status: "active",
    createdAt: "2023-04-05T13:30:00.000Z"
  },
  {
    id: "cont-008",
    name: "Miguel Torres",
    company: "Servicios Web",
    email: "miguel@serviciosweb.com",
    phone: "+34 689 012 345",
    type: "client",
    status: "active",
    notes: "Proyecto en desarrollo",
    createdAt: "2023-03-15T15:45:00.000Z"
  },
  {
    id: "cont-009",
    name: "Ana Fernández",
    company: "PayablesNinjas",
    email: "ana@payablesninjas.com",
    phone: "+34 690 123 456",
    type: "employee",
    status: "active",
    createdAt: "2022-11-10T08:00:00.000Z"
  },
  {
    id: "cont-010",
    name: "Pablo Moreno",
    company: "Marketing Digital",
    email: "pablo@marketing.com",
    phone: "+34 601 234 567",
    type: "client",
    status: "inactive",
    createdAt: "2023-01-20T14:00:00.000Z"
  }
];
