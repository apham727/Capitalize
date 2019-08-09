import { Profile } from './profile.model';

export interface Article {
  slug: string;
  title: string; // important
  description: string; // important
  destination: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  price: number;
  author: Profile;
  destinationphoto: string;
}
