import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
