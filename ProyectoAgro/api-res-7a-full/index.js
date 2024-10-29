const { conexion } = require('./basedatos/conexion'); // Importar la conexión a la base de datos
const express = require("express");
const cors = require("cors");

// Inicializar la aplicación
console.log("Aplicación de Node arrancada");
conexion(); // Conectar a la base de datos

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto a tu frontend URL en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions)); // Aplicar CORS con las opciones definidas

// Convertir body a objeto js
app.use(express.json()); // Recibir datos con formato JSON
app.use(express.urlencoded({ extended: true })); // Convertir datos de formularios

/* RUTAS */
const rutas_articulo = require("./rutas/ArticuloRutas"); // Importar rutas

// Cargar rutas
app.use("/api", rutas_articulo); // Todas las rutas de artículos estarán bajo /api

// Rutas de prueba hardcodeadas
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json([
        {
            curso: "Master en React",
            autor: "Manuel Hernandez Herrera",
            url: "manuelhernandezweb.com.mx/master-react-pro"
        },
        {
            curso: "Master en React Native",
            autor: "Manuel Hernandez Herrera",
            url: "manuelhernandezweb.com.mx/master-react-native"
        }
    ]);
});

app.get("/", (req, res) => {
    return res.send(`
        <h1>Empezando un API REST con Node</h1>
    `);
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprimir el error en la consola
    res.status(500).send('Algo salió mal!'); // Enviar un mensaje de error
});

// Crear servidor y escuchar peticiones HTTP
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});
