import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: 'create.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./create.component.css']
})
export class TodoComponent {
  taskTitle: string = '';
  taskDescription: string = '';

  tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || '[]');
  completedTasks: Task[] = JSON.parse(localStorage.getItem("completedTasks") || '[]');

  trackByDate(index: number, task: Task): number {
    return task.date;
  }

  private remove(index: number, taskList: Task[]): void {
    taskList.splice(index, 1);
  }

  removeTask(index: number): void {
    this.remove(index, this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeCompletedTask(index: number): void {
    this.remove(index, this.completedTasks);
  }

  completeTask(index: number): void {
    this.completedTasks.push(this.tasks[index]);
    localStorage.setItem("completedTasks", JSON.stringify(this.completedTasks));
    this.removeTask(index);
  }

  submitTask(): void {
    if (this.taskTitle) {
      this.tasks.push({
        title: this.taskTitle,
        description: this.taskDescription,
        date: Date.now()
      });

      localStorage.setItem("tasks", JSON.stringify(this.tasks));

      // Clear inputs
      this.taskTitle = '';
      this.taskDescription = '';
    }
  }
}
