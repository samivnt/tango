import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { config } from '../../app/config';
import { Issue } from '../../models/issue';
import { IssueRequest } from '../../models/issue-request';
import { IssueType } from '../../models/issue-type';
import {ActionRequest} from "../../models/action-request";
import { IssueTypeRequest } from "../../models/issue-type-request";


/*
  Generated class for the IssueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssueProvider {

  constructor(public http: HttpClient) {
    console.log('Hello IssueProvider Provider');
  }

/*--- GET ---*/
  // Récupération des issues types depuis l'API
  getIssueTypes(): Observable<IssueType[]> {
    console.log('nous sommes dans getIssueTypes');
    return this.http.get<IssueType[]>(config.apiUrl + '/issueTypes');
  }

  getIssues(): Observable<Issue[]>{
    return this.http.get<Issue[]>(config.apiUrl + "/issues");
  }

  getIssuesFilteredByStatus(status : String): Observable<Issue[]>{
    return this.http.get<Issue[]>(config.apiUrl + "/issues?state=" + status);
  }

/*--- POST ---*/
  // Création d'une issue
  postIssue(issueRequest:IssueRequest): Observable<Issue>{
    return this.http.post<Issue>(config.apiUrl + '/issues', issueRequest).pipe();
  }

  postIssueType(issueTypeRequest:IssueTypeRequest): Observable<IssueType>{
    return this.http.post<IssueType>(config.apiUrl + "/issueTypes", issueTypeRequest);
  }

/*--- UPDATE ---*/
  updateIssueType(issueTypeId:string, issueTypeRequest:IssueTypeRequest): Observable<IssueType>{
    return this.http.patch<IssueType>(config.apiUrl + "/issueTypes/" + issueTypeId, issueTypeRequest);
  }

/* --- SET ---*/
  setState(action : ActionRequest, issueId : String) : Observable<Issue>{
    return this.http.post<Issue>(config.apiUrl + "/issues/" + issueId + "/actions", action).pipe();
  }

/*--- DELETE ---*/
  deleteIssueTypes(issueTypeId:string): Observable<IssueType>{
    console.log(issueTypeId);
    
    return this.http.delete<IssueType>(config.apiUrl + "/issueTypes/" + issueTypeId);
  }

}
