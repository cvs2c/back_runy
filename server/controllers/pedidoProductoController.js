import PedidoProducto from "../models/PedidoProducto.js";
import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";
import Color from "../models/Color.js";
import { Sequelize } from "sequelize";

const registrarPedidoProducto = async (req, res, next) => {
  const { pedidoId, productoId, precio, cantidad, personalizado } = req.body;

  try {
    const result = await PedidoProducto.create({
      pedidoId: pedidoId,
      productoId: productoId,
      precio: precio,
      cantidad: cantidad,
      personalizado: personalizado,
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

  next();
};

const listarPedidosProductos = async (req, res) => {
  try {
    const result = await PedidoProducto.findAll();
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

const listarPedidoProducto = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await PedidoProducto.findOne({
      where: {
        id,
      },
    });

    if (!result) {
      return res.status(404).json({
        Status: "error",
        data: "El registro no existe",
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
      data: error,
    });
  }
};

const actualizarPedidoTotal = async (req, res) => {
  const id = req.params.id;
  const { total } = req.body;
  try {
    const result = await Pedido.update(
      {
        total: total,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const listarProductosVentas = async (req, res) => {
  try {
    const result = await PedidoProducto.findAll({
     attributes:[
      'productoId',
      [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'totalCantidad'],
      [Sequelize.fn('SUM', Sequelize.col('precio')), 'totalPrecio']
     ],
     group:['productoId'],
     include:[
      {
        model:Producto,
        attributes:['referencia', 'tamanho', 'colorId'],
        include:[
          {
            model:Color,
            attributes:['referenciaColor', 'color']
          }
        ]
      }
     ]
    });
    return res.status(200).json({
      Status: "success",
      data: result,
    });
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
}

const listarPedidoTicket = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await PedidoProducto.findAll({
      where: {
        pedidoId: id,
      },
      attributes: ["productoId","cantidad","precio"],
      include: [
        {
          model: Producto,
          attributes: ["descripcion"]
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



export {
  registrarPedidoProducto,
  listarPedidosProductos,
  listarPedidoProducto,
  actualizarPedidoTotal,
  listarProductosVentas,
  listarPedidoTicket
};
