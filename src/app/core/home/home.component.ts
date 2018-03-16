import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { TabsModule } from "ngx-tabs";

import { MatchesModel } from '../../shared/matches.model';
import { MatchesService } from '../../shared/matches.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('matchForm') matchForm: NgForm;
  loading: boolean = false;
  matchesFound: boolean = false;
  needMatch:boolean = true;
  matchToFind: any = {};
  matches: any = [];

  private subscription: Subscription;

  constructor(private matchesService: MatchesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    this.loading = true;
    this.matchesFound = false;

    const value = form.value;

    const imageInput = <HTMLInputElement>document.getElementById('file-input');
    var formData = new FormData();
    formData.append('name', value.store);
    formData.append('latitude', value.locationLat);
    formData.append('longitude', value.locationLong);
    for(var file in imageInput.files) {
      var fileValue = imageInput.files[file];
      formData.append('images[]', fileValue)
    }
    var request = new XMLHttpRequest();
    request.open('POST', 'http://52.178.178.111/api/outlet');
    var result = request.send(formData);

    // function listMatches(response) {
    //   debugger

    //   let match = JSON.parse(response);

    //   this.loading = false;
    //   this.matchesFound = true;
    //   form.reset();
    // }

    var $ctrl = this;

    let resp = [{

      "name": 'Rawr',
      "lat": 123.0,
      "lon": 123.0,
      "image": "https://www.mawmobile.co.za/Brandworx_RPM_Console/MAW_Report_ExportPhoto_View.aspx?FC=MAW_866&SC=S1&SI=1512278158304_Memory%20Goora",
      "probability": 90
    },
    {

      "name": 'Rawr',
      "lat": 123.0,
      "lon": 123.0,
      "image": "https://www.mawmobile.co.za/Brandworx_RPM_Console/MAW_Report_ExportPhoto_View.aspx?FC=MAW_866&SC=S1&SI=1512278158304_Memory%20Goora",
      "probability": 90
    }
 ];

    $ctrl.matches = resp;

        $ctrl.loading = false;
        $ctrl.matchesFound = true;
        form.reset();

    // request.onreadystatechange = function() {
    //   if (request.readyState === 4) {
    //     // listMatches(request.response);

    //     debugger

    //     console.log(request.response);
    //   let match = JSON.parse(request.response);

    //   $ctrl.matches.push(match);

    //     $ctrl.loading = false;
    //     $ctrl.matchesFound = true;
    //     form.reset();
    //   }

      
    // }
  }

  onClear() {
    this.matchForm.reset();
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

}
