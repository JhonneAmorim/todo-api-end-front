import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo-list/todo-list.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5277/api/todoitems';

  constructor(private http: HttpClient) { }

  getTodoItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addTodoItem(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  addTodo(todo : { name: string }) {
    return this.http.post(this.apiUrl, todo);
  }

  updateTodoItem(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  editTodoItem(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  deleteTodoItem(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.delete<Todo>(url);
  }
}
