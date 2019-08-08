import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ExpenseTrackerComponent } from './expense-tracker/expense-tracker.component';
import { HomeComponent } from './home/home.component';
import { InputFormComponent } from './input-form/input-form.component';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule'
  },
  {
    path: 'article',
    loadChildren: './article/article.module#ArticleModule'
  }, 
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'expense-tracker', 
    component: ExpenseTrackerComponent
  }, 
  {
    path: '**', 
    component: InputFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
