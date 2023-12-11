import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usuariosRoute from "./server/routes/usuarioRoutes.js";
import proveedorRoute from "./server/routes/proveedorRoutes.js";
import clienteRoute from "./server/routes/clienteRoutes.js";
import productoRoute from "./server/routes/productoRoutes.js";
import colorRoute from "./server/routes/colorRoutes.js"
import pedidoRoute from "./server/routes/pedidoRoutes.js";
import pedidoProductoRoute from "./server/routes/pedidoProductoRoutes.js";
import compraRoute from "./server/routes/comprasRoutes.js"
import db from "./server/config/db.js";



const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true
}));



app.use(express.json());
app.use(cookieParser());

try {
    await db.authenticate();
    await db.sync();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}


app.use(usuariosRoute);
app.use(proveedorRoute);
app.use(clienteRoute);
app.use(productoRoute);
app.use(colorRoute);
app.use(pedidoRoute);
app.use(pedidoProductoRoute);
app.use(compraRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
})
