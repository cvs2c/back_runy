// import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

const validarLogueoUsuario = async (req, res, next) => {
//   await check("user")
//     .notEmpty()
//     .withMessage("Usuario o Contraseña Incorrrecta")
//     .run(req);
//   await check("password")
//     .isLength({ min: 6 })
//     .withMessage("Usuario o Contraseña Incorrrecta")
//     .run(req);
//   //await check("repetir_password").equals(req.body.password).withMessage("Las contraseñas no coinciden").run(req);
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const errorMessages = errors.array().map((error) => error.msg);
//     return res.status(401).json({
//       errors: errorMessages,
//     });
//   }

  const { user, password } = req.body;

  let valPassword = false;

  const usuario = await Usuario.findOne({
    where: {
      user,
    },
  });

  if (usuario) {
    valPassword = await bcrypt.compare(password, usuario.password);
  }
  if (valPassword) {
    next();
  }else{
    return res.status(401).json({
      error: "Usuario o Contraseña Incorrrecta"
    })
  }
};

export { validarLogueoUsuario };
