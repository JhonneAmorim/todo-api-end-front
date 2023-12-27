import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodoItems().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodoItem(newTodo: Todo): void {
    this.todoService.addTodoItem(newTodo).subscribe(() => {
      this.getTodos();
    });
  }

  updateTodoItem(todo: Todo): void {
    this.todoService.updateTodoItem(todo).subscribe(updatedTodo => {
        if (updatedTodo) {
            const index = this.todos.findIndex(t => t.id === updatedTodo.id);
            if (index !== -1) {
                this.todos[index] = updatedTodo;
            }
        }
    });
  }

  startEditing(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  cancelEditing(): void {
    this.editingTodo = null;
  }

  editTodoItem(todo: Todo): void {
    if (todo) {
      this.todoService.editTodoItem(todo).subscribe(() => {
        this.getTodos();
        this.editingTodo = null;
      });
    }
  }

  deleteTodoItem(todo: Todo): void {
    this.todoService.deleteTodoItem(todo).subscribe(() => {
      this.getTodos();
    });
  }
}