import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Task} from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = "http://localhost:3000/tasks";
  constructor(private http:HttpClient) { }
  fidAll() {
   return  this.http.get<Task[]>(this.apiUrl);
  }
  deleteTask(id:any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  persistTask(task:Task){
    return this.http.post<Task>(`${this.apiUrl}`, task);
  }
  completed(id: any, completed: any){
    return this.http.patch(`${this.apiUrl}/${id}`, 
    {
      completed : !completed
    }
    );
  }
  updateTask(task: Task){
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
}
