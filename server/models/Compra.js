import db from "../config/db.js";
import { DataTypes } from "sequelize";
// import Producto from "./Producto.js";

const Compra = db.define(
  "compras",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "compras",
  }
);


export default Compra;