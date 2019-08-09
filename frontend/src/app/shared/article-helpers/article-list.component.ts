import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Article, ArticleListConfig, ArticlesService, TransferService } from '../../core';
@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent {
  constructor (
    private articlesService: ArticlesService,
    private transferService:TransferService,
    private http: HttpClient
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  // STORES THE PACKAGES LIST 
  packages;

  //other shit
  selectedCat;
  travelers;
  price;
  lat;
  lng;


  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    // this.loading = true;
    // this.results = [];

    // // Create limit and offset filter (if necessary)
    // if (this.limit) {
    //   this.query.filters.limit = this.limit;
    //   this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    // }

    // this.articlesService.query(this.query)
    // .subscribe(data => {
    //   this.loading = false;
    //   this.results = data.articles;

    //   // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
    //   this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    // });


    //Get values from queryParams
    const urlParams = new URLSearchParams(window.location.search);
    this.selectedCat = urlParams.get('category');
    this.travelers = urlParams.get('travelers');
    this.price = urlParams.get('maxPrice');
    this.lat = urlParams.get('lat');
    this.lng =  urlParams.get('lng');

    // LOGIC TO GENERATE ARTICLE LIST
    this.http.get("assets/Response.json")
    .subscribe(
      result => {
        this.packages = result
        this.transferService.setData(this.packages);
        console.log("packages");
        console.log(this.packages)
      }
    );

    console.log("GET REQUEST");
    console.log("localhost:3000?" + "category=" + this.selectedCat + "&budget=" + this.price + "&numPeople=" + this.travelers + "&location=Richmond,VA")
    this.http.get("localhost:3000?" + "category=" + this.selectedCat + "&budget=" + this.price + "&numPeople=" + this.travelers + "&location=Richmond,VA")
  }
}
