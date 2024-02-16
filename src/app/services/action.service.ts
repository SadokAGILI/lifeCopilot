import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionModel } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private getActionsUrl = 'https://localhost:7175/api/Action';
  private postActionUrl = 'https://localhost:7175/api/Action';
  private patchActionUrl=  'https://localhost:7175/api/Action';
  private deleteActionUrl=  'https://localhost:7175/api/Action/DeleteActionById';
  constructor(private http: HttpClient) { }

  getTodos(): Observable<ActionModel[]> {

    return this.http.get<ActionModel[]>(`${this.getActionsUrl}`);
  }

  postAction(actionModel: ActionModel): Observable<ActionModel[]> {
    return this.http.post<ActionModel[]>(this.postActionUrl, actionModel);
  }
  patchAction(actionModel: ActionModel): Observable<ActionModel[]> {
    return this.http.patch<ActionModel[]>(this.patchActionUrl, actionModel);
  }
  deleteAction(actionId: string): Observable<ActionModel[]> {
    const url = `${this.deleteActionUrl}/${actionId}`;
  
    return this.http.delete<ActionModel[]>(url);
  }
}
