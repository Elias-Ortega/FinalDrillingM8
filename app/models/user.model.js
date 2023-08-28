import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { Bootcamp } from "./bootcamp.model.js";


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El campo  del nombre es requerido"
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El campo  del apellido es requerido"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: "El correo electrónico es requerido"
            },
            isEmail: {
                args: true,
                msg: "Formato de correo inválido",
            },
        },
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debe ingresar una contraseña"
            },
            notEmpty: {
                args: true,
                msg: "Debe ingresar algo por contraseña."
            },
            len: {
                args: [8, 200],
                msg: "La contraseña debe tener un largo mínimo de 8 caracteres."
            }
        }


    }

}, {
    tableName: 'users',

});





export {
    User
};

