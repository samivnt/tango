import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


import {AuthRequest} from '../../models/auth-request';
import {AuthProvider} from '../../providers/auth/auth';
import {HomePage} from '../home/home';
import {LoginPage} from "../login/login";

import {UserRequest} from "../../models/user-request";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;
  userRequest: UserRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  /**
   * The login form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(
      private auth: AuthProvider,
      private navCtrl: NavController,
      public navParams: NavParams,
      public userProvider : UserProvider
  ) {
    this.authRequest = new AuthRequest();
    this.userRequest = new UserRequest();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit($event) {
    this.userRequest.roles = ['citizen'];
    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    this.authRequest = {name:this.userRequest.name, password:this.userRequest.password};

    this.postUser();

  }
  postUser(){
    this.userProvider.postUser(this.userRequest).subscribe(user => {
      console.log(user);
      this.auth.logIn(this.authRequest).subscribe(user => {
        console.log(user);
      }, err => {
        console.log(err);
      });
    }, err => {
      console.warn('Could not create the user: ${err.message}');
    });
  }

}
