import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Issue} from "../../models/issue";
import {IssueProvider} from "../../providers/issue/issue";
import {IssueDetailsPage} from "../issue-details/issue-details";

/**
 * Generated class for the IssueListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-list',
  templateUrl: 'issue-list.html',
})
export class IssueListPage {
  issue : Issue;
  issuesList : Issue[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public issueProvider : IssueProvider) {
  }

  ionViewDidLoad() {
    this.issueProvider.getIssues().subscribe(issues =>{
      console.log(issues);
      this.issuesList = issues;
    }, err => {
      console.log(err);
    });
    console.log('ionViewDidLoad IssueListPage');

  }

  goToThisIssue(issueADetailler : Issue){
    console.log("dans issue list, la issue sur laquelle on clique : " + issueADetailler);
    this.navCtrl.push(IssueDetailsPage, issueADetailler);
  }

}
