//Importamos Mongoose 
//Mongoose permitirá definir esquemas y modelos que representen la estructura de los documentos en la base de datos
import mongoose from "mongoose";

//Definimos el esquema de una tarea que deberán tener todos los documentos
const tareaSchema = new mongoose.Schema(
    {
        //Campos del documento
        titulo:{
            //Deberá ser texto
            type: String,
            //Debe ser obligatorio
            required: true,
            //Limpieza de espacios al inicio y final
            trim: true,
            //Longitud mínima de 3 caracteres
            minLength: 3,
            //Longitud máxima de 50 caracteres
            maxLength: 50
        },
        completada:{
            type: Boolean,
            default: false
        }
    },
    {
        //Mongoose agregará automáticamente los campos createdAt y updatedAt
        timestamps: true
    }
);

//Crear el modelo
//El modelo será la interfaz que utilizamos para interactuar con la colección de tareas en la base de datos
const Tarea = mongoose.model(
    "Tarea",
    tareaSchema
);

//Exportamos el modelo para poder utilizarlo en otros archivos
export default Tarea;
