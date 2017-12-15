import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './_components/about/about.component';
import { RecipeListComponent } from './_components/recipe-list/recipe-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: RecipeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
