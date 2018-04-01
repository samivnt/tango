import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {User} from "../../models/user";
import {config} from "../../app/config";
import {UserRequest} from "../../models/user-request";
import {CommentRequest} from "../../models/comment-request";

/*
  Generated class for the UserProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {

  constructor(public http: HttpClient) {
  }

  getComments(issueID : string): Observable<Comment[]>{
    return this.http.get<Comment[]>(config.apiUrl + "/issues/" + issueID + "/comments");
  }

  postComment(commentRequest: CommentRequest, issueID : string): Observable<Comment> {
    return this.http.post<Comment>(config.apiUrl + "/issues/" +  issueID + "/comments", commentRequest).pipe();
  }

}
