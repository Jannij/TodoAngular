import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl: string = 'http://localhost:5016/api/todo';

  _tasks: Task[] = [];

  _completedTasks: Task[] = [];

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error: Error): Observable<Task[]> => {
        console.error('Error fetching tasks', error);
        return of([]);
      })
    );
  }

  postTask(task: Task): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, task).pipe(
      catchError((error: Error): Observable<never> => {
        console.error('Error adding task:', error);
        return of();
      })
    );
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/completed`).pipe(
      catchError((error: Error): Observable<Task[]> => {
        console.error('Error fetching completed tasks', error);
        return of([]);
      })
    )
  }

  postCompletedTasks(task: Task): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/completed`, task).pipe(
      catchError((error: Error): Observable<never> => {
        console.error('Error adding completed tasks:', error);
        return of();
      })
    );
  }
}
