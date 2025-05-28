import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _tasks: Task[] = [
    { title: "TASK", description: "Task 1", date: Date.now() },
  ];

  _completedTasks: Task[] = [];

  writeTasks(tasks: Task[]): void {
    this._tasks = tasks;
  }

  writeCompletedTasks(tasks: Task[]): void {
    this._completedTasks = tasks;
  }
}
