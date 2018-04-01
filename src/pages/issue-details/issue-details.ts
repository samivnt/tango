import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Issue} from "../../models/issue";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.issue = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueDetailsPage');
  }

}
