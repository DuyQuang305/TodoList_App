import { IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../../../models/task/task-status.enum';

export class CreateTaskDto {
    @IsNotEmpty({message: 'Title is required'})
    @IsString({message: 'Title must be string'})
    title: string;

    @IsNotEmpty({message: 'priority is required'})
    @IsString({message: 'Title must be string'})
    priority : 'Low' | 'Medium' | 'High';

    @IsNotEmpty({message: 'status is required'})
    @IsString({message: 'status must be string'})
    status  : TaskStatus;
    
    age?: number;
}