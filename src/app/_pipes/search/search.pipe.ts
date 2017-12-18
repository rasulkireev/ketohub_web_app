import { Pipe, PipeTransform } from '@angular/core';
import { SearchParams } from 'app/_classes/search-params';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  private matchesRecipe = (recipe: any, searchParams: SearchParams) => {
    // Concatenate all recipe words together, separating elements with single
    // spaces.
    let words = recipe.title;
    if (recipe.ingredients) {
      words += ' ' + recipe.ingredients.join(' ');
    }
    words = words.toLowerCase();

    // Search target string for each keyword.
    for (const keyword of searchParams.getKeywords()) {
      if (words.indexOf(keyword) === -1) {
        return false;
      }
    }
    return true;
  }

  transform(recipes: any[], searchParams: SearchParams): any {
    if (searchParams == null) {
      return recipes;
    }

    const results = [];

    recipes.forEach((recipe) => {
      if (this.matchesRecipe(recipe, searchParams)) {
        results.push(recipe);
      }
    });

    return results;
  }

}
