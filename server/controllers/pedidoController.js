import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";
import Producto from "../models/Producto.js";
import PedidoProducto from "../models/PedidoProducto.js";
import { Op } from "sequelize";

const registrarPedido = async (req, res) => {
  const { clienteId, fecha_entrega } = req.body;

  try {
    const result = await Pedido.create({
      clienteId: clienteId,
      fecha_entrega: fecha_entrega,
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
};

const listarPedidos = async (req, res) => {
  try {
    const result = await Pedido.findAll({
      order: [["createdAt", "DESC"]],
      // where: {
      //   estado: {
      //     [Op.or]: ["F", "P", "M"],
      //   },
      // },
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "telefono", "correo"],
        },
      ],
    });

    return res.status(200).json({
      Status: "succes",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const pedidosPendientes = async (req, res) => {
  try {
    const result = await Pedido.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        estado: "P",
      },
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "telefono", "correo"],
        },
      ],
    });

    return res.status(200).json({
      Status: "succes",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const pedidosFinalizados = async (req, res) => {
  try {
    const result = await Pedido.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        estado: "F",
      },
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "telefono", "correo"],
        },
      ],
    });

    return res.status(200).json({
      Status: "succes",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const pedidosCompletados = async (req, res) => {
  try {
    const result = await Pedido.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        estado: "C",

      },
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "telefono", "correo"],
        },
      ],
    });

    return res.status(200).json({
      Status: "succes",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Pedido.update(
      {
        estado: "E",
      },
      {
        where: {
          id,
        },
      },
    );
    res.status(200).json({
      Status: "success",
      data: "Registro eliminado",
    });
  } catch (error) {
    res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const listarPedidoUnico = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Pedido.findOne({
      where: {
        id,
      },
      attributes: [ "fecha_entrega", "clienteId"],
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido"]
          // include: [
          //   {
          //     model: Producto,
          //     attributes: ["descripcion"]
          //   },
          // ],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({
        Status: "error",
        data: "El pedido no existe",
      });
    } else {
      return res.status(200).json({
        Status: "succes",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

const actualizarPedido = async (req, res) => {
  const id = req.params.id;
  const { clienteId, fecha_entrega } = req.body;
  try {
    const result = await Pedido.update(
      {
        clienteId: clienteId,
        fecha_entrega: fecha_entrega,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json({
      Status: "succes",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
}

const finalizarPedido = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Pedido.update(
      {
        estado: "F",
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json({
      Status: "succes",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const completarPedido = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Pedido.update(
      {
        estado: "C",
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json({
      Status: "succes",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

/*
const actualizarPedido = async (req, res) => {
    const id = req.params.id;
    const {clienteId, productosId, productosPrecio, total, estado, fecha_entrega} = req.body;
    try {
        const result = await Pedido.update({
	    clienteId: clienteId,
            productosId: productosId,
	    productosPrecio: productosPrecio,
            total: total,
            estado: estado,
            fecha_entrega: fecha_entrega,
        },
        {
            where:{
                id
            }
        });
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
*/
export {
  registrarPedido,
  listarPedidos,
  listarPedidoUnico,
  finalizarPedido,
  completarPedido,
  pedidosPendientes,
  pedidosFinalizados,
  pedidosCompletados,
  actualizarPedido,
  eliminarPedido
};
