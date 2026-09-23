# Actividad: cinco variables y tres cálculos en JSX

Repositorio: https://github.com/Cuh51229458-lang/Ultima-practica

Implementación: [App.jsx](../../mern-inicio/client/src/App.jsx).

## Objetivo

Mostrar cinco variables y ejecutar tres operaciones dentro de las etiquetas JSX mediante llaves `{}`. JSX permite combinar el marcado de la interfaz con expresiones JavaScript.

## Cinco variables

- `{nombreUsuario}`: Estudiante.
- `{nombreProyecto}`: Mi práctica de React.
- `{totalTareas}`: cantidad actual de tareas.
- `{tareasCompletadas}`: cantidad de tareas completadas.
- `{minutosPorTarea}`: duración estimada, modificable con el deslizador.

## Tres cálculos ejecutados directamente en JSX

```jsx
{totalTareas - tareasCompletadas}
{(totalTareas - tareasCompletadas) * minutosPorTarea}
{totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0}
```

Con 3 tareas, 1 completada y 25 minutos: 2 pendientes, 50 minutos y 33% de avance. Al completar otra tarea y elegir 40 minutos: 1 pendiente, 40 minutos y 67%. Sin tareas los tres resultados son cero.

## Verificación

Compilación de producción y ESLint correctos. Pruebas en Chrome de los valores iniciales, actualización reactiva, cero tareas y pantalla móvil de 390 px sin desbordamiento horizontal. Sin errores JavaScript durante las pruebas.
