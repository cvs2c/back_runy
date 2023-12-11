import {
  registrarPedidoProducto,
  listarPedidosProductos,
  listarPedidoProducto,
  actualizarPedidoTotal,
  listarProductosVentas,
  listarPedidoTicket
} from "../controllers/pedidoProductoController.js";
import validarPedidoProducto from "../middleware/validacionProductoPedido.js";
import validarCantidad from "../middleware/validacionCantidadProductoPedido.js";
import modificacionTotal from "../middleware/modificacionTotalPedido.js";
import modificarStock from "../middleware/modificacionStockProducto.js";
import { Router } from "express";
const router = Router();

router.post(
  "/registrarPedidoProducto",
  registrarPedidoProducto,
  modificarStock,
 modificacionTotal
);
router.get("/listarPedidosProductos", listarPedidosProductos);
router.get("/listarPedidoProducto/:id", listarPedidoProducto);
router.get("/listarProductosVentas", listarProductosVentas);
router.get("/listarPedidoTicket/:id", listarPedidoTicket);
router.post("/verificarCantidadPedido", validarPedidoProducto, validarCantidad);

export default router;
