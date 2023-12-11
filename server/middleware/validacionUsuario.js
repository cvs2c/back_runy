import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";

const validarCrearUsuario = async (req, res, next) => {
    await check("user").notEmpty().withMessage("El usuario es obligatorio").run(req);
    await check("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres").run(req);
    await check("repetir_password").equals(req.body.password).withMessage("Las contraseñas no coinciden").run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.json({
            errors: errorMessages
        });
    }


    const { user } = req.body;

    const userExists = await Usuario.findOne({
        where: {
            user
        }
    })
    if (userExists) {
        return res.json({
            error: "El usuario ya existe"
        })
    }
    next();
}

export{
    validarCrearUsuario
}