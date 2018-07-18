import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private recipes: Recipe[] = [
    new Recipe('Test Recipe', ' A test recipe', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [
        new Ingredient('Prawns', 10),
        new Ingredient('Salad', 1)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  recipeChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }

  saveRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://ng-recipe-book-b919c.firebaseio.com/recipes.json?auth=' + token, this.recipes);
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-b919c.firebaseio.com/recipes.json?auth=' + token)
      .subscribe(
      (response) => {
        this.recipes = response;
        this.recipeChanged();
      }
    );
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged();
  }
}
