import db from "../config/db.js";
import { DataTypes } from "sequelize";
import Producto from "./Producto.js";
import Compra from "./Compra.js";

const Proveedor = db.define(
    'proveedor',
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        empresa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: false
        },  
        correo:{
            type: DataTypes.STRING
        },
        
        productos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eliminado:{
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        
    },
    {
        tableName: 'proveedor'
    }
)

Proveedor.hasMany(Producto, {
    as: 'products',
    foreignKey: 'proveedorId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
    
})
Producto.belongsTo(Proveedor)

Proveedor.hasMany(Compra, {
    as: 'compras',
    foreignKey: 'proveedorId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
    
})
Compra.belongsTo(Proveedor)

export default Proveedor;