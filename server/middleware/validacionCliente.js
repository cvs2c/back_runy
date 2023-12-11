import { check, validationResult } from "express-validator";
import Cliente from "../models/Cliente.js";
import { Op } from "sequelize";

const validarCliente = async (req, res, next) => {

    const validations = [
    check("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    check("apellido").notEmpty().withMessage("El apellido es obligatorio"),
    check("ci").notEmpty().withMessage("El CI es obligatoria"),
    check("telefono").notEmpty().withMessage("El telefono es obligatorio"),
    check("correo").notEmpty().withMessage("El correo es obligatorio").isEmail().withMessage("El correo no tiene un formato válido")

    ];

    await Promise.all(validations.map(validate => validate.run(req)));
    
     

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            errors: errorMessages
        });
    }
    
    //Verifica clientes repetidos
    const {id}= req.params;
    const {ci} = req.body;
   

    if(!id){
        const clienteExist = await Cliente.findOne({
            where: {
                ci
            }
        })
        if (clienteExist) {
            return res.status(409).json({
                errors: "El cliente ya existe"
            })
        }
    
        next();

    }else{
        const clienteExist = await Cliente.findOne({
            where: {
                id: {
                    [Op.not]:id
                },
                ci
            }
        })
        if (clienteExist) {
            return res.status(409).json({
                errors: "El cliente ya existe"
            })
        }
        next();
    }


}

export { 
    validarCliente
};