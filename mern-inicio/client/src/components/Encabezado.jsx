export default function Encabezado({ titulo, subtitulo }) {
  return <header className="encabezado"><div className="encabezado-texto"><span className="eyebrow">MENOS RUIDO. MÁS ENFOQUE.</span><h1>{titulo}</h1><p>{subtitulo}</p><span className="hero-etiqueta">Un lugar para cada pendiente</span></div><div className="hero-banner hero-decoracion" aria-hidden="true">✓</div></header>;
}
