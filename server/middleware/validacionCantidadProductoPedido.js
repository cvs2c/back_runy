import Producto from "../models/Producto.js";

const validarCantidad = async (req, res) => {
  const { productoId, cantidad } = req.body;

  const result = await Producto.findOne({
    where: {
      id: productoId,
    },
  });
  const stockActual = result.stock;
  if (stockActual < cantidad) {
    return res.status(400).json({
      errors: ["La cantidad supera el stock disponible"],
    });
  }

  return res.status(200).json({
    Status: "Ok",
  });
};
export default validarCantidad;
