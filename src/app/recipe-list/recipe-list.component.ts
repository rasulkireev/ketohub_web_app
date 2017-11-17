import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
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

  recipes: any[] = [];

  currentCategory;

  keywordsRaw: string;
  keywords: string[];

  loaded = false;

  constructor(private db: AngularFireDatabase) {
    this.db.list('recipes').snapshotChanges().subscribe((entries) => {
      this.loaded = true;
      entries.forEach((entry) => {
        const recipe = entry.payload.val();
        recipe.thumbnailUrl = `https://storage.googleapis.com/ketohub/${entry.key}_thumbnail.jpg`;
        this.recipes.push(recipe);
      });
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
  }

  selectCategory(newCategory) {
    this.currentPage = 1;
    if (this.currentCategory !== newCategory) {
      this.currentCategory = newCategory;
    } else {
      this.currentCategory = null;
    }
  }

  getCategoryClass(category) {
    return this.currentCategory === category ? 'btn-primary' : 'btn-default';
  }

  filteredRecipes() {
    if (this.currentCategory) {
      return this.recipes.filter(recipe => recipe.category === this.currentCategory);
    }
    return this.recipes;
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
