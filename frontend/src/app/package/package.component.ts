import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  carouselImages = []
  package; // this will store the json response

    constructor(
      private http: HttpClient) { }

  ngOnInit() {

    this.http.get("assets/SampleResponse.json")
    .subscribe(
      result => {
        this.package = result[0]
        this.carouselImages.push(this.package["destination-photo"])
        this.carouselImages.push(this.package["destination-photo"])
        this.carouselImages.push(this.package["destination-photo"])
        
      }
    );
  }

}


