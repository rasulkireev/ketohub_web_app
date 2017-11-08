import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  private matchesRecipe = (recipe, keywords) => {
    let words = recipe.title.toLowerCase();
    recipe.ingredients && recipe.ingredients.forEach(ingredient => {
      words += ingredient.toLowerCase();
    });
    for (let i = 0; i < keywords.length; i++) {
      if (words.indexOf(keywords[i].toLowerCase()) === -1) {
        return false;
      }
    }
    return true;
  };

  transform(recipes: any[], keywords?: any): any {
    if (!keywords) {
      return recipes;
    }

    const results = [];

    recipes.forEach(recipe => {
      if (this.matchesRecipe(recipe, keywords.split(/\s+/))) {
        results.push(recipe);
      }
    });

    return results;
  }

}
