//Configuracion de dotenv para poder leer variables de entorno desde un archivo .env
import "dotenv/config";
//Creamos un objeto para centralizar la configuración de la app
export const env ={
    //process.env.PORT es la variable de entorno que contiene el puerto en el que escuchará nuestro backend
    port:Number(
        process.env.PORT??5000
    ),
    //Dirección de coneión a MONGODB
    mongodb_uri:
    process.env.MONGODB_URI??"mongodb://127.0.0.1:27017/mern_inicio",

    //Dirección permitida para el frontend 
    //La utilizaremos con CORS
    clientURL:
    process.env.CLIENT_URL??
    "http://localhost:5173"

    };