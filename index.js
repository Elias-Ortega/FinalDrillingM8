import 'dotenv/config';
import Server from './app/models/server.js';

const server = new Server();

server.listen();