import Producto from "../models/Producto.js";
import Proveedor from "../models/Proveedor.js";
import Color from "../models/Color.js";
import { Op } from "sequelize";

const registrarProducto = async (req, res) => {
  const {
    proveedorId,
    referencia,
    colorId,
    tamanho,
    precio_compra,
    precio_venta_normal,
    precio_venta_personalizado,
    descripcion,
    stock,
  } = req.body;
  try {
    const result = await Producto.create({
      proveedorId: proveedorId,
      referencia: referencia,
      colorId: colorId,
      tamanho: tamanho,
      precio_compra: precio_compra,
      precio_venta_normal: precio_venta_normal,
      precio_venta_personalizado: precio_venta_personalizado,
      eliminado: 0,
      descripcion: descripcion,
      stock: stock,
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

const listarProductos = async (req, res) => {
  try {
    const result = await Producto.findAll({
      where: {
        eliminado: 0,
      },
      include: [
        {
          model: Proveedor,
          attributes: ["nombre", "apellido", "correo"],
        },
        {
          model: Color,
          attributes: ["referenciaColor", "color"],
        },
      ],
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      data: error,
    });
  }
};

const listarProductosConStock = async (req, res) => {
  try {
    const result = await Producto.findAll({
      where: {
        stock: {
          [Op.gte]: 1,
        },
        eliminado: 0,
      },
      include: [
        {
          model: Proveedor,
          attributes: ["nombre", "apellido", "correo"],
        },
        {
          model: Color,
          attributes: ["referenciaColor", "color"],
        },
      ],
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      data: error,
    });
  }
};

const listarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Producto.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Proveedor,
          attributes: ["nombre", "apellido", "correo"],
        },
        {
          model: Color,
          attributes: ["referenciaColor", "color"],
        },
      ],
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      data: error,
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      proveedorId,
      referencia,
      colorId,
      tamanho,
      precio_compra,
      precio_venta_normal,
      precio_venta_personalizado,
      descripcion,
      stock,
    } = req.body;

    const result = await Producto.update(
      {
        proveedorId: proveedorId,
        referencia: referencia,
        colorId: colorId,
        tamanho: tamanho,
        precio_compra: precio_compra,
        precio_venta_normal: precio_venta_normal,
        precio_venta_personalizado:precio_venta_personalizado,
        descripcion: descripcion,
        stock: stock,
      },
      {
        where: {
          id,
        },
      },
    );

    if (result[0] > 0) {
      return res.status(200).json({
        Status: "success",
        data: "Registro actualizado",
      });
    } else {
      return res.status(404).json({
        Status: "error",
        data: "El registro no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Producto.update(
      {
        eliminado: 1,
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

const modificarPrecios = async (req, res) => {
  try {
    const { referencia, tamanho } = req.params;
    const { precio_venta_normal, precio_venta_personalizado,precio_compra } = req.body;
    const result = await Producto.update(
      {
        precio_venta_normal: precio_venta_normal,
        precio_venta_personalizado:precio_venta_personalizado,
        precio_compra: precio_compra,
      },
      {
        where: {
          referencia,
          tamanho,
          eliminado: 0,
        },
      },
    );

    if (result.length > 0) {
      return res.status(200).json({
        Status: "success",
        data: "Registro actualizado",
      });
    } else {
      return res.status(404).json({
        Status: "error",
        data: "El registro no existe",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Status: "error",
      data: error,
    });
  }
};

const listarProductoPorPrecio = async (req, res) => {
  const { referencia, tamanho } = req.params;
  try {
    const result = await Producto.findOne({
      where: {
        referencia,
        tamanho,
        eliminado: 0,
      },
      include: [
        {
          model: Proveedor,
          attributes: ["nombre", "apellido", "correo"],
        },
        {
          model: Color,
          attributes: ["referenciaColor", "color"],
        },
      ],
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      data: error,
    });
  }
};

export {
  registrarProducto,
  listarProductos,
  listarProducto,
  actualizarProducto,
  eliminarProducto,
  modificarPrecios,
  listarProductoPorPrecio,
  listarProductosConStock
};
