import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}


  @Get('/')
  getTasks(): Promise<any> {
    return this.taskService.findAll();
  }
  
  @Get('/:id')
  getTask(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }
  @Post('/')
  createTask(@Body() body: any) {
    return this.taskService.createTask(body);
  }

  @Patch('/:id/done')
  markTaskAsDone(@Body() body: any, @Param('id') id: number) {
    return this.taskService.updateTask(id, body);
  } 

  @Patch('/:id/pending')
  markTaskAsPending(@Body() body: any, @Param('id') id: number) {
    return this.taskService.updateTask(id, body);
  }

  @Delete('/delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
