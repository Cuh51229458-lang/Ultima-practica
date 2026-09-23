# Enfoque · Gestor de tareas en React

Caso de uso: una persona organiza sus pendientes, registra tareas, marca avances y consulta su progreso desde computadora o teléfono.

## Ejecutar

```bash
cd mern-inicio/client
npm install
npm run dev
```

Abre la URL indicada por Vite. Para esta interfaz no es necesario iniciar el backend: las tareas se guardan en `localStorage` del navegador, sin sincronización con MongoDB. El servidor Express existente permanece independiente.

## Funcionalidades

- Tabla semántica con títulos, estados y acciones; corrección del campo `nombre` por `titulo`.
- Alta con validación de texto y límite de 160 caracteres.
- Completar o reabrir tareas, eliminar y deshacer la última eliminación.
- Filtros por estado, búsqueda y mensaje sin resultados.
- Contadores y barra de progreso reactivos al estado de React.
- Persistencia local y aviso si el navegador impide guardar.
- CSS adaptable a móvil, animaciones de entrada y transiciones en controles y progreso.
- Respeto por `prefers-reduced-motion`, foco visible, etiquetas accesibles y avisos `role="status"`.

## Verificación

```bash
cd mern-inicio/client
npm run lint
npm run build
```

Ambos comandos completados correctamente. Pruebas realizadas en Chrome: alta, validación, cambio de estado, filtros, búsqueda sin resultados, persistencia al recargar, eliminación, deshacer, ausencia de errores JavaScript y ausencia de desbordamiento horizontal a 390 px. También se comprobó que movimiento reducido desactiva las animaciones.


Esta entrega no incluye imágenes ni capturas de pantalla. El encabezado usa decoración CSS.
