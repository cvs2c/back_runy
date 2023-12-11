import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


const registrar = async (req, res) => {


    const { user, password } = req.body;


    try {
        const result = await Usuario.create({
            user: user,
            password: await bcrypt.hash(password, 10),
            rol: 0,
            eliminado: 0
        })
        res.json({
            result
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

const login = async(req, res) =>{
    const {user, password} = req.body;

    try {

        const usuario = await Usuario.findOne({
            where: {
                user
            }
        })

        // const contraseña = await bcrypt.compare(password, usuario.password);

        // while(!usuario || !contraseña){
        //     return res.status(401).json({
        //         error: "Usuario Invalido o Contraseña Invalida"
        //     })
        // }


        //* Creacion del token
  
        try {

            const token = jwt.sign(
                {usuario: {
                    id:usuario.id,
                    rol: usuario.rol}},
                "!RUNYatelier_/2154?",
                { expiresIn: "1h" }
            );
            res.cookie("token", token,{
                sameSite: "none",
                secure: true
            })

            return  res.status(200).json({
                Status: "success",
                data: {
                    userId : usuario.id,
                    rol : usuario.rol,
                    token : token
                }
            });
            
            
        } catch (error) {
            return res.json({
                error:"Hubo un error al crear el token"
            })
        }

       
        
    } catch (error) {
        res.status(500).json({
            error : "Hubo un error durante el logueo" 
        })
    }
};



//?Cierre de una sesion

const cerrarSesion = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        Status: "success"
    })
}

export {
    registrar,
    login,
    cerrarSesion
};