import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgForOf} from '@angular/common';
import {TaskService} from '../../service/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardActions, MatCardContent, MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: 'create.component.html',
  providers: [TaskService],

  imports: [
    CommonModule,
    HttpClientModule,
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
export class TodoComponent implements OnInit {

  taskService: TaskService = inject(TaskService);

  taskTitle: string = '';
  taskDescription: string = '';

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: Task[]): void => {
      this.taskService._tasks = data;
      console.log(this.taskService._tasks);
    });
  }


  tasks = (): Task[] => this.taskService._tasks;
  completedTasks = (): Task[] => this.taskService._completedTasks;

  trackByDate(_: number, task: Task): number {
    return task.date;
  }

  private remove(index: number, taskList: Task[]): void {
    taskList.splice(index, 1);
  }

  removeTask(index: number): void {
    this.remove(index, this.taskService._tasks);
  }

  removeCompletedTask(index: number): void {
    this.remove(index, this.taskService._completedTasks);
  }

  completeTask(index: number): void {
    this.taskService._completedTasks.push(this.taskService._tasks[index]);
    this.removeTask(index);
  }

  submitTask(): void {
    if (this.taskTitle) {
      const taskObj: Task = {
        title: this.taskTitle,
        description: this.taskDescription,
        date: Date.now()
      }

      this.addNewTask(taskObj);

      // Clear inputs
      this.taskTitle = '';
      this.taskDescription = '';
    }
  }

  addNewTask(newTask: Task): void {
    this.taskService.postTask(newTask).subscribe((added: Task): void => {
      this.taskService._tasks.push(added);
    });
  }

/*
  async getTasks(): Promise<Task[] | null> {
    try {
      const response: Response = await fetch('http://localhost:5016/api/todo');

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return null;
    }
  }
*/
}
