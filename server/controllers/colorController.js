import Color from "../models/Color.js";

const registrarColor = async(req,res) =>{
    const {referenciaColor, color } = req.body;

    try {
        
        const result = await Color.create({
            referenciaColor:referenciaColor,
            color:color,
            eliminado:0

        })

        return res.status(201).json({
            Status:"succes",
            data: result
        })

    } catch (error) {
        
        return res.status(500).json({
            Status:"error",
            data:error
        })

    }
};


const listarColores = async(req,res)=>{
    try {
        
        const result = await Color.findAll({
            where:{
                eliminado:0
            }
        });
        return res.status(200).json({
            Status:"succes",
            data:result
        },
        )

    } catch (error) {
        return res.status(500).json({
            Status:"error",
            data:error
        })        
    }
};

const listarColor = async(req, res)=>{

    const id = req.params.id

    try {
        
        const result = await Color.findOne({
            where:{
                id
            }
        });

        if(!result){
            return res.status(404).json({
                Status:"error",
                data:'El cliente no existe'
            })
        }else{
            return res.status(200).json({
                Status:"succes",
                data:result
            })
        }
        

    } catch (error) {
        return res.status(500).json({
            Status:"error",
            data:result
        })
    }
}

const actualizarColor = async(req, res)=>{
    const id = req.params.id;
    const {referenciaColor, color } = req.body;
    try {
        const result = await Color.update({
            referenciaColor:referenciaColor,
            color:color
        },
        {
            where:{
                id
            }
        }
        )
        if(result[0]>0){
            return res.status(200).json({
                Status:'succes',
                data:'El registro se ha actualizado'
            })
        }else{
            return res.status(404).json({
                Status:'error',
                data:'El registro no existe'
            })
        }
    } catch (error) {
        return res.status(500).json({
            Status:'error',
            data:error
        })
    }
};

const eliminarColor = async(req, res)=>{
    const id = req.params.id
    try {

        const result = await Color.update({
            eliminado:1
        },
        {
            where:{
                id
            }
        }
        )

        return res.status(200).json({
            Status:'succes',
            data:'Registro Eliminado'
        })
        
    } catch (error) {
        return res.status(500).json({
            Status:'error',
            data: error
        })
    }
}

export {
    registrarColor,
    listarColor,
    listarColores,
    actualizarColor,
    eliminarColor
}