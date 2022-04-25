import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../interfaces/task';
import { CreateTask } from '../interfaces/create-task';
import { UpdateTask } from '../interfaces/update-task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url: string = "https://07873fj516.execute-api.us-east-1.amazonaws.com/tasks";

  constructor(private httpClient: HttpClient) { }

  //Create task
  createTask(task: CreateTask) {
    return this.httpClient.post(this.url, task)
  }

  //Read task
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}`);
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(this.url+'/'+id);
  }

  //Update task
  updateTask(id: string, task : UpdateTask) {
    return this.httpClient.put(this.url+'/'+id, task);
  }

  //Delete
  deleteTask(id: string) {
    return this.httpClient.delete(this.url+'/'+id);
  }

}
