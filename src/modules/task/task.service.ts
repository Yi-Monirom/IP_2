import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/Tasks/task.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}
  findAll() {
    return this.tasksRepo.find({
      relations: ['user'],
    });
  }
  findOne(id: number) {
    return  this.tasksRepo.findOne({ where: { id } });
  }
  createTask(body: any) {
    const task = this.tasksRepo.create(body);
    return this.tasksRepo.save(task);
  }
  async updateTask(id: number, body: any) {
    await this.tasksRepo.update(id, body);
    return this.findOne(id);
  }
  deleteTask(id: string) {
    return this.tasksRepo.delete(id);
  }
}
