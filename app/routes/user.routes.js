import { Router } from "express";
import {  loginUser,createUser, deleteUserById, findAll,    updateUserById } from "../controllers/user.controller.js";

const routerUsers = Router();

routerUsers.get('/user', findAll);

routerUsers.post('/signin', loginUser)

routerUsers.post('/signup', createUser);

routerUsers.put('/:id', updateUserById);

routerUsers.delete('/:id', deleteUserById);

export {
    routerUsers
}