import express from "express";
import { registrar, login, cerrarSesion } from "../controllers/usuarioController.js";
import { validarCrearUsuario} from "../middleware/validacionUsuario.js";
import { validarLogueoUsuario } from "../middleware/validacionLogin.js";


const router = express.Router();

router.post('/registrar', validarCrearUsuario, registrar);
router.post('/login',validarLogueoUsuario, login);
router.get('/logout', cerrarSesion);


export default router;