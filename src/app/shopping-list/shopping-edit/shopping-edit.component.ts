import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onClickAdd() {
    const ingredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);

    this.ingredientAdded.emit(ingredient);
  }
}
