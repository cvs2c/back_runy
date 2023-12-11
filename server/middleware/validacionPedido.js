import { check, validationResult } from "express-validator";
import Pedido from "../models/Pedido.js";

const validarPedido = async (req, res, next) => {
  const validations = [
    check("clienteId").notEmpty().withMessage("El cliente es obligatorio"),
    check("fecha_entrega")
      .notEmpty()
      .withMessage("La fecha de entrega es obligatoria"),
  ];

  await Promise.all(validations.map((validate) => validate.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  } else {
    next();
  }
};

export { validarPedido };
