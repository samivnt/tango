import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { CreateIssuePage } from '../pages/create-issue/create-issue';
import { IssueListPage } from '../pages/issue-list/issue-list';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../app/config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(private auth: AuthProvider,
    public httpClient: HttpClient,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private menu: MenuController) {

      this.menu.enable(false);

      this.auth.isAuthenticated().subscribe(authenticated => {
       if (authenticated) {
        this.rootPage = HomePage;
       } else {
        this.rootPage = LoginPage;
       }
     });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Issues Map', component: HomePage },
      { title: 'Issues List', component: IssueListPage },
      { title: 'Issue Creation', component: CreateIssuePage },/*
      { title: 'IssueDetails', component: IssueDetailsPage },
      { title: 'Signup', component: SignupPage }*/
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#e96525');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateIssuePage');

    // TODO: replace the hardcoded API URL by the one from the configuration.
    const url = `${config.apiUrl}/issueTypes`;
    this.httpClient.get(url).subscribe(issueTypes => {
      console.log('Issue types loaded', issueTypes);
    });
  }

  logOut() {
    this.auth.logOut();
  }
}
