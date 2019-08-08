import { Component, Input } from '@angular/core';
import { SliderModule } from 'angular-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Article } from '../../core';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
})



export class ArticlePreviewComponent {
  public imagesUrl;
  @Input() article: Article;
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;
    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }
}
