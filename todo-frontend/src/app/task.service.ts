import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/${task._id}`, task);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
