import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './403.component.html',
  styleUrls: ['./404.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class P403Component {

  location: Location;

  constructor(location: Location) {
    this.location = location;
  }

}
