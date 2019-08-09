import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../shared';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  
  private lng: number;
  private lat: number;

  constructor(private location: Location, private router: Router) { 
     this.lng = 20;
     this.lat = 20;
  }
  
  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currentPosition => {
        console.log('currentPosition', currentPosition);
        this.lng = currentPosition.coords.longitude;
        this.lat = currentPosition.coords.latitude;
      })
    }
    console.log(`longitude: ${ this.lng } | latitude: ${ this.lat }`);
 }

  public selectedCategory;
  public numTravelers;
  public budget;

  public executeSearch(){
    this.router.navigate(['/home'], { queryParams: { category: this.selectedCategory, travelers: this.numTravelers, maxPrice: this.budget, lng: this.lng, lat: this.lat} });
  }
}
