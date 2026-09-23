import { useState } from "react";
import "./App.css";
import Encabezado from "./components/Encabezado";
import FormularioTarea from "./components/FormularioTarea";
import ListaTareas from "./components/ListaTareas";
import ResumenTareas from "./components/ResumenTareas";

const iniciales = [
  { id: "t1", titulo: "Revisar estructura del proyecto", completada: true },
  { id: "t2", titulo: "Practicar componentes de React", completada: false },
  { id: "t3", titulo: "Preparar conexión con la API", completada: false },
];
const clave = "mern-tareas-v1";
function cargar() {
  try {
    const datos = JSON.parse(localStorage.getItem(clave));
    if (Array.isArray(datos) && datos.every(t => t && typeof t.id === "string" && typeof t.titulo === "string" && typeof t.completada === "boolean")) return datos;
  } catch { /* Se puede trabajar aunque el almacenamiento esté bloqueado. */ }
  return iniciales;
}
export default function App() {
  const [tareas, setTareas] = useState(cargar);
  const [minutosPorTarea, setMinutosPorTarea] = useState(25);
  const [filtro, setFiltro] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [eliminada, setEliminada] = useState(null);
  const [sinGuardado, setSinGuardado] = useState(false);
  function actualizar(cambio) {
    const siguientes = cambio(tareas);
    setTareas(siguientes);
    try { localStorage.setItem(clave, JSON.stringify(siguientes)); setSinGuardado(false); }
    catch { setSinGuardado(true); }
  }
  function agregar(titulo) {
    actualizar(actuales => [...actuales, { id: crypto.randomUUID(), titulo, completada: false }]);
    setFiltro("Todas"); setBusqueda(""); setMensaje("Tarea agregada correctamente.");
  }
  function alternar(id) {
    actualizar(actuales => actuales.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
    setMensaje("Estado de la tarea actualizado.");
  }
  function eliminar(id) {
    setEliminada({ tarea: tareas.find(t => t.id === id), posicion: tareas.findIndex(t => t.id === id) });
    actualizar(actuales => actuales.filter(t => t.id !== id)); setMensaje("Tarea eliminada.");
  }
  function deshacer() {
    actualizar(actuales => { const copia = [...actuales]; copia.splice(eliminada.posicion, 0, eliminada.tarea); return copia; });
    setEliminada(null); setMensaje("Tarea restaurada.");
  }
  const completadas = tareas.filter(t => t.completada).length;
  // Cinco variables mostradas directamente en el JSX mediante llaves.
  const nombreUsuario = "Estudiante";
  const nombreProyecto = "Mi práctica de React";
  const totalTareas = tareas.length;
  const tareasCompletadas = completadas;
  // La quinta variable es minutosPorTarea, declarada con useState arriba.
  const visibles = tareas.filter(t => (filtro === "Todas" || (filtro === "Completadas" ? t.completada : !t.completada)) && t.titulo.toLocaleLowerCase().includes(busqueda.trim().toLocaleLowerCase()));
  return <main>
    <nav className="marca" aria-label="Identidad de la aplicación"><span className="marca-icono">✓</span> enfoque<span className="marca-detalle">TU ESPACIO DE TRABAJO</span></nav>
    <Encabezado titulo="Un paso más cerca." subtitulo="Organiza tus pendientes, celebra tus avances y enfócate en lo que sigue." />
    <ResumenTareas total={tareas.length} completadas={completadas} />
    <section className="panel actividad-jsx" aria-labelledby="titulo-actividad">
      <span className="eyebrow">ACTIVIDAD · EXPRESIONES JSX</span>
      <h2 id="titulo-actividad">Cinco variables, tres cálculos</h2>
      <p className="descripcion-actividad">Los valores entre llaves se evalúan en JavaScript y se muestran en la interfaz.</p>
      <h3>1. Variables dinámicas</h3>
      <dl className="variables-jsx">
        <div><dt>Usuario <code>{"{nombreUsuario}"}</code></dt><dd>{nombreUsuario}</dd></div>
        <div><dt>Proyecto <code>{"{nombreProyecto}"}</code></dt><dd>{nombreProyecto}</dd></div>
        <div><dt>Total de tareas <code>{"{totalTareas}"}</code></dt><dd>{totalTareas}</dd></div>
        <div><dt>Tareas completadas <code>{"{tareasCompletadas}"}</code></dt><dd>{tareasCompletadas}</dd></div>
        <div><dt>Minutos por tarea <code>{"{minutosPorTarea}"}</code></dt><dd>{minutosPorTarea}</dd></div>
      </dl>
      <label className="ajuste-tiempo" htmlFor="minutos">Cambia la duración de cada tarea
        <input id="minutos" type="range" min="5" max="60" step="5" value={minutosPorTarea} onChange={e => setMinutosPorTarea(Number(e.target.value))} />
        <span>{minutosPorTarea} minutos</span>
      </label>
      <h3>2. Cálculos embebidos en JSX</h3>
      <div className="calculos-jsx" aria-live="polite">
        <article><h4>Tareas pendientes</h4><code>{"{totalTareas - tareasCompletadas}"}</code><output aria-label="Resultado de tareas pendientes">{totalTareas - tareasCompletadas}</output><small>Resta del total menos las completadas</small></article>
        <article><h4>Tiempo pendiente</h4><code>{"{(totalTareas - tareasCompletadas) * minutosPorTarea}"}</code><output aria-label="Resultado de tiempo pendiente">{(totalTareas - tareasCompletadas) * minutosPorTarea} min</output><small>Multiplicación por la duración estimada</small></article>
        <article><h4>Porcentaje de avance</h4><code>{"{totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0}"}</code><output aria-label="Resultado de porcentaje de avance">{totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0}%</output><small>División y multiplicación; evita dividir entre cero</small></article>
      </div>
      <p className="nota-actividad">Agrega o completa tareas en la tabla para actualizar los resultados automáticamente.</p>
    </section>
    <section className="panel" aria-labelledby="titulo-tareas">
      <div className="titulo-panel"><div><span className="eyebrow">ORGANIZA TU DÍA</span><h2 id="titulo-tareas">Mis tareas</h2></div><span className="contador">{tareas.length} en total</span></div>
      <FormularioTarea onAgregarTarea={agregar} />
      <div className="herramientas"><div className="filtros" role="group" aria-label="Filtrar por estado">{["Todas", "Pendientes", "Completadas"].map(f => <button key={f} aria-pressed={filtro === f} onClick={() => setFiltro(f)}>{f}</button>)}</div><label className="buscar"><span className="sr-only">Buscar tareas</span><input type="search" placeholder="Buscar una tarea…" value={busqueda} onChange={e => setBusqueda(e.target.value)} /></label></div>
      <ListaTareas tareas={visibles} onAlternar={alternar} onEliminar={eliminar} />
      <div className="pie-tabla"><span>{visibles.length} de {tareas.length} tareas</span><span>Pequeños pasos, grandes resultados.</span></div>
    </section>
    <div className="notificacion" role="status">{mensaje}{eliminada && <button onClick={deshacer}>Deshacer eliminación</button>}</div>
    <footer><span>Hecho para avanzar, a tu ritmo.</span><span>{sinGuardado ? "No se pueden guardar los cambios en este navegador." : "● Guardado en este navegador"}</span></footer>
  </main>;
}
