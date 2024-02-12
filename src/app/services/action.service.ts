import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionModel } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private apiUrl = 'https://localhost:7175/api/Action';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<ActionModel[]> {

    return this.http.get<ActionModel[]>(`${this.apiUrl}`);
  }


}
