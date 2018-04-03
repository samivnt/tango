import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {NgForm} from '@angular/forms';

import {AuthRequest} from '../../models/auth-request';
import {AuthProvider} from '../../providers/auth/auth';

import {UserRequest} from "../../models/user-request";
import {UserProvider} from "../../providers/user/user";

import { ToastController } from 'ionic-angular';
import { User } from "../../models/user";

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

  profil: User;

  constructor(
      private auth: AuthProvider,
      public navParams: NavParams,
      public userProvider : UserProvider,
      public toastCtrl: ToastController
  ) {
    this.authRequest = new AuthRequest();
    this.userRequest = new UserRequest();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.getUser();
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
        this.presentToast();
      }, err => {
        console.log(err);
      });
    }, err => {
      console.warn('Could not create the user: ${err.message}');
    });
  }

  getUser(){
    this.auth.getUser().subscribe(user =>{
    this.profil = user;
    console.log(this.profil);
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Welcome '.concat(this.userRequest.name),
      duration: 2500,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'X',
      dismissOnPageChange: false,
      cssClass: "toast",
    });
    toast.present();
  }
}
