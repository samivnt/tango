
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QimgImage } from '../../models/qimg-image';
import { PictureProvider } from '../../providers/picture/picture';
import { GeolocalisationProvider } from '../../providers/geolocalisation/geolocalisation';
import { AuthRequest } from '../../models/auth-request';
import { AuthProvider } from '../../providers/auth/auth';

import { AlertController } from 'ionic-angular';
import { VariableAst } from '@angular/compiler';

import { IssueUpload } from '../../models/issue-upload';
import { IssueProvider } from '../../providers/issue/issue';
import { IssueType } from '../../models/issue-type';

/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*---- Declarations Variables ----*/ 
var userLastPosition;
var coordonnees = new Array();

var variableTest = false;


@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})

export class CreateIssuePage {

  pictureData: string;
  picture: QimgImage;
  issueUpload: IssueUpload;
  public issueTypes: IssueType[];

  description: string;
  descriptionForm: FormGroup;

  @ViewChild(NgForm)
  form: NgForm;  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private camera: Camera,
              private pictureService: PictureProvider,
              private alertCtrl: AlertController,
              private geoLocalisationService: GeolocalisationProvider,
              private formBuilder: FormBuilder,
              private issueProvider: IssueProvider) {
                this.issueUpload = {
                  location: {
                    coordinates: [0, 0],
                    type: "Point"
                  },
                  description: '',
                  tags: [],
                  imageUrl: '',
                  issueTypeHref: ''
                };
              }

  /*---- FONCTIONS ----*/
  createIssue(form: NgForm) {
    if(form.valid){
      console.log(this.issueUpload); 
      console.log('dans la fonction pour créer l issue');
    } else {
      console.log('form non valide');
    }
  }

  ionViewDidLoad() {
    console.log('page loaded');
    console.log('ionViewDidLoad CreateIssuePage');
    
    // UserLastPosition mis à jour une fois la promesse du provider aboutie
    //userLastPosition = this.geoLocalisationService.retrieveActualGeolocalisation();
    
    const geolocationPromise = this.geolocation.getCurrentPosition();  
    
    // Promesse géolocation
    geolocationPromise.then(position => {
      console.log(position.coords.latitude);
      userLastPosition = position.coords;
      console.log(`User is at ${userLastPosition.longitude}, ${userLastPosition.latitude}`);
      let alert = this.alertCtrl.create({
          title: 'Vous avez été géolocalisé.',
          subTitle: `${userLastPosition.longitude}, ${userLastPosition.latitude}`,
          buttons: ['Okay']
      });
      alert.present();

      // Ajouter les coordonnées à l'issue
      this.issueUpload.location = {
        "type": "Point",
        "coordinates": [
          userLastPosition.longitude,
          userLastPosition.latitude
        ]
      };
      return userLastPosition;
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
      return userLastPosition;
    });

    this.getIssueTypes();

  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
    }, err => {
      console.warn('Could not take picture', err);
    });
  }

  getUserPosition(){
    let alert = this.alertCtrl.create({
      title: 'Vous avez été géolocalisé.',
      subTitle: `${userLastPosition.longitude}, ${userLastPosition.latitude}`,
      buttons: ['oooook']
    });
    alert.present();
    return userLastPosition;
  }

  providerTest() {
    var test = this.geoLocalisationService.retrieveLastRegisteredUserLocalisation();
    console.log(test);
  } 

  test(){
    variableTest = !variableTest;
    console.log(variableTest);
  }

  getIssueTypes(){
    console.log('kareeeeen');
   /*this.issueProvider.getIssueTypes().subscribe(issueTypes => {
      this.issueTypes = issueTypes;
      console.log(this.issueTypes);
    });*/
  }

}
