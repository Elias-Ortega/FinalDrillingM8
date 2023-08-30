import bcryptjs from 'bcryptjs';
import { request, response } from 'express';
import { User } from "../models/user.model.js";
import { Bootcamp } from '../models/bootcamp.model.js';
import { UserBootcamp } from '../models/userBootcamp.model.js';
import { generateJWT } from '../helpers/generateJWT.js';

const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.json({
            msg: 'Usuario o contraseña invalidas.'
        })
    }
    const passValidate = bcryptjs.compareSync(password, user.password);
    if (!passValidate) {
        return res.json({
            msg: 'Usuario o contraseña invalidas.'
        });
    }
    const token = await generateJWT(user.id);
    res.json({
        msg: 'Login correcto',
        token
    });
}

const createUser = async (req = request, res = response) => {
    const { firstName, lastName, email, password } = req.body;
    const usuario = {
        firstName,
        lastName,
        email,
        password
    };
    const genPass = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, genPass);
    try {
        const crearUsuario = await User.create(usuario);
        crearUsuario.password = "**********" ;
        res.json(crearUsuario);       
        
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al crear el usuario en el sistema",
        });
    }

}

const findAll = async (req = request, res = response) => {
    try {
        let usuarios = await User.findAll({
            include: {
                model: UserBootcamp,
                include: Bootcamp,
            },
        });

        if (usuarios.length === 0) {
            return res.status(404).json({ code: 404, message: "No se encontraron usuarios." });
        }

        usuarios = usuarios.map((usuario) => usuario.toJSON());
        console.log("Usuarios encontrados", usuarios);
        res.json({ code: 200, message: "Ok", usuarios });
    } catch (error) {
        res.status(500).json({ code: 500, message: "Error al obtener los usuarios del sistema" });
    }
};


const findUserById = async (req = request, res = response) => {
    let id = req.params.id;
    try {

        let usuario = await User.findByPk(id, {
            include: {
                model: UserBootcamp,
                include: Bootcamp,
            },
        });

        if (!usuario) {
            return res.status(404).json({ code: 404, message: "No se encontró al usuario con id: " + id });
        }
        console.log("Usuario encontrado", usuario)
        res.json({ code: 200, message: 'Usuario encontrado', usuario });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Error al obtener el usuario con id ${id} solicitado.`,
        });
    }

}

const updateUserById = async (req = request, res = response) => {
    let id = req.params.id;
    let { firstName, lastName, email } = req.body;
    try {
        let usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                code: 404,
                message: "El usuario que intenta actualizar no existe",
            });
        }

        await usuario.update({
            firstName,
            lastName,
            email,
            password
        });
        console.log("Nuevos datos del usuario".usuario);

        console.log(`Usuario con id ${id} actualizado con éxito.`);
        res.json({
            code: 200,
            message: `Usuario con id ${id} actualizado`,
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: `Error al actualizar al usuario con id ${id}.`,
        });
    }
};


const deleteUserById = async (req = request, res = response) => {
    let id = req.params.id;
    try {

        let usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ code: 404, message: "el usuario que intenta eliminar no existe" });
        }

        await usuario.destroy();

        console.log(`Usuario con  id ${id} fue eliminado`)
        res.json({ code: 200, message: `Usuario con  id ${id} fue eliminado` });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Error al eliminar el usuario con id ${id} .`,
        });
    }

}

export {
    loginUser,
    createUser,
    findAll,
    findUserById,
    updateUserById,
    deleteUserById
}