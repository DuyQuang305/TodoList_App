import { TaskStatus } from '../../models/task/task-status.enum';

export interface interfaceTask {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  age?: number; 
}