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

  tasks: Task[] = [];

  trackByDate(index: number, task: Task): number {
    return task.date;
  }

  submitTask(): void {
    if (this.taskTitle) {
      this.tasks.push({
        title: this.taskTitle,
        description: this.taskDescription,
        date: Date.now()
      });

      // Clear inputs
      this.taskTitle = '';
      this.taskDescription = '';
    }
  }
}
