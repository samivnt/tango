
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { QimgImage } from '../../models/qimg-image';
import { PictureProvider } from '../../providers/picture/picture';

import { GeolocalisationProvider } from '../../providers/geolocalisation/geolocalisation';
import { AuthProvider } from '../../providers/auth/auth';

import { AlertController } from 'ionic-angular';

import { IssueRequest } from '../../models/issue-request';
import { IssueProvider } from '../../providers/issue/issue';
import { IssueType } from '../../models/issue-type';
import { User } from '../../models/user';

//import { Observable } from 'rxjs/Observable';
import { IssueTypeRequest } from '../../models/issue-type-request';

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
  public issueTypeRequest: IssueTypeRequest;
  public issueTypes: IssueType[];
  public profil: User;

  description: string;
  descriptionForm: FormGroup;

  user : User;

  @ViewChild(NgForm)
  form: NgForm;  

  tags = [];
  localite = 'an address';
  address = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private pictureService: PictureProvider,
              private alertCtrl: AlertController,
              private geoLocalisationService: GeolocalisationProvider,
              private issueProvider: IssueProvider,
              private auth: AuthProvider) {
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
                this.issueTypeRequest = {
                  name: '',
                  description: ''
                };
                this.setUser();
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
      this.uploadIssue();
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
    });
  }

  // Update IssueTypes
  updateIssueTypes(newIssueTypes){
    this.issueTypes = newIssueTypes;
    console.log(newIssueTypes);
  }

  // This being a staff option, we allowed us to reload the page after the add because losing a bit of ux isn't that much consequent.
  addIssueType(){
    console.log(this.issueTypeRequest);
    this.issueProvider.postIssueType(this.issueTypeRequest).subscribe(issueType => {
      console.log('issueType ajoutée');
    });
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  // This being a staff option, we allowed us to reload the page after the update because losing a bit of ux isn't that much consequent.
  // Showing the prompt to update de issue
  showPrompt(issueType) {
    let prompt = this.alertCtrl.create({
      title: 'Update the IssueType',
      subTitle: 'You\'re uptading issue type: ' + issueType.id,
      inputs: [
        {
          name: 'name',
          value: issueType.name,
          type: 'text'
        },
        {
          name: 'description',
          value: issueType.description,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log(data.name, data.description);
            this.issueTypeRequest.name = data.name;
            this.issueTypeRequest.description = data.description;
            console.log(issueType.id);
            this.issueProvider.updateIssueType(issueType.id, this.issueTypeRequest).subscribe(issueType =>{
              console.log('done, u need to reload the page');
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  // This being a staff option, we allowed us to reload the page after the deletion because losing a bit of ux isn't that much consequent.
  deleteIssueType(id){
    this.issueProvider.deleteIssueTypes(id).subscribe(id =>{
      console.log('issueType deleted');
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

  setUser(){
    this.auth.getUser().subscribe(user =>{
      this.user = user;
    })
  }

  isStaff() : boolean{
    if(!this.auth.isAuthenticated()){
      console.log("Pas authentifié !");
      return false;
    }else{
      return (this.user.roles.indexOf("staff") > -1);
    }
  }

}
