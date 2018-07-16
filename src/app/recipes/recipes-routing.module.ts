import {NgModule} from '@angular/core';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeIndexComponent} from './recipe-index/recipe-index.component';
import {RouterModule, Routes} from '@angular/router';

const recipeRoutes: Routes = [
  { path: '', component: RecipesComponent, children: [
    { path: '', component: RecipeIndexComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
