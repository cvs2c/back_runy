import Cliente from "../models/Cliente.js";

const registrarCliente = async (req, res) => {
    const {nombre, apellido, ci, ruc, telefono, correo} = req.body;

    try {
        
        const result = await Cliente.create({
            nombre: nombre,
            apellido: apellido,
            ci: ci,
            ruc: ruc,
            telefono: telefono,
            correo: correo
        })
        return res.status(201).json({
            Status: "success",
            data: result
        })

    } catch (error) {
        return res.status(500).json({
            Status: "error",
            data: error
        })
        
    }

};

const listarClientes = async (req, res) => {
    try {
        const result = await Cliente.findAll();
        return res.status(200).json({
            Status:'success',
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            Status:'error',
            data: error
        })
    }
};

const listarCliente = async(req, res) => {
   
        const id = req.params.id
        try {
            const result = await Cliente.findOne({
                where:{
                    id
                }
            });
            if (!result){
                return res.status(404).json({
                    Status:'error',
                    data: 'El cliente no existe'
                })
            }
            return res.status(200).json({
                Status:'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                Status:'error',
                data: error
            })
        }
};

const actualizarCliente = async (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, ci, ruc, telefono, correo} = req.body;

    try {
        const result = await Cliente.update({
            nombre: nombre,
            apellido:apellido,
            ci: ci,
            ruc: ruc,
            telefono: telefono,
            correo: correo
        },
        {
            where:{
                id
            }
        })
        
        if(result[0] > 0){
            return res.status(200).json({
                Status:'success',
                data: 'Cliente actualizado'
            })
        }else{
            return res.status(404).json({
                Status:'error',
                data: 'El cliente no existe'
            })
        }

    } catch (error) {
        return res.status(500).json({
            Status:'error',
            data: error
        })
    }
}


export{
    registrarCliente,
    listarClientes,
    listarCliente,
    actualizarCliente
}