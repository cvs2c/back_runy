import { check, validationResult } from "express-validator";
import Proveedor from "../models/Proveedor.js";
import { Op } from "sequelize";

const validarProveedor = async (req, res, next) => {
    await check("nombre").notEmpty().withMessage("El nombre es obligatorio").run(req);
    await check("apellido").notEmpty().withMessage("El apellido es obligatorio").run(req);
    await check("empresa").notEmpty().withMessage("La empresa es obligatoria").run(req);
    await check("direccion").notEmpty().withMessage("La direccion es obligatoria").run(req);
    await check("telefono").notEmpty().withMessage("El telefono es obligatorio").run(req);
    await check("productos").notEmpty().withMessage("Los productos son obligatorios").run(req);
    await check("pais").notEmpty().withMessage("El pais es obligatorio").run(req);
    await check("correo").notEmpty().withMessage("El correo es obligatorio").isEmail().withMessage("El correo no tiene un formato válido").run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            errors: errorMessages
        });
    }

    const {nombre, apellido, empresa}= req.body;
    const { id } = req.params;


    if(!id){
        const userExist = await Proveedor.findOne({
            where:{
                nombre,
                apellido,
                empresa
            }
        })
        if (userExist) {
            return res.status(409).json({
                errors: "El registro ya existe"
            })
        }else{
            next();
        }

    }else{

        const proveedorExist = await Proveedor.findOne({
            where:{
                id:{
                    [Op.ne]: id
                },
                nombre,
                apellido,
                empresa
            }
        })
        if (proveedorExist) {
            return res.status(409).json({
                errors: "El registro ya existe"
            })
        }else{
            next();
        }

    }   

}

export { 
    validarProveedor
}