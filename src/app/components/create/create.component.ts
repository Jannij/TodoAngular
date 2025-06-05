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

  public taskService: TaskService = inject(TaskService);

  taskTitle: string = '';
  taskDescription: string = '';

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: Task[]): void => {
      this.taskService.tasks = data;
    });

    this.taskService.getCompletedTasks().subscribe((data: Task[]): void => {
      this.taskService.completedTasks = data;
    })
  }


  tasks = (): Task[] => this.taskService.tasks;
  completedTasks = (): Task[] => this.taskService.completedTasks;

  trackById(index: number, task: Task): number {
    return Number(task?.id || index);
  }

  removeTaskById(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.taskService.tasks = this.taskService.tasks.filter(task => task.id !== id);

      this.taskService.getTasks().subscribe((data: Task[]): void => {
        this.taskService.tasks = data;
      });
    });
  }

  removeCompletedTaskById(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.taskService.completedTasks = this.taskService.completedTasks.filter(task => task.id !== id);

      this.taskService.getCompletedTasks().subscribe((data: Task[]): void => {
        this.taskService.completedTasks = data;
      });
    });
  }

  completeTask(index: number): void {
    const task: Task = this.taskService.tasks[index];
    console.log("HHAHA");

    this.taskService.markTaskCompleted(task.id, {...task, isCompleted: true}).subscribe(() => {
      this.taskService.getCompletedTasks().subscribe((data: Task[]): void => {
        this.taskService.completedTasks = data;
      });
    });

    this.taskService.tasks.splice(index, 1);
  }


  submitTask(): void {
    if (this.taskTitle) {
      const taskObj: Task = {
        title: this.taskTitle,
        description: this.taskDescription,
        id: Date.now().toString(),
        isCompleted: false,
      }

      this.addNewTask(taskObj);

      // Clear inputs
      this.taskTitle = '';
      this.taskDescription = '';
    }
  }

  addNewTask(newTask: Task): void {
    this.taskService.postTask(newTask).subscribe((): void => {
      this.taskService.tasks.push(newTask);
    });
  }

}
