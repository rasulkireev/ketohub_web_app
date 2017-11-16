import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  private matchesRecipe = (recipe, keywords) => {
    let words = recipe.title.toLowerCase();
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient) => {
        words += ingredient.toLowerCase();
      });
    }
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
