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
    debugger
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
    var result = request.send(formData)

    // function listMatches(response) {
    //   debugger

    //   let match = JSON.parse(response);

    //   this.loading = false;
    //   this.matchesFound = true;
    //   form.reset();
    // }

    var $ctrl = this

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        // listMatches(request.response);

        debugger

      let match = JSON.parse(request.response);

      $ctrl.matches.push(match);

        $ctrl.loading = false;
        $ctrl.matchesFound = true;
        form.reset();
      }

      
    }
  }

  onClear() {
    this.matchForm.reset();
  }

}
