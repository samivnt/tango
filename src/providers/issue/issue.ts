import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { config } from '../../app/config';
import { Issue } from '../../models/issue';
//import { Comment } from '../../models/comment';
//import { CommentRequest } from '../../models/comment-request';
import { IssueRequest } from '../../models/issue-request';
import { IssueType } from '../../models/issue-type';


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

  // Récupération des issues types depuis l'API
  getIssueTypes(): Observable<IssueType[]> {
    console.log('nous sommes dans getIssueTypes');
    return this.http.get<IssueType[]>(config.apiUrl + '/issueTypes');
  }







  getIssues(): Observable<Issue[]>{
    return this.http.get<Issue[]>(config.apiUrl + "/issues");
  }


}
