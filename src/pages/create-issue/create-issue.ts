import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions  } from '@ionic-native/camera';
/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})
export class CreateIssuePage {

  pictureData: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private camera: Camera) {
  }

  takePicture() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then(pictureData => {
        this.pictureData = pictureData;
      }).catch(err => {
        console.warn(`Could not take picture because: ${err.message}`);
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateIssuePage');
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }

}
