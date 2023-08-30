import { Router } from "express";
import {  loginUser,createUser, deleteUserById, findAll,  findUserById,  updateUserById } from "../controllers/user.controller.js";

const routerUsers = Router();

routerUsers.get('/', findAll);

routerUsers.get('/:id', findUserById);

routerUsers.post('/signin', loginUser)

routerUsers.post('/signup', createUser);

routerUsers.put('/:id', updateUserById);

routerUsers.delete('/:id', deleteUserById);

export {
    routerUsers
}