import { check, validationResult } from "express-validator";
import Color from "../models/Color.js";
import { Op } from "sequelize";


const validarColor = async(req, res, next)=>{
    

    const validations = [
        check("referenciaColor").notEmpty().withMessage("La referencia del color es obligatoria"),
        check("color").notEmpty().withMessage("El nombre del color es oblitgatorio")   
    ]

    await Promise.all(validations.map(validate => validate.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            errors: errorMessages
        });
    }

    const {referenciaColor} = req.body;
    const {id} = req.params;

    if(!id){

        const colorExist = await Color.findOne({
            where:{
                referenciaColor
            }
        })

        if(colorExist){
            return res.status(409).json({
                errors:'El registro ya existe'
            })
        }else{
            next();
        }


    }else{
        const colorExist = await Color.findOne({
            where:{
                id:{
                    [Op.not]:id
                },
                referenciaColor
            }
        })

        if(colorExist){
            return res.status(409).json({
                errors:'El registro ya existe'
            })
        }else{
            next();
        }
    }


}

export default validarColor;