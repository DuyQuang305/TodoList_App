import { Injectable, HttpStatus, HttpException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '../../models/task/task.entity';
import { CreateTaskDto } from './dtos/create.dto';
import { UpdateTaskDto } from './dtos/update.dto';

import {createResponse} from '../../helpers/createRespone.helpers';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Tasks)
        private readonly taskResposity: Repository<Tasks>,
    ) {}

    public async showAll() {
      try {
        const tasks = await this.taskResposity.find()

        if (tasks.length == 0) {
          throw new NotFoundException({ statusCode: HttpStatus.NOT_FOUND, message: 'Tasks not found'});
        }

        return createResponse(HttpStatus.OK, 'Tasks fetched successfully', tasks)

      } catch (error) {
        throw error
      }
     } 

    public async createTask(createTaskDto: CreateTaskDto) {
      try {
        const task = await this.taskResposity.save(createTaskDto);

        return createResponse( HttpStatus.CREATED, 'Created task successfully', task)

      } catch (error) {
        throw error
      }
   }

  public async getTaskById(id: string) {

      try {
        const task = await this.taskResposity.findOneBy({id})
          
        if (!task) {
          throw new NotFoundException({statusCode: HttpStatus.NOT_FOUND, message: 'Task not found!'})
        }

        return createResponse( HttpStatus.OK, 'Here is your task you want show', task)

      } 
       catch (error) {
        throw error
      }
    }
         

  public async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
       try {
        const task = await this.taskResposity.findOneBy({id})
          
        if (!task) {
          throw new NotFoundException({statusCode: HttpStatus.NOT_FOUND, message: 'Task not found!'})
        }
  
        if (updateTaskDto.priority !== 'High' && updateTaskDto.priority !==  'Low' && updateTaskDto.priority !== 'Medium') {
          throw new BadRequestException({statusCode: HttpStatus.BAD_REQUEST, message: 'Please enter valid priority!'})
        }
  
        if (updateTaskDto.status !== 'Done' && updateTaskDto.status !==  'Todo' && updateTaskDto.status !== 'In-Progress') {
          throw new BadRequestException({statusCode: HttpStatus.BAD_REQUEST, message: 'Please enter valid status!'})
        }
  
        await this.taskResposity.update(id, updateTaskDto);
      
     
        
        return createResponse( HttpStatus.CREATED, 'Update task successfully', {task: updateTaskDto})

       } catch(error) {
         throw error
       }
  }

  public async deleteTask(id: string) {
    try {
      const task = await this.taskResposity.findOneBy({id})
          
      if (!task) {
        throw new BadRequestException({statusCode: HttpStatus.BAD_REQUEST, message: 'Task not found!'})
      }
  
      await this.taskResposity.delete({id})
  
      return createResponse( HttpStatus.NO_CONTENT, 'Deleted task successfully')

    } catch (error) {
      throw error
    }
  }

  public async findOldestTask () {
    try {
      const tasks = await this.taskResposity.find()

      if (tasks.length == 0) {
        throw new NotFoundException({ statusCode: HttpStatus.NOT_FOUND, message: 'Tasks not found'});
      }
  
      const sortTasks = (array) => {
        for (let i = 0; i < array.length; i++) {
          for (let x = 0; x < array.length - 1 - i; x++) {
            if (array[x].createdAt > array[x + 1].createdAt) {
              [array[x], array[x + 1]] = [array[x + 1], array[x]];
            }
          }
        }
        return tasks;
      }

      const threeOldestTasks = sortTasks(tasks).slice(0, 3)

      return createResponse( HttpStatus.OK, 'Tasks fetched successfully', {threeOldestTasks})

    } catch (error) {
      throw error
    }
  }
}
