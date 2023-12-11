import Producto from "../models/Producto.js";

const modificarStock = async (req, res, next) => {
  const { productoId, cantidad } = req.body;

  try {
    const producto = await Producto.findOne({
      where: {
        id: productoId,
      },
    });

    if (!producto) {
      return res.status(404).json({
        errors: ["El producto no existe"],
      });
    }

    const stockActual = producto.dataValues.stock;
    const result = await Producto.update(
      {
        stock: stockActual - cantidad,
      },
      {
        where: {
          id: productoId,
        },
      }
    );

    if (result[0] === 1) {
      next();
    } else {
      return res.status(400).json({
        status: "Error al modificar el stock",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      data: error,
    });
  }
};
export default modificarStock;
