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
  issuesList : Issue[];
  //pour que le segment sélectionné par défaut soit all
  status = "all";
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

  segmentChanged($status){
    console.log("Cliqué sur " + $status);
    if($status === "all"){
      this.issueProvider.getIssues().subscribe(issues =>{
        this.issuesList = issues;
        console.log("Les issues de new : " + this.issuesList);
      }, err => {
        console.log(err);
      });
    }
    else{
      this.issueProvider.getIssuesFilteredByStatus($status).subscribe(issues =>{
        this.issuesList = issues;
        console.log("Les issues de autre chose que new : " + this.issuesList);
      }, err => {
        console.log(err);
      });
    }
  }

  goToThisIssue(issueADetailler : Issue){
    console.log("dans issue list, la issue sur laquelle on clique : " + issueADetailler);
    this.navCtrl.push(IssueDetailsPage, issueADetailler);
  }

}
