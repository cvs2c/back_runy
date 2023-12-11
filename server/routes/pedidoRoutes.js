import {
    registrarPedido,
    listarPedidos,
    listarPedidoUnico,
    finalizarPedido,
    completarPedido,
    pedidosPendientes,
    pedidosCompletados,
    pedidosFinalizados,
    // pedidoCompletado,
    // pedidoFinalizado
    actualizarPedido,
    eliminarPedido

 } from "../controllers/pedidoController.js";
 import { validarPedido } from "../middleware/validacionPedido.js";
 import { Router } from "express";
 const router = Router();

 router.post("/registrarpedido",validarPedido,registrarPedido);
 router.put("/estadoFinalizar/:id",finalizarPedido);
 router.put("/estadoCompletar/:id",completarPedido);
 router.get("/listarpedidos",listarPedidos);
router.get("/listarpedido/:id",listarPedidoUnico);
 router.get("/pedidosPendientes",pedidosPendientes);
 router.get("/pedidosCompletados",pedidosCompletados);
 router.get("/pedidosFinalizados",pedidosFinalizados);
 router.put("/actualizarpedido/:id",validarPedido,actualizarPedido);
 router.put("/eliminarpedido/:id", eliminarPedido);
;

 export default router;
