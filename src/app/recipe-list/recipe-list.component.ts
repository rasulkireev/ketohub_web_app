import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ArraySortPipe } from './../_pipes/array-sort/array-sort.pipe';
import { SearchPipe } from './../_pipes/search/search.pipe';
import { recipesPerPage, maxPageButtons, recipeCategories } from '../constants';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  currentPage = 1;
  pageSize = recipesPerPage;
  categories = recipeCategories;
  maxPageButtons = maxPageButtons;

  // Recipes as they appear in the database.
  private recipesRaw: any[] = [];
  // Recipes with filters and sorting applied.
  recipes: any[] = [];

  currentCategory: string;

  keywordsRaw: string;
  private keywords: string[];

  loaded = false;

  constructor(private db: AngularFireDatabase, private arraySortPipe: ArraySortPipe, private searchPipe: SearchPipe) {
    this.db.list('recipes').snapshotChanges().subscribe((entries) => {
      this.loaded = true;
      entries.forEach((entry) => {
        const recipe = entry.payload.val();
        recipe.thumbnailUrl = `https://storage.googleapis.com/ketohub/${entry.key}_thumbnail.jpg`;
        this.recipesRaw.push(recipe);
      });
      this.filterRecipes();
    });
  }

  ngOnInit() {
  }

  splitKeywords(newKeywords) {
    let words = newKeywords.toLowerCase().split(' ').filter(x => !!x);
    const deletions: number[] = [];

    // Find keywords that are contained in other keywords (e.g. "be" in "beef").
    for (let i = 0; i < words.length; i += 1) {
      for (let j = 0; j < words.length; j += 1) {
        if (i === j) {
          continue;
        }
        if (words[j].indexOf(words[i]) >= 0) {
          deletions.unshift(i);
          break;
        }
      }
    }

    // Delete keywords that other keywords contain.
    for (let i = 0; i < deletions.length; i += 1) {
      delete words[deletions[i]];
    }
    words = words.filter(x => !!x);

    this.keywords = words;
    this.filterRecipes();
  }

  selectCategory(newCategory) {
    if (this.currentCategory !== newCategory) {
      this.currentCategory = newCategory;
    } else {
      this.currentCategory = null;
    }
    this.filterRecipes();
  }

  getCategoryClass(category) {
    return this.currentCategory === category ? 'btn-primary' : 'btn-default';
  }

  private filterRecipes() {
    this.currentPage = 1;
    let recipes: any[] = [];
    if (this.currentCategory != null) {
      recipes = this.recipesRaw.filter(recipe => recipe.category === this.currentCategory);
    } else {
      recipes = this.recipesRaw;
    }
    recipes = this.searchPipe.transform(recipes, this.keywords);
    recipes = this.arraySortPipe.transform(recipes, 'publishedTime');
    this.recipes = recipes;
  }

  matchingIngredients(ingredients) {
    const matching: string[] = [];
    if (ingredients != null && this.keywords != null) {
      for (const ingredient of ingredients) {
        let match = false;
        for (const keyword of this.keywords) {
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
}
