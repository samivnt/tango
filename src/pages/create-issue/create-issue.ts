
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

import { IssueRequest } from '../../models/issue-request';
import { IssueProvider } from '../../providers/issue/issue';
import { IssueType } from '../../models/issue-type';
import { User } from '../../models/user';

import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*---- Declarations Variables ----*/ 
var userLastPosition;
var coordonnees = new Array();

@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})

export class CreateIssuePage {

  pictureData: string;
  picture: QimgImage;
  issueRequest: IssueRequest;
  public issueTypes: IssueType[];
  public profil: User;

  description: string;
  descriptionForm: FormGroup;

  @ViewChild(NgForm)
  form: NgForm;  

  tags = [];
  localite = 'an address';
  address = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private camera: Camera,
              private pictureService: PictureProvider,
              private alertCtrl: AlertController,
              private geoLocalisationService: GeolocalisationProvider,
              private formBuilder: FormBuilder,
              private issueProvider: IssueProvider,
              private auth: AuthProvider,) {
                this.issueRequest = {
                  location: {
                    coordinates: [0, 0],
                    type: "Point"
                  },
                  description: '',
                  tags: this.tags,
                  imageUrl: '',
                  issueTypeHref: ''
                };
              }

/*-------------- FONCTIONS --------------*/
  ionViewDidLoad() {
    console.log('page loaded');
    console.log('ionViewDidLoad CreateIssuePage');
    
    // UserLastPosition mis à jour une fois la promesse du provider aboutie
    //userLastPosition = this.geoLocalisationService.retrieveActualGeolocalisation();
    
    const geolocationPromise = this.geolocation.getCurrentPosition();  
    
    // Promesse géolocation
    geolocationPromise.then(position => {
      userLastPosition = position.coords;
      console.log(`User is at ${userLastPosition.longitude}, ${userLastPosition.latitude}`);
      let alert = this.alertCtrl.create({
          title: 'Vous avez été géolocalisé.',
          subTitle: `${userLastPosition.longitude}, ${userLastPosition.latitude}`,
          buttons: ['Okay']
      });
      alert.present();

      // Ajouter les coordonnées à l'issue
      this.issueRequest.location = {
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

    // Chercher les types d'issues sur l'API
    this.getIssueTypes();

  }

  createIssue(form: NgForm) {
    if(form.valid){
      // Récupération de l'utilisateur
      // On pourrait déjà le récupérer au chargement de la page pour un quelconque autre besoin
      this.getUser();

      console.log(this.issueRequest); 
      console.log('juste avant upload');
     // this.uploadIssue();
      console.log('juste après upload');
    } else {
      console.log('form non valide');
    }
  }

  // Upload de l'issue
  uploadIssue(){
    this.issueProvider.postIssue(this.issueRequest).subscribe(issue => {
      console.log('issue ajoutée');
    });
  }

  // Prendre une photo et l'uploader
  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.issueRequest.imageUrl = picture.url;
    }, err => {
      console.warn('Could not take picture', err);
    });
  }

  // Récupérer la position enregistrée du user
  getUserPosition(){
    let alert = this.alertCtrl.create({
      title: 'Vous avez été géolocalisé.',
      subTitle: `${userLastPosition.longitude}, ${userLastPosition.latitude}`,
      buttons: ['oooook']
    });
    alert.present();
    return userLastPosition;
  }

  // FAIRE LA FONCTION POUR METTRE A JOUR LA POSITION GPS!!!
  miseAJourPosition() {
    console.log(this.geoLocalisationService.retrieveActualCoordinates());
  } 

  // Recupéraiton des types d'issues dans l'API
  getIssueTypes(){
    this.issueProvider.getIssueTypes().subscribe(issueTypes => {
      this.issueTypes = issueTypes;
      console.log(this.issueTypes);
    });
  }

  // Récupération de l'utilisateur 
  // ----> Est-ce qu'on devrait pas le mettre dans le provider de user??
  getUser(){
    this.auth.getUser().subscribe(user => {
      this.profil = user;
    }, err => {
      console.warn('Could not get user authentification', err);
    });
  }

}
