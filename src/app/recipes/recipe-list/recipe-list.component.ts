import {Component, EventEmitter, Output} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeRelay = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test Recipe', ' A test recipe', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];

  onRelayRecipe(recipe: Recipe) {
    this.recipeRelay.emit(recipe);
  }
}
