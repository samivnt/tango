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
import { SignupPage } from '../pages/signup/signup';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { Geolocation } from '@ionic-native/geolocation';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Camera } from '@ionic-native/camera';
import { PictureProvider } from '../providers/picture/picture';
import {UserProvider, UserService} from "./providers/user/user";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateIssuePage,
    IssueListPage,
    IssueMapPage,
    IssueDetailsPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LeafletModule.forRoot()
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
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Geolocation,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true },
    Camera,
    PictureProvider,
    UserProvider
  ]
})
export class AppModule {}
