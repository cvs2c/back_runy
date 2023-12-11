import Compra from "../models/Compra.js";
import Proveedor from "../models/Proveedor.js";
import { Op } from "sequelize";

const registrarCompra = async (req, res) => {
    const { monto, fecha, proveedorId } = req.body;
    try {
        const result = await Compra.create({
            monto: monto,
            fecha: fecha,
            proveedorId: proveedorId
        });
        res.status(201).json({
            Status: "success",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            Status: "error",
            data: error,
        });
    }

}

const listarCompra = async(req, res) => {
   
    const id = req.params.id
    try {
        const result = await Compra.findOne({
            where:{
                id
            },
            include: [
                {
                    model: Proveedor,
                    attributes: ["nombre", "apellido", "correo"],
                }
            ],
        });
        if (!result){
            return res.status(404).json({
                Status:'error',
                data: 'El registro no existe'
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

const listarCompras = async (req, res) => {
    try {
        const result = await Compra.findAll({
            include: [
                {
                    model: Proveedor,
                    attributes: ["nombre", "apellido", "correo"],
                }
            ],
            order:[
                ["fecha", "DESC"]
            ]
        });
        return res.status(200).json({
            Status: "success",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            Status: "error",
            data: error,
        });
    }
};
const actualizarCompra = async (req, res) => {
    const id = req.params.id;
    const { monto, fecha, proveedorId } = req.body;
    try {
        const result = await Compra.update(
            {
                monto: monto,
                fecha: fecha,
                proveedorId: proveedorId
            },
            {
                where: {
                    id,
                },
            }
        );
        res.status(200).json({
            Status: "success",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            Status: "error",
            data: error,
        });
    }
};

export {
    registrarCompra,
    listarCompra,
    listarCompras,
    actualizarCompra
}