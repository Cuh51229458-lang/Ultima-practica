//Importamos la aplicación Express que configuramos
//en el archivo app.js
import app from "./app.js";

//Importamos la función responsable de conectar con la base de datos de MongoDB
import { conectarDB } from "./config/db.js";

//Importamos nuestras variables de entorno para la configuración
import { env } from "./config/env.js";

//Creamos una función asíncrona
//Primero conectamos la BD
//y luego levantamos el servidor de express
async function iniciarServidor() {
  try {
    //Intentamos establecer la conexión
    await conectarDB(env.mongodb_uri);
    //Si se establece la conexión
    //entonces abrimos el servidor HTTP
    app.listen(env.port, () => {
      console.log(`Servidor escuchando en el puerto ${env.port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Salir del proceso con un código de error
  }
}

iniciarServidor();
