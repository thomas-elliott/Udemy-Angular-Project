import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private http: Http) {}

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
    return this.http.put('https://.firebaseio.com/recipes.json', this.recipes);
  }

  fetchRecipes() {
    this.http.get('https://.firebaseio.com/recipes.json')
      .subscribe(
      (response: Response) => {
        this.recipes = (<Recipe[]>response.json());
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
