import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks: Task[] = [
    { title: "TASK", description: "Task 1", date: Date.now() },
  ];

  get tasks(): Task[] {
    return this._tasks;
  }
}
