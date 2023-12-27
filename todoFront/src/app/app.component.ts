import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todoFront';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoItems().subscribe(
      data => {
        console.log(data);
      });
  }
}
