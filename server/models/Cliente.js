import db from "../config/db.js";
import { DataTypes } from "sequelize";
import Pedido from "./Pedido.js";

const Cliente = db.define(
    'clientes',
    {
        nombre:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        apellido:{
            type:DataTypes.STRING(30),
            allowNull: false
        },
        ci:{
            type:DataTypes.INTEGER(30),
            allowNull: false
        },
        ruc:{
            type:DataTypes.STRING(30),
            allowNull: true
        },
        telefono:{
            type:DataTypes.STRING(30),
            allowNull: false
        },
        correo:{
            type:DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        tableName: 'cliente'
    }
)

Cliente.hasMany(Pedido, {
	foreignKey: 'clienteId', 
	sourceKey: 'id',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
});
Pedido.belongsTo(Cliente);

export default Cliente;
