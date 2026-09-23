//Importamos el modelo Tarea
//Con este modelo podremos operar directamente los documentos almacenados en MongoDB
import Tarea from "../models/Tarea.js";

//Listamos todas las tareas almacenadas en la base de datos
export async function listaTareas(req, res) {
  try {
    const tareas = await Tarea.find().sort({ createdAt: -1 }); // -1 implica un orden descendente, es decir, de la más reciente a la más antigua
    return res.json(tareas);
  } catch (error) {
    //Si sucede un error de base de datos, se devuelve un error 500
    return res.status(500).json({
      mensaje: "Error al obtener las tareas",
      error: error.message,
    });
  }
}

//Creación de tareas
export async function crearTarea(req, res) {
  try {
    const { titulo } = req.body;
    //Validación básica
    //Comprobamos que exista el título y que no esté vacío
    if (!titulo || titulo.trim() === "") {
      return res.status(400).json({
        mensaje: "El título es obligatorio",
      });
    }

    //Creamos el documento al cual Mongo asignará automaticamente un _id único
    const tarea = await Tarea.create({
      titulo: titulo.trim(),
    });
    return res.status(201).json(tarea);
  } catch (error) {
    //Si sucede un error
    return res.status(500).json({
      mensaje: "Error al crear la tarea",
      error: error.message,
    });
  }
}

