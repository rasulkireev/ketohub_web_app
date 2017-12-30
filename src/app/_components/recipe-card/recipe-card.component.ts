import { Component, OnInit, Input  } from '@angular/core';
import { SearchParams } from '../../_classes/search-params';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {

  @Input()
  recipe: any;

  @Input()
  searchKeywords: string[];

  matchingIngredients(ingredients: string[]) {
    const matching: string[] = [];
    if (ingredients != null && this.searchKeywords != null) {
      for (const ingredient of ingredients) {
        let match = false;
        for (const keyword of this.searchKeywords) {
          if (ingredient.toLowerCase().indexOf(keyword) !== -1) {
            match = true;
            break;
          }
        }
        if (match) {
          matching.push(ingredient);
        }
      }
    }
    return matching;
  }

  getCardClass() {
    return this.searchKeywords == null ? '' : 'tall-card';
  }
}
