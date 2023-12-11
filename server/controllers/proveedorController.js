import Proveedor from "../models/Proveedor.js";

const registrar = async (req, res) => {
    const { nombre, apellido, empresa, direccion, telefono, correo, productos, pais } = req.body;

    try {

        const result = await Proveedor.create({
            nombre: nombre,
            apellido: apellido,
            empresa: empresa,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            productos: productos,
            pais: pais,
            eliminado: 0
        })
        res.status(201).json({

                Status: "success",
                data: result
            
        })


    } catch (error) {

        res.status(500).json({
            
                Status: "error",
                data: error
            
        })

    }
};

const listarProveedores = async (req, res) => {
    try {
        const result = await Proveedor.findAll({
            where: {
                eliminado: 0
            }
        })
        res.status(200).json({

            data: result

        })
    } catch (error) {
        res.status(500).json({


            data: error

        })
    }
};


const listarProveedor = async (req, res) => {
    try {
        const result = await Proveedor.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({

            data: result

        })
    } catch (error) {
        res.status(500).json({

            
            data: error

        })
    }
};

const actualizarProveedor = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, empresa, direccion, telefono, correo, productos, pais } = req.body;
    try {
        const result = await Proveedor.update( {
            nombre: nombre,
            apellido: apellido,
            empresa: empresa,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            productos: productos,
            pais: pais,
           

        },
        {
            where: {
                id: id
            }
        }
        )
        if (result[0] > 0) {
            res.status(200).json({
                message: "Proveedor actualizado"
            })
        } else {
            res.status(404).json({
                message: "No se encontro el proveedor con el id especificado"
            })
        }
    } catch (error) {
        res.status(500).json({

            Status: "error",
            data: error

        })
    }
};

const eliminarProveedor = async (req, res) => {

    const { id } = req.params

    try {
        const result = await Proveedor.update(
            { eliminado: 1 },

            {
                where: {
                    id
                }
            }
        );

        if (result[0] > 0) {
            res.status(200).json({
                message:"Proveedor eliminado"
                
            })
        } else {
            res.status(404).json({
                message: "No se encontro el proveedor con el id especificado"
            })
        }


    } catch (error) {
        res.status(500).json({

            Status: "error",
            data: error

        })
    }
}


export {
    registrar,
    listarProveedores,
    listarProveedor,
    actualizarProveedor,
    eliminarProveedor
}