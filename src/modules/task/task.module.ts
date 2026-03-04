import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/Tasks/task.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),UserModule],
  providers: [TaskService],
  controllers: [TasksController],
  exports: [TypeOrmModule, TaskService],

})
export class TaskModule {}
