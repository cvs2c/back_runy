import express from "express";
import { validarCliente } from "../middleware/validacionCliente.js";
import { 
    registrarCliente, 
    listarClientes,
    listarCliente,
    actualizarCliente } from "../controllers/clienteController.js";

const router = express.Router();

router.post("/registrarCliente", validarCliente, registrarCliente);
router.get("/listarClientes", listarClientes);
router.get("/listarCliente/:id", listarCliente);
router.put("/actualizarCliente/:id", validarCliente, actualizarCliente);

export default router;
