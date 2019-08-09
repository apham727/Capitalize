import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ExpenseTrackerComponent } from './expense-tracker/expense-tracker.component';
import { HomeComponent } from './home/home.component';
import { InputFormComponent } from './input-form/input-form.component';
import { ArticleComponent } from './article/article.component';
import { PackageComponent } from './package/package.component';

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
    path: 'package',
    component: PackageComponent
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
