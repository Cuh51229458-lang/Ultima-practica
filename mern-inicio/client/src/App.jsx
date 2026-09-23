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
  const visibles = tareas.filter(t => (filtro === "Todas" || (filtro === "Completadas" ? t.completada : !t.completada)) && t.titulo.toLocaleLowerCase().includes(busqueda.trim().toLocaleLowerCase()));
  return <main>
    <nav className="marca" aria-label="Identidad de la aplicación"><span className="marca-icono">✓</span> enfoque<span className="marca-detalle">TU ESPACIO DE TRABAJO</span></nav>
    <Encabezado titulo="Un paso más cerca." subtitulo="Organiza tus pendientes, celebra tus avances y enfócate en lo que sigue." />
    <ResumenTareas total={tareas.length} completadas={completadas} />
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
