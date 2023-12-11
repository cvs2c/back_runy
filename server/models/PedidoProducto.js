import db from "../config/db.js";
import { DataTypes, ENUM } from "sequelize";
import Pedido from "./Pedido.js";
import Producto from "./Producto.js";

const PedidoProducto = db.define(
	'pedidoproducto',
	{
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cantidad:{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		precio:{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		personalizado:{
			type: DataTypes.ENUM('P', 'N'),
			allowNull: false
		}
	},
	{
		tableName: 'pedidoproducto'
	}

)

//Relation M:N
Pedido.belongsToMany(Producto, {
  through: {
    model:  PedidoProducto ,
    foreignKey: 'pedidoId',
    unique: false
  }
});

Producto.belongsToMany(Pedido, {
  through: {
    model:  PedidoProducto ,
    foreignKey: 'productoId',
    unique: false
  }
});

// Modelo PedidoProducto
PedidoProducto.belongsTo(Pedido, { foreignKey: 'pedidoId' });
PedidoProducto.belongsTo(Producto, { foreignKey: 'productoId' });


export default PedidoProducto;
