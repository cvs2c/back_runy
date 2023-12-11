import { check, validationResult } from "express-validator";
import PedidoProducto from "../models/PedidoProducto.js";

const validarPedidoProducto = async (req, res, next) => {
  const validations = [
    check("pedidoId").notEmpty().withMessage("El pedido es obligatorio"),
    check("productoId").notEmpty().withMessage("El producto es obligatorio"),
    check("precio").notEmpty().withMessage("El precio es obligatorio").
    isInt().withMessage("El precio debe ser un valor numerico"),
    check("cantidad").notEmpty().withMessage("La cantidad es obligatoria"),
    check ("personalizado").notEmpty().withMessage("El personalizado es obligatorio")
  ];
  await Promise.all(validations.map((validate) => validate.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  next();
};

export default validarPedidoProducto;
