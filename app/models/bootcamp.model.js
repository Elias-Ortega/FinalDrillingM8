import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { User } from "./user.model.js";

const Bootcamp = sequelize.define('Bootcamp', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El campo título es requerido"
            }
        }
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                args: [5, 20],
                msg: "Debes introducir un número entero, entre 5 y 20.",
            },
            notEmpty: {
                args: true,
                msg: "Número de CUE es necesario"
            },
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Se debe ingresar una descripción"
            }
        }
    }
}, {
    tableName: 'bootcamps',


});

export {
    Bootcamp
};