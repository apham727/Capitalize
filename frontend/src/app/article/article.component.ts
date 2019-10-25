import { Component, OnInit, PACKAGE_ROOT_URL } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import {
  Article,
  ArticlesService,
  Comment,
  CommentsService,
  User,
  UserService, 
  TransferService
} from '../core';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html', 
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  carouselImages = []
  package; // this will store the json response
  
  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private transferService:TransferService,

  ) { }
    public imagesUrl;


  ngOnInit() {
    // this.imagesUrl = [
    //   'http://www.telegraph.co.uk/content/dam/motoring2/2015/12/07/01-Kia-Sportage-front-xlarge_trans_NvBQzQNjv4BqrWYeUU_H0zBKyvljOo6zlkYMapKPjdhyLnv9ax6_too.jpg',
    //   'http://www.telegraph.co.uk/cars/images/2017/01/24/A5-Sportback-main-xlarge_trans_NvBQzQNjv4BqZR6q1BRVjLLZ5nciTmZ6ABYYy2HF4Csw_oYIEcbI_AA.jpg',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPopqXeuO7fqot51N7vaZuh9EqBYgZkLexcmQ_A0Fy0CjjW6J',
    //   'https://www.cars.co.za/carimages_gen/Audi-TT/Audi-TT-coupe-1.8TFSI_AudiTT3c6l.jpg',
    //   'http://comicsalliance.com/files/2011/04/strips02.jpg',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4HTtZrfKqNo5riVYiOBBL7-9laaPZcW1RfDfYGvb6BezfMtQ',
    //   'https://s-media-cache-ak0.pinimg.com/originals/73/f3/08/73f30861d214eea1d6c5d99fe72b3053.jpg',
    //   'https://bmj2k.files.wordpress.com/2011/04/heroes.jpg'
    // ];


    // this.http.get("assets/SampleResponse.json")
    //   .subscribe(
    //     result => {
    //       this.package = result[0]
    //       this.carouselImages.push(this.package["destinationphoto"])
    //       this.carouselImages.push(this.package["destinationphoto"])
    //       this.carouselImages.push(this.package["destinationphoto"])
          
    //     }
    //   );

      
      
  }

}
