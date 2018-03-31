import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

import { AlertController } from 'ionic-angular';

/**
 * Service to retrieve user's geolocalisation.
 */

var userLastPosition;


@Injectable()
export class GeolocalisationProvider {

    constructor(private geolocation: Geolocation, private alertCtrl: AlertController) {
        console.log('Hello from GeolocalisationProvider');
    }

    /**
     * If possible, gets the geolocalisation of the user and retrieve
     * his longitude and latitude.
     * 
     * Returns an observable that will emit the retrieved longitude and
     * latitude if the device allows us to get the Geolocalisation.
     */
    retrieveActualGeolocalisation(): Observable<Number[]>{
        console.log('in retrieveActualGeoloc');
        
        const geolocationPromise = this.geolocation.getCurrentPosition();
        
        // Promesse géolocation
        geolocationPromise.then(position => {
            console.log(position.coords);
            userLastPosition = position.coords;
            console.log(`User is at ${userLastPosition.longitude}, ${userLastPosition.latitude}`);
            let alert = this.alertCtrl.create({
                title: 'Vous avez été géolocalisé.',
                subTitle: `${userLastPosition.longitude}, ${userLastPosition.latitude}`,
                buttons: ['Okay']
            });
            alert.present();
            return userLastPosition;
        }).catch(err => {
            console.warn(`Could not retrieve user position because: ${err.message}`);
            return userLastPosition;
        });

        // Pendant que la promesse n'a pas aboutie, la position est à null.
        return userLastPosition = null;
    }

    retrieveLastRegisteredUserLocalisation(): Observable<number>{
        let alert = this.alertCtrl.create({
            title: 'Vous avez été géolocalisé.',
            subTitle: `${userLastPosition.longitude}, ${userLastPosition.latitude}`,
            buttons: ['Got it']
        });
        alert.present();
        return userLastPosition;
    }

    retrieveActualCoordinates(): Observable<Number[]>{
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
            return userLastPosition;
        }).catch(err => {
            console.warn(`Could not retrieve user position because: ${err.message}`);
            return userLastPosition;
        });

        // Pendant que la promesse n'a pas aboutie, la position est à null.
        return userLastPosition = null;
    }

}
