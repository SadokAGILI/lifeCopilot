import { Component, OnInit } from '@angular/core';
import { ActionModel } from 'src/app/models/action.model';
import { ActionService } from '../../services/action.service';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  actions: ActionModel[]=[] ;
  constructor(private actionService: ActionService) { }
  ngOnInit(): void {
    this.loadTodos();
  }
  loadTodos(): void {
    this.actionService.getTodos().subscribe({
      next:(data)=>{
        this.actions = data;
      },
      error:(error)=>{
        console.error('Error loading todos:', error);
      }

    }

    );
  }
}
