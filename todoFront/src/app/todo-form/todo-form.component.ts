import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})

export class TodoFormComponent implements OnInit {
  todo = {
    name: ''
  };

  constructor(private todoService: TodoService) {}
  
  @Output() todoAdded = new EventEmitter<void>();

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.todoService.addTodo(this.todo).subscribe(() => {
        this.todoAdded.emit();
        form.reset();
      });
    }
  }
}