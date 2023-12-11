import { check, validationResult } from "express-validator";


const validarPreciosProducto = async (req, res, next) => {
    const validations = [
        check ("precio_compra").notEmpty().withMessage("El precio de compra es obligatorio").
        isInt().withMessage("El precio de compra debe ser un valor numerico"),
        check ("precio_venta_normal").notEmpty().withMessage("El precio de venta es obligatorio").
        isInt().withMessage("El precio de venta normal debe ser un valor numerico"),,
        check ("precio_venta_personalizado").notEmpty().withMessage("El precio de venta personalizada es obligatoria").
        isInt().withMessage("El precio de venta personalizada debe ser un valor numerico")
    ]
    
    
    await Promise.all(validations.map(validate=>validate.run(req)));


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            errors: errorMessages
        });
    }


    next();


}

export {
    validarPreciosProducto
}