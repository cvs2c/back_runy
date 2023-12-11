import db from "../config/db.js";
import { DataTypes, Sequelize } from "sequelize";
import { ENUM } from "sequelize";
//import Producto from "./Producto.js";
//import PedidoProducto from "./PedidoProduct.js";

const Pedido = db.define(
  "pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.ENUM("P", "F", "C", "E"),
      defaultValue: "P",
    },
    fecha_entrega: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  },
    
  {
    tableName: "pedido",
  },
);

export default Pedido;
