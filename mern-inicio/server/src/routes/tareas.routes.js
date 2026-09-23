import express from "express";
//Importar las funciones que ejecutarán
//la lógica de negocio en cada petición

import{
    listaTareas,
    crearTarea
} from "../controllers/tareas.controller.js";

//Creamos un enrutador (Router) para agrupar rutas relacionadas al mismo recurso
const router = express.Router();

//GET 
//Esta ruta permite la consulta de tareas
router.get(
"/", 
listaTareas
)
//POST
//Ruta para crear nuevos recursos
router.post(
"/",
crearTarea
)

export default router;