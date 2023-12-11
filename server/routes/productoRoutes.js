import { 
    registrarProducto,
    listarProductos,
    listarProducto,
    actualizarProducto,
    eliminarProducto,
    modificarPrecios,
    listarProductoPorPrecio,
    listarProductosConStock
} from "../controllers/productoController.js";
import { validarProducto } from "../middleware/validacionProducto.js";
import { validarPreciosProducto } from "../middleware/validacionPreciosProducto.js";
import { Router } from "express";
const router = Router();

router.post("/registrarProducto",validarProducto,registrarProducto);
router.get("/listarProductos",listarProductos);
router.get("/listarProducto/:id",listarProducto);
router.get("/listarProductosPorPrecio/:referencia/:tamanho", listarProductoPorPrecio);
router.get("/listarProductosConStock",listarProductosConStock);
router.put("/actualizarProducto/:id", validarProducto,actualizarProducto);
router.put("/modificarPrecios/:referencia/:tamanho",validarPreciosProducto,modificarPrecios);
router.patch("/eliminarProducto/:id", eliminarProducto);

export default router;