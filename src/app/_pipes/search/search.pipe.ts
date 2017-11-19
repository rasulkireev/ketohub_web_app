import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  private matchesRecipe = (recipe, keywords) => {
    // Concatenate all recipe words together, separating elements with single
    // spaces.
    let words = recipe.title;
    if (recipe.ingredients) {
      words += ' ' + recipe.ingredients.join(' ');
    }
    words = words.toLowerCase();

    // Search target string for each keyword.
    for (let i = 0; i < keywords.length; i += 1) {
      if (words.indexOf(keywords[i]) === -1) {
        return false;
      }
    }
    return true;
  }

  transform(recipes: any[], keywords: string[]): any {
    if (keywords == null) {
      return recipes;
    }

    const results = [];

    recipes.forEach((recipe) => {
      if (this.matchesRecipe(recipe, keywords)) {
        results.push(recipe);
      }
    });

    return results;
  }

}
