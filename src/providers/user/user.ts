import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {User} from "../../models/user";
import {config} from "../../app/config";
import {UserRequest} from "../../models/user-request";

/*
  Generated class for the UserProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(config.apiUrl + "/users");
  }

  getUser(id : string): Observable<User>{
    return this.http.get<User>(config.apiUrl + "/users/" + id);
  }

  postUser(userRequest: UserRequest): Observable<User> {
    return this.http.post<User>(config.apiUrl + "/users", userRequest).pipe();
  }

}
