import express from "express";
import { registrar, 
    listarProveedores, 
    listarProveedor, 
    actualizarProveedor, 
    eliminarProveedor } from "../controllers/proveedorController.js";
import {validarProveedor} from "../middleware/validacionProveedor.js";

const router = express.Router();

router.post("/registrarProveedor", validarProveedor, registrar);
router.get("/listarProveedores", listarProveedores);
router.get("/listarProveedor/:id", listarProveedor);
router.put("/actualizarProveedor/:id", validarProveedor, actualizarProveedor);
router.patch("/eliminarProveedor/:id",  eliminarProveedor);

export default router;