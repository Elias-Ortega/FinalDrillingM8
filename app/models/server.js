import express from 'express';
import cors from "cors";
import { routerUsers } from '../routes/user.routes.js';
import { routerBootcamps } from '../routes/bootcamp.routes.js';


export default class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();   
    }

    
    middlewares(){ 
        this.app.use(cors());  
        this.app.use(express.static('public')) ;        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));   
    }

    
    routes(){
        this.app.use('/api', routerUsers)
        this.app.use('/api/user', routerUsers);
        this.app.use('/api/bootcamp',routerBootcamps);
        
    }

    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`)
        })
    }
}