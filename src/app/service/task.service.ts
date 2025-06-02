import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks: Task[] = [];
  private _completedTasks: Task[] = [];

  get tasks(): Task[] {
    return this._tasks;
  }
  set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }
  get completedTasks(): Task[] {
    return this._completedTasks;
  }
  set completedTasks(completedTasks: Task[]) {
    this._completedTasks = completedTasks;
  }

  private apiUrl: string = 'http://localhost:5016/api/todo';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    console.log('Getting Tasks normal');
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error): Observable<Task[]> => {
        console.error('Error fetching tasks', error);
        return of([]);
      })
    );
  }

  postTask(task: Task): Observable<Task | null> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError((error): Observable<null> => {
        console.error('Error adding task:', error);
        return of(null);
      })
    );
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/completed`).pipe(
      catchError((error): Observable<Task[]> => {
        console.error('Error fetching completed tasks', error);
        return of([]);
      })
    );
  }

  markTaskCompleted(id: string, task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/complete`, task).pipe(
      catchError((error): Observable<void> => {
        console.error('Error marking task completed:', error);
        return of(undefined); // Return an Observable of type void
      })
    );
  }


  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error): Observable<void> => {
        console.log('Error deleting task', error);
        return of();
      })
    );
  }
}
