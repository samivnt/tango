import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CreateIssuePage } from '../pages/create-issue/create-issue';
import { IssueListPage } from '../pages/issue-list/issue-list';
import { IssueMapPage } from '../pages/issue-map/issue-map';
import { IssueDetailsPage } from '../pages/issue-details/issue-details';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateIssuePage,
    IssueListPage,
    IssueMapPage,
    IssueDetailsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateIssuePage,
    IssueListPage,
    IssueMapPage,
    IssueDetailsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true }
  ]
})
export class AppModule {}
