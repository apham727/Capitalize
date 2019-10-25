import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


import { TransferService } from '../core';


@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  carouselImages = []
  package; // this will store the json response


  public expensesLabels = ['Hotel', 'Transportation', 'Flight', 'Food'];
  public expensesMappings = new Map();


  public hotels = 150;
  public transportation = 75;
  public flight = 200;
  public food = 50;



  public expensesData = [this.hotels, this.transportation, this.flight, this.food];
  public expensesType = 'pie';

    constructor(
    private route: ActivatedRoute,
      private http: HttpClient, 
      private transferService: TransferService) { }

  ngOnInit() {

    // this.http.get("assets/SampleResponse.json")
    // .subscribe(
    //   result => {
    //     // this.package = result[0]
    //     this.carouselImages.push(this.package["destinationphoto"])
    //     this.carouselImages.push(this.package["destinationphoto"])
    //     this.carouselImages.push(this.package["destinationphoto"])
        
    //   }
    // );

    var data = this.transferService.getData();       
    console.log("DATA IN ARTICLE");
    console.log(data);

    console.log("here")
    
    const urlParams = new URLSearchParams(window.location.search);
    const dest = urlParams.get('destination');

    console.log("DESITNATION IS " + dest)
    for (let pack in Object.keys(data)) {
      console.log("data pack access is " + data[pack]["destination"])
      console.log(pack)
      if (data[pack].destination == dest) {
          this.package = data[pack]
          break;
      }
    }
    this.flight = this.package["flight"]["cost"] 
    this.hotels = this.package.hotel.price 
    this.food = this.package.food.avgPrice

    this.carouselImages.push(this.package["destinationphoto"])
    this.carouselImages.push(this.package["destinationphoto"])
    this.carouselImages.push(this.package["destinationphoto"])
  }

}


