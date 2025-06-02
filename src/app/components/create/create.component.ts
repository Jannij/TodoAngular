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
      console.log(this.taskService.tasks);
    });

    this.taskService.getCompletedTasks().subscribe((data: Task[]): void => {
      this.taskService.completedTasks = data;
    })
  }


  tasks = (): Task[] => this.taskService.tasks;
  completedTasks = (): Task[] => this.taskService.completedTasks;

  trackById(index: number, task: Task): number {
    console.log(index, task);
    return Number(task?.id || index);
  }

  // General remove
  private remove(index: number, taskList: Task[]): void {
    taskList.splice(index, 1);
  }

  removeTask(index: number): void {
    this.remove(index, this.taskService.tasks);
  }

  removeCompletedTask(index: number): void {
    this.remove(index, this.taskService.completedTasks);
  }


  completeTask(index: number): void {
    const task = this.taskService.tasks[index];

    this.taskService.markTaskCompleted(task.id).subscribe(() => {
      task.isCompleted = true;
      this.taskService.completedTasks.push(task);
      this.removeTask(index);
    });
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
