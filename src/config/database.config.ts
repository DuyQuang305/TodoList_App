import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import  {Tasks}  from '../models/task/task.entity' 
const dotenv = require('dotenv');

dotenv.config();

const DatabaseModule: TypeOrmModuleOptions  = {
        type: 'mysql',
        host: process.env.databaseHost,
        port: +process.env.databasePort,
        username: process.env.databaseUsername,
        password: process.env.databasePassword,
        database: process.env.databaseName,
        entities: [
            Tasks,
        ],
        synchronize: true,
      }

export default DatabaseModule;