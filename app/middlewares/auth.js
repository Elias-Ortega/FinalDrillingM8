import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const verifyToken = async (req = request, res = response, next) => {
    const token = req.header('Authorization');
    if (!token){
        return res.status(401).json({
            msg: 'No tienes acceso a este recurso'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const userAuth = await User.findByPk(uid);
        req.userAuth = userAuth;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'No tienes acceso a este recurso' 
        });
    }
} 

export {
    verifyToken
}