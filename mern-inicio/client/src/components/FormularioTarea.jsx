import { useState } from "react";
export default function FormularioTarea({ onAgregarTarea }) {
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");
  function enviar(e) {
    e.preventDefault();
    if (!titulo.trim()) { setError("Escribe un título para agregar la tarea."); return; }
    onAgregarTarea(titulo.trim()); setTitulo(""); setError("");
  }
  return <form onSubmit={enviar} className="formulario"><label htmlFor="nueva-tarea" className="sr-only">Nueva tarea</label><input id="nueva-tarea" maxLength={160} placeholder="¿Qué quieres lograr hoy?" value={titulo} aria-invalid={!!error} aria-describedby={error ? "error-tarea" : undefined} onChange={e => { setTitulo(e.target.value); setError(""); }} /><button className="primario" type="submit">＋ Agregar tarea</button>{error && <p id="error-tarea" role="alert" className="error">{error}</p>}</form>;
}
