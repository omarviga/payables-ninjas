
# Sistema de Gestión Empresarial

## Descripción

Este sistema ofrece una solución integral para la gestión empresarial, permitiendo administrar contactos, facturas, pagos y generar informes financieros. La aplicación incluye un dashboard interactivo y herramientas de pruebas de QA integradas.

## Características principales

- **Dashboard financiero**: Visualización de métricas clave, gráficos de flujo financiero y actividades recientes
- **Gestión de contactos**: Clientes, proveedores y empleados
- **Facturación**: Carga, procesamiento y seguimiento de facturas
- **Pagos**: Registro y monitoreo de pagos entrantes y salientes
- **Conciliación bancaria**: Herramientas para conciliar transacciones
- **Informes financieros**: Reportes detallados y visualizaciones por categorías
- **Pruebas de QA integradas**: Sistema de verificación de funcionalidades

## Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Navegar al directorio del proyecto
cd <NOMBRE_DEL_PROYECTO>

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## Estructura del proyecto

La aplicación está organizada en módulos funcionales:

- `/src/components`: Componentes reutilizables organizados por área funcional
- `/src/pages`: Páginas principales de la aplicación
- `/src/hooks`: Hooks personalizados para lógica de negocio
- `/src/data`: Modelos de datos y datos de ejemplo
- `/src/utils`: Utilidades y funciones auxiliares
- `/src/services`: Servicios para operaciones externas

## Pruebas de QA

El sistema incluye un módulo de pruebas de QA integrado que permite verificar el funcionamiento de funcionalidades clave:

1. Navegue al Dashboard principal
2. Localice el panel "Pruebas de QA" en la parte inferior
3. Haga clic en "Ejecutar Pruebas" para iniciar la verificación
4. Los resultados se mostrarán en tiempo real, indicando:
   - Carga de contactos
   - Filtrado de contactos
   - Agregar contactos

## Tecnologías utilizadas

- React + TypeScript
- Vite para desarrollo rápido
- Tailwind CSS para estilos
- shadcn/ui para componentes de interfaz
- Recharts para visualizaciones de datos
- React Query para gestión de estado y peticiones

## Desarrollo

Para añadir nuevas funcionalidades o modificar las existentes:

1. Cree componentes en archivos separados y enfocados
2. Utilice los hooks existentes para lógica de negocio reutilizable
3. Siga las convenciones de TypeScript para mantener un código tipado
4. Implemente pruebas para las nuevas funcionalidades

## Despliegue

Para desplegar la aplicación:

1. Genere la build de producción:
   ```bash
   npm run build
   ```

2. Los archivos generados estarán en el directorio `/dist`

3. Despliegue estos archivos en su servidor web o plataforma de hosting preferida

## Licencia

[MIT](LICENSE)
