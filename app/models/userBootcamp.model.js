import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { User } from "./user.model.js";
import { Bootcamp } from "./bootcamp.model.js";

const UserBootcamp = sequelize.define('UserBootcamp',{
    
    clave_primaria:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    bootcamp_id: {
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, {
    tableName: 'user_bootcamp'
});

//Relacion Uno a muchos
User.hasMany(UserBootcamp, {
    foreignKey:'user_id',
    sourceKey: 'id'
});

UserBootcamp.belongsTo(User, {    
    foreignKey: 'user_id',
    targetKey: 'id'
});

Bootcamp.hasMany(UserBootcamp, {
    foreignKey:'bootcamp_id',
    sourceKey: 'id'
});

UserBootcamp.belongsTo(Bootcamp, {    
    foreignKey: 'bootcamp_id',
    targetKey: 'id'
});


 

export {
    UserBootcamp
};