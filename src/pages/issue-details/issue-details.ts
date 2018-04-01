import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Issue} from "../../models/issue";
import {CommentRequest} from "../../models/comment-request";
import {NgForm} from "@angular/forms";
import {CommentProvider} from "../../providers/comment/comment";

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

  @ViewChild(NgForm)
  form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commentProvider : CommentProvider) {
    this.issue = this.navParams.data;
    this.commentRequest = new CommentRequest();
  }

  ionViewDidLoad() {
    this.commentProvider.getComments(this.issue.id).subscribe(comments =>{
      console.log(comments);
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

}
