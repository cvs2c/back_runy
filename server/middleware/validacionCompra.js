import { check, validationResult } from "express-validator";
// import Compra from "../models/Compra.js";
// import { Op } from "sequelize";

const validarCompra = async (req, res, next) => {

    const validations = [
        check("proveedorId").notEmpty().withMessage("El proveedor es obligatorio"),
        check("monto").notEmpty().withMessage("El monto es obligatoria")
        .isInt().withMessage("El monto debe ser un numero entero"),
        check("fecha").notEmpty().withMessage("La fecha es obligatoria")
    ]

    await Promise.all(validations.map(validate => validate.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            errors: errorMessages
        });
    }else{
        next();
    }

}

export { validarCompra };