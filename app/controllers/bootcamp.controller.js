import { request, response } from 'express';
import { Bootcamp } from '../models/bootcamp.model.js';
import { UserBootcamp } from '../models/userBootcamp.model.js';
import { User } from '../models/user.model.js';

const findAll = async (req = request, res = response) => {
    try {
        let bootcamps = await Bootcamp.findAll({
            include: {
                model: UserBootcamp, 
                include: User, 
            },
        });

        if (bootcamps.length === 0) {
            return res.status(404).json({ code: 404, message: "No se encontraron bootcamps." });
        }

        bootcamps = bootcamps.map((bootcamp) => bootcamp.toJSON());
        console.log("Bootcamps encontrados", bootcamps);
        res.json({ code: 200, message: "Ok", bootcamps });
    } catch (error) {
        res.status(500).json({ code: 500, message: "Error al obtener los Bootcamps" });
    }
};


const findById = async (req = request, res = response) => {
    let id = req.params.id;
    try {

        let bootcamp = await Bootcamp.findByPk(id, {
            include: {
                model: UserBootcamp, 
                include: User, 
            },
        })

        if (!bootcamp) {
            return res.status(404).json({ code: 404, message: "No se encontró al bootcamp con id: " + id });
        }
        console.log("bootcamp encontrado", bootcamp)
        res.json({ code: 200, message: 'bootcamp encontrado', bootcamp });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Error al obtener el bootcamp con id ${id} solicitado.`,
        });
    }

}


const createBootcamp = async (req = request, res = response) => {
    try {
        let { title, cue, description } = req.body;
        let bootcamp = await Bootcamp.create({
            title,
            cue,
            description,
        });
        console.log("bootcamp creado: ", bootcamp);

        res.status(201).json({ code: 201, message: "Bootcamp creado con éxito", bootcamp });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al crear el bootcamp",
        });
    }


}


const addUser = async (req = request, res = response) => {
    try {
        let { user_id, bootcamp_id } = req.body;

        
        let newUserBootcamp = await UserBootcamp.create({
            user_id: user_id,
            bootcamp_id: bootcamp_id,
        });

        console.log("Usuario agregado al bootcamp: ", newUserBootcamp);

        res.status(201).json({ code: 201, message: " Usuario agregado al bootcamp con éxito", newUserBootcamp });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al agregar el usuario al bootcamp",
        });
    }
}




export {
    findAll,
    findById,
    createBootcamp,
    addUser


}