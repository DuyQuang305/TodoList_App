import { IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../../../models/task/task-status.enum';

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsOptional()
    title: string;

    @IsNotEmpty()
    @IsOptional()
    priority : 'Low' | 'Medium' | 'High';

    @IsNotEmpty()
    @IsOptional()
    status  : TaskStatus;

    age?: number;
}