// modules/tasks/task.controller.ts

import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpStatus, HttpException, UsePipes   } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create.dto';
import { UpdateTaskDto } from './dtos/update.dto';

@Controller('tasks')
export class TaskController {
  constructor(private  taskService: TaskService) {}

  @Get()
  async showAllTasks(){
    return this.taskService.showAll()
  }

  @Post('/store')
  async createTask(@Body() createTaskDto: CreateTaskDto){
     return this.taskService.createTask(createTaskDto)
  }

  @Get('/show-by-id/:id')
  async getTaskById(@Param('id') id: string) {
    
    return this.taskService.getTaskById(id);
  }

  @Patch(':id') 
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto ) {
    return this.taskService.updateTask(id, updateTaskDto)
  }

  @Delete(':id') 
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id)
  }

  @Get('/three-oldest-task') 
  async findOldestTask() {
    return this.taskService.findOldestTask()
  }
}
