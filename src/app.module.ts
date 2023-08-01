import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TaskModule } from './modules/tasks/task.module';
import  databaseConfig from './config/database.config'

@Module({
  imports: [  ConfigModule.forRoot( {envFilePath: '.development.env',}),
              TypeOrmModule.forRoot(databaseConfig),
              TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
