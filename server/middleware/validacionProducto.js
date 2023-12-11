import { check, validationResult } from "express-validator";
import Producto from "../models/Producto.js";
import { Op } from "sequelize";

const validarProducto = async (req, res, next) => {

    const validations = [
        check("proveedorId").notEmpty().withMessage("El proveedor es obligatorio"),
        check("referencia").notEmpty().withMessage("La referencia es obligatoria"),
        check("colorId").notEmpty().withMessage("El color es obligatorio"),
        check("tamanho").notEmpty().withMessage("El tamaño es obligatorio"),
        check("precio_compra").notEmpty().withMessage("El precio de compra es obligatorio").
        isInt().withMessage("El precio de compra debe ser un valor numerico"),
        check("precio_venta_normal").notEmpty().withMessage("El precio de venta es obligatorio").
        isInt().withMessage("El precio de venta normal debe ser un valor numerico"),
        check("precio_venta_personalizado").notEmpty().withMessage("El precio de venta personalizada es obligatoria").
        isInt().withMessage("El precio de venta personalizada debe ser un valor numerico"),
        check("descripcion").notEmpty().withMessage("La descripcion es obligatoria"),
        check("stock").notEmpty().withMessage("El stock es obligatorio")
    ]

    await Promise.all(validations.map(validate => validate.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            errors: errorMessages
        });
    }

    const { referencia, colorId, tamanho } = req.body;
    const { id } = req.params;

    if (!id) {
        const productoExist = await Producto.findOne({
            where: {
                referencia,
                colorId,
                tamanho
            }
        })

        if (productoExist) {
            return res.status(409).json({
                errors: "El registro ya existe"
            })
        } else {
            next();
        }
    } else {
        const productoExist = await Producto.findOne({
            where: {
                id: {
                    [Op.not]: id
                },
                referencia,
                colorId,
                tamanho
            }
        })
        if (productoExist) {
            return res.status(409).json({
                errors: "El registro ya existe"
            })
        } else {
            next();
        }
    }



}

export { validarProducto };