import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Project } from '../models/project';
import { ParentTask } from '../models/parent-task';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  private baseUrl = 'http://localhost:8091/projectmanager';

  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/users` + `/getAllUsers`);
  }

  getProjectList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/projects` + `/getAllProjects`);
  }

  getParentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/parentTasks` + `/getParentTasks`);
  }

  getTaskList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/tasks` + `/getAllTasks`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/users` + `/addUser`, user);
  }

  addProject(project: Project): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/projects` + `/addProject`, project);
  }

  addParentTask(parentTask: ParentTask): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/parentTasks` + `/addParentTask`, parentTask);
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/tasks` + `/addTask`, task);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/users` + `/updateUser` + `/${id}`, user);
  }

  updateProject(id: number, project: Project): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/projects` + `/updateProject` + `/${id}`, project);
  }

  updateTask(id: number, task: Task): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/tasks` + `/updateTask` + `/${id}`, task);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/users` + `/deleteUser` + `/${id}`);
  }

  suspendProject(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/projects` + `/suspendProject` + `/${id}`, null);
  }

  endTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/tasks` + `/endTask` + `/${id}`);
  }

  getAllProjectsRecord(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/projects` + `/getAllProjectsRecord`);
  }

  searchTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/tasks` + `/searchTaskById` + `/${id}`);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/tasks` + `/getTaskById` + `/${id}`);
  }
}
