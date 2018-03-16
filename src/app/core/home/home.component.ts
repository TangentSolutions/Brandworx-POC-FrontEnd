import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

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
  matches: MatchesModel[];
  private subscription: Subscription;

  constructor(private matchesService: MatchesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    debugger
    this.loading = true;
    const value = form.value;
    const matchToFind = new MatchesModel(
        value.image,
        value.store,
        value.locationLat,
        value.locationLong
    );
     
    this.matchesService.addMatch(matchToFind)
    .then(mtch => {
      // set loading as false
      // set matchesFound as true
      
        // console.log(mtch);
        // this.matches.push(mtch.match);
        this.matches = mtch;
    });
    form.reset();
  }

  onClear() {
    this.matchForm.reset();
  }

}
