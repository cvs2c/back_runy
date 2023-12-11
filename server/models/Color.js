import db from "../config/db.js";
import { DataTypes } from "sequelize";
import Producto from "./Producto.js";

const Color = db.define(
    "color",
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        referenciaColor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        color:{
            type: DataTypes.STRING,
            allowNull: false
        },
        eliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: "color"
    }
)

Color.hasMany(Producto, {
    foreignKey: 'colorId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Producto.belongsTo(Color)

export default Color;