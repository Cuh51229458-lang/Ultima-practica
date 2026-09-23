//Importamos Mongoose que será la capa utilizada
//para implementar la conexión con la base de datos de MongoDB
import mongoose from "mongoose";
//Creamos una función asíncrona
//Es asíncrona porque conectarse a la base de datos
//tarda cierto tiempo y puede fallar
export async function conectarDB(uri){
    //Esperamos a que Mongoose establezca una conexión real con MongoDB
    const conexion = await mongoose.connect(uri);
    //Si llegamos hasta aquí significa que 
    //la conexión fue exitosa
    console.log(`Se ha conectado exitosamente a la BD ${conexion.connection.name}`);
}