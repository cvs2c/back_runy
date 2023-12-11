import {
  registrarCompra,
  listarCompra,
  listarCompras,
  actualizarCompra,
} from "../controllers/compraController.js";
import { validarCompra } from "../middleware/validacionCompra.js";
import { Router } from "express";

const router = Router();

router.post("/registrarCompra", validarCompra, registrarCompra);
router.get("/listarCompras", listarCompras);
router.get("/listarCompra/:id", listarCompra);
router.put("/actualizarCompra/:id", validarCompra, actualizarCompra);
export default router;
