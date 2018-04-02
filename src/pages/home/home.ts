import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

import {Issue} from "../../models/issue";
import {IssueProvider} from "../../providers/issue/issue";
import {CreateIssuePage} from "../create-issue/create-issue";
import {IssueDetailsPage} from "../issue-details/issue-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public issues: Issue[];
  map: Map;
  mapOptions: MapOptions;
  mapMarkers: Marker[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public issueProvider: IssueProvider) {
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = { maxZoom: 18 };
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });
  }

  ionViewDidLoad() {
    //Récuperation des issues et création des markers
    this.issueProvider.getIssues().subscribe(issues => {
      this.issues = issues;
      this.issues.forEach(issue =>{
        this.generateMarker(issue).addTo(this.map);
      })
    });

    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;

    /*  this.localisation = new Marker([coords.latitude, coords.longitude]);
      this.localisation.addTo(this.map);*/
      this.map.setView([coords.latitude, coords.longitude], 14);

      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }

  generateMarker(issue: Issue){
  /*  var myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });*/
    return marker([issue.location.coordinates[1],issue.location.coordinates[0]]).bindTooltip(issue.description).on('click',()=>{
      console.log(issue.id);
      this.navCtrl.push(IssueDetailsPage, issue);

    });
  }

  goToCreateIssue(){
    this.navCtrl.push(CreateIssuePage);
  }

}
