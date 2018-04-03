import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Issue} from "../../models/issue";
import {CommentRequest} from "../../models/comment-request";
import {NgForm} from "@angular/forms";
import {CommentProvider} from "../../providers/comment/comment";
import {AuthProvider} from "../../providers/auth/auth";
import {User} from "../../models/user";
import {IssueProvider} from "../../providers/issue/issue";
import {ActionRequest} from "../../models/action-request";

/**
 * Generated class for the IssueDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-details',
  templateUrl: 'issue-details.html',
})
export class IssueDetailsPage {
  issue : Issue;
  commentRequest : CommentRequest;
  commentsList : Comment[];
  actionRequest : ActionRequest;

  user : User;

  @ViewChild(NgForm)
  form: NgForm;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public commentProvider : CommentProvider,
              private auth: AuthProvider,
              public issueProvider: IssueProvider) {
    this.issue = this.navParams.data;
    this.commentRequest = new CommentRequest();
    this.actionRequest = new ActionRequest();
    this.setUser();
  }

  setUser(){
    this.auth.getUser().subscribe(user =>{
      this.user = user;
    })
  }

  isStaff() : boolean{
    if(!this.auth.isAuthenticated()){
      console.log("Pas authentifié !");
      return false;
    }else{
      return (this.user.roles.indexOf("staff") > -1);
    }
  }

  ionViewDidLoad() {
    this.commentProvider.getComments(this.issue.id).subscribe(comments =>{
      console.log('Commentaires: ', comments);
      this.commentsList = comments;
    }, err => {
      console.log(err);
    });
    console.log('ionViewDidLoad IssueDetailsPage');
  }
  onSubmit($event) {
    this.postComment();
  }

  postComment(){
    this.commentProvider.postComment(this.commentRequest, this.issue.id).subscribe(comment =>{
      console.log(comment);
      this.navCtrl.push(IssueDetailsPage, this.issue);
    }, err => {
      console.log(err);
    });
  }

  setState(typeAction : string){
    this.actionRequest.type = typeAction;
    console.log(this.actionRequest.type);
    this.issueProvider.setState(this.actionRequest, this.issue.id).subscribe(action =>{
      console.log(action);
      this.navCtrl.push(IssueDetailsPage, this.issue);
    }, err => {
      console.log(err);
    });
  }

}
