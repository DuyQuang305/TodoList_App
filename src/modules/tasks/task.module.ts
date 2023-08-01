// modules/tasks/task.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks} from '../../models/task/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
