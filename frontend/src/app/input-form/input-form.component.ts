import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
    
    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log(`longitude: ${ lng } | latitude: ${ lat }`);
    }
 }

  public selectedCategory;
  public numTravelers;
  public budget;

  public executeSearch(){
    this.router.navigate(['/home']);
    console.log(this.location);

    // this.location.go("append");
  }

}
