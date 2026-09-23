//Importar express
import express from "express";
//Importamos CORS
import cors from "cors";

//Importamos la configuración
import {env} from "./config/env.js";
//Importamos las rutas
import tareasRouter from "./routes/tareas.routes.js";

//Creamos la aplicación de Express
const app = express();

//Usamos el middleware de CORS
app.use(
  cors({
    origin: env.clientURL
  })
);
//Usamos el middleware de Express para parsear JSON
app.use(express.json());

//Se define una ruta de salud para saber
//si el servidor está corriendo correctamente}
app.get("/salud", (req, res) => {
  res.json({
    estado: "ok",
    mensaje: "Servidor corriendo correctamente",
    fecha: new Date().toISOString(),
  });
});

//Rutas de tareas
//Todas las rutas definidas para la aplicación
app.use("/", 
  tareasRouter);

  export default app;