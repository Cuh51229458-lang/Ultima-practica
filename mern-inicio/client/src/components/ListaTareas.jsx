import Tarea from "./Tarea";
export default function ListaTareas({ tareas, onAlternar, onEliminar }) {
  return <div className="tabla-contenedor"><table className="tabla-tareas"><caption className="sr-only">Tareas: marca la casilla para cambiar su estado.</caption><thead><tr><th scope="col">TAREA</th><th scope="col">ESTADO</th><th scope="col">ACCIONES</th></tr></thead><tbody>{tareas.map(t => <Tarea key={t.id} tarea={t} onAlternar={onAlternar} onEliminar={onEliminar} />)}{!tareas.length && <tr><td colSpan="3" className="estado-vacio"><strong>Todo despejado por aquí</strong><p>Agrega una tarea o cambia los filtros de búsqueda.</p></td></tr>}</tbody></table></div>;
}
