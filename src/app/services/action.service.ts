import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionModel,Response } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private getActionsUrl = 'https://localhost:7175/api/Action';
  private postActionUrl = 'https://localhost:7175/api/Action';
  private patchActionUrl=  'https://localhost:7175/api/Action';
  private deleteActionUrl=  'https://localhost:7175/api/Action/DeleteActionById';
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Response> {

    return this.http.get<Response>(`${this.getActionsUrl}`);
  }

  postAction(actionModel: ActionModel): Observable<Response> {
    return this.http.post<Response>(this.postActionUrl, actionModel);
  }
  patchAction(actionModel: ActionModel): Observable<Response> {
    return this.http.patch<Response>(this.patchActionUrl, actionModel);
  }
  deleteAction(actionId: string): Observable<Response> {
    const url = `${this.deleteActionUrl}/${actionId}`;

    return this.http.delete<Response>(url);
  }
}
