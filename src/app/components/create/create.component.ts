import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {TaskService} from '../../service/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardActions, MatCardContent, MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: 'create.component.html',

  imports: [
    FormsModule,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCardActions,
    MatCardContent,
    MatButtonModule,
  ],

  styleUrls: ['./create.component.css']
})
export class TodoComponent {

  taskService: TaskService = inject(TaskService);

  taskTitle: string = '';
  taskDescription: string = '';

  tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || '[]');
  completedTasks: Task[] = JSON.parse(localStorage.getItem("completedTasks") || '[]');

  trackByDate(_: number, task: Task): number {
    return task.date;
  }

  private remove(index: number, taskList: Task[]): void {
    taskList.splice(index, 1);
  }

  removeTask(index: number): void {
    this.remove(index, this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskService.writeTasks(this.tasks);
  }

  removeCompletedTask(index: number): void {
    this.remove(index, this.completedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(this.tasks));
  }

  completeTask(index: number): void {
    this.completedTasks.push(this.tasks[index]);
    localStorage.setItem("completedTasks", JSON.stringify(this.completedTasks));
    this.removeTask(index);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskService.writeCompletedTasks(this.completedTasks);
    console.log(this.taskService);
  }

  submitTask(): void {
    if (this.taskTitle) {
      this.tasks.push({
        title: this.taskTitle,
        description: this.taskDescription,
        date: Date.now()
      });

      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.taskService.writeTasks(this.tasks);

      // Clear inputs
      this.taskTitle = '';
      this.taskDescription = '';
    }
  }
}
