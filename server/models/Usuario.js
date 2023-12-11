import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Usuario = db.define(
    "usuario",
    {
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        rol: DataTypes.BOOLEAN

    }
)

export default Usuario;