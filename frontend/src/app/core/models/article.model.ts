import { Profile } from './profile.model';

export interface Article {
  slug: string;
  title: string; // important
  description: string; // important
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
