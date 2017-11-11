import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { recipesPerPage, maxPageButtons, recipeCategories } from '../constants';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  currentPage = 1;
  pageSize = recipesPerPage;
  categories = recipeCategories;
  maxPageButtons = maxPageButtons;

  recipes: any[] = [];

  currentCategory;

  keywords;

  loaded = false;

  constructor(private db: AngularFireDatabase) {
    this.db.list('recipes').snapshotChanges().subscribe(entries => {
      this.loaded = true;
      entries.forEach(entry => {
        const recipe = entry.payload.val();
        recipe.thumbnailUrl = `https://storage.googleapis.com/ketohub/${entry.key}_thumbnail.jpg`;
        this.recipes.push(recipe);
      });
    });
  }

  ngOnInit() {
  }

  selectCategory(newCategory) {
    this.currentPage = 1;
    if (this.currentCategory !== newCategory) {
      this.currentCategory = newCategory;
    } else {
      this.currentCategory = null;
    }
  };

  getCategoryClass(category) {
    return this.currentCategory === category ? 'btn-primary' : 'btn-default';
  };

  filteredRecipes() {
    if (this.currentCategory) {
      return this.recipes.filter(recipe => recipe.category === this.currentCategory);
    } else {
      return this.recipes;
    }
  }

  matchingIngredients(ingredients, keywords) {
    const matching: string[] = [];
    if (ingredients && keywords) {
      for (const ingredient of ingredients) {
        let match = false;
        for (const keyword of keywords.split(' ')) {
          if (ingredient.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
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
