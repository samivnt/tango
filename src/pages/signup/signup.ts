import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';


import { AuthRequest } from '../../models/auth-request';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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

  constructor(private auth: AuthProvider, private navCtrl: NavController, public navParams: NavParams) {
        this.authRequest = new AuthRequest();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit($event) {

  // Prevent default HTML form behavior.
  $event.preventDefault();

  // Do not do anything if the form is invalid.
  if (this.form.invalid) {
    return;
  }

  // Hide any previous login error.
  this.loginError = false;

  // Perform the authentication request to the API.
  this.auth.logIn(this.authRequest).subscribe(undefined, err => {
    this.loginError = true;
    console.warn(`Authentication failed: ${err.message}`);
  });
}

}
