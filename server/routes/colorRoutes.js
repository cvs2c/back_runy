import {
    registrarColor,
    listarColores,
    listarColor,
    actualizarColor,
    eliminarColor
} from "../controllers/colorController.js";
import validarColor from "../middleware/validacionColor.js";
import { Router } from "express";

const router = Router();

router.post("/registrarColor", validarColor,registrarColor);
router.get("/listarColores",listarColores);
router.get("/listarColor/:id", listarColor);
router.put("/actualizarColor/:id", validarColor,actualizarColor);
router.patch("/eliminarColor/:id",eliminarColor);

export default router;