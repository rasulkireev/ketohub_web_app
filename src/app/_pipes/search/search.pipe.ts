import { Pipe, PipeTransform } from '@angular/core';
import { SearchParams } from '../../_classes/search-params';

@Pipe({
  name: 'search',
})

export class SearchPipe implements PipeTransform {

  transform(recipes: any[], searchParams: SearchParams): any {
    if (searchParams == null) {
      return recipes;
    }

    const results = [];

    recipes.forEach((recipe) => {
      if (recipeMatchesSearchParams(recipe, searchParams)) {
        results.push(recipe);
      }
    });

    return results;
  }

}

function recipeMatchesSearchParams(recipe: any, searchParams: SearchParams) {
  const searchTarget = searchTargetFromRecipe(recipe);

  if (!searchTargetContainsAllKeywords(searchTarget, searchParams.getKeywords())) {
    return false;
  }

  if (searchTargetContainsAnyExcludedTerm(searchTarget, searchParams.getExcludedTerms())) {
    return false;
  }

  return true;
}

function searchTargetFromRecipe(recipe: any) : string {
  // Concatenate all recipe words together, separating elements with single
  // pipe characters.
  let words = recipe.title;
  if (recipe.ingredients) {
    words += '|' + recipe.ingredients.join('|');
  }
  return words.toLowerCase();
}

function searchTargetContainsAllKeywords(searchTarget: string, keywords: string[]) : boolean {
  for (const keyword of keywords) {
    if (searchTarget.indexOf(keyword) === -1) {
      return false;
    }
  }
  return true;
}

function searchTargetContainsAnyExcludedTerm(searchTarget: string, excludedTerms: string[]) : boolean {
  for (const excludedTerm of excludedTerms) {
    if (searchTarget.indexOf(excludedTerm) !== -1) {
      return true;
    }
  }
  return false;
}
