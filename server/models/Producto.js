import db from "../config/db.js";
import { DataTypes } from "sequelize";
//import Proveedor from "./Proveedor.js";

const Producto = db.define(
    'producto',
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        proveedorId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'proveedor',
                key: 'id'
            }
        },
        referencia:{
            type: DataTypes.STRING,
            allowNull: false
        },
        colorId:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references:{
            model: 'color',
            key: 'id'
          }  
        },
        tamanho:{
            type: DataTypes.STRING,
            allowNull: false
        },
        precio_compra:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_venta_normal:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_venta_personalizado:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'producto'
    }
)


export default Producto;