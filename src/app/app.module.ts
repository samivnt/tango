import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateIssuePage } from '../pages/create-issue/create-issue';
import { IssueListPage } from '../pages/issue-list/issue-list';
import { IssueDetailsPage } from '../pages/issue-details/issue-details';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import {IonTagsInputModule} from "ionic-tags-input";

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
import { GeolocalisationProvider } from '../providers/geolocalisation/geolocalisation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IssueProvider } from '../providers/issue/issue';
import {UserProvider} from "../providers/user/user";
import {CommentProvider} from "../providers/comment/comment";
import { HeaderColor } from '@ionic-native/header-color';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateIssuePage,
    IssueListPage,
    IssueDetailsPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LeafletModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    IonTagsInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateIssuePage,
    IssueListPage,
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
    GeolocalisationProvider,
    IssueProvider,
    UserProvider,
    CommentProvider,
    HeaderColor
  ]
})
export class AppModule {}
