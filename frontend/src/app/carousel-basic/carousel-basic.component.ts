import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css']
})

export class CarouselBasicComponent {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
}