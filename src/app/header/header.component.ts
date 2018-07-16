import {Component, EventEmitter, Output} from '@angular/core';
import {Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() navSection = new EventEmitter<string>();

  constructor(private recipeService: RecipeService, private authService: AuthService) {}

  onNav(section: string) {
    this.navSection.emit(section);
  }

  onSave() {
    this.recipeService.saveRecipes().subscribe(
      (response: Response) => { console.log(response); }
    );
  }

  onLoad() {
    this.recipeService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
