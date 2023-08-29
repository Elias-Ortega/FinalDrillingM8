import { Router } from "express";
import { createBootcamp,  findAll, findById ,addUser } from "../controllers/bootcamp.controller.js";

const routerBootcamps = Router();

routerBootcamps.get('/', findAll);

routerBootcamps.get('/:id', findById);

routerBootcamps.post('/', createBootcamp);

routerBootcamps.post('/addUser/', addUser);


export {
    routerBootcamps
}