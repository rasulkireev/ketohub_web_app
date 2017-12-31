import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { SearchParams } from '../../_classes/search-params';
import { ArraySortPipe } from './../../_pipes/array-sort/array-sort.pipe';
import { SearchPipe } from './../../_pipes/search/search.pipe';
import { ParseSearchQueryPipe } from '../../_pipes/parse-search-query/parse-search-query.pipe';
import { recipesPerPage, maxPageButtons, recipeCategories } from '../../constants';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {

  currentPage: number = 1;
  pageSize: number = recipesPerPage;
  categories: string[] = recipeCategories;
  maxPageButtons: number = maxPageButtons;

  // Recipes as they appear in the database.
  private recipesRaw: any[] = [];
  // Recipes with filters and sorting applied.
  recipes: any[] = [];

  currentCategory: string;

  keywordsRaw: string;
  private searchParams: SearchParams;

  loaded: boolean = false;

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private arraySortPipe: ArraySortPipe,
    private searchPipe: SearchPipe,
    private parseSearchQuery: ParseSearchQueryPipe) {
    this.db.list('recipes').snapshotChanges().subscribe((entries) => {
      this.loaded = true;
      entries.forEach((entry) => {
        const recipe = entry.payload.val();
        recipe.thumbnailUrl = `https://storage.googleapis.com/ketohub/${entry.key}-680w.jpg`;
        this.recipesRaw.push(recipe);
      });
      this.filterRecipes();
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['q']) {
        this.keywordsRaw = params['q'];
        this.updateSearchParams(this.keywordsRaw);
      }

      if (params['category']) {
        this.currentCategory = params['category'];
        this.filterRecipes();
      }
    });
  }

  updateSearchParams(rawKeywords: string) {
    this.searchParams = this.parseSearchQuery.transform(rawKeywords);
    this.filterRecipes();
    this.http.get('/registerQuery?q=' + rawKeywords).subscribe(
      () => {},
      (error) => {
        console.log(error);
      },
      () => {},
    );
  }

  selectCategory(newCategory: string) {
    if (this.currentCategory !== newCategory) {
      this.currentCategory = newCategory;
    } else {
      this.currentCategory = null;
    }
    this.filterRecipes();
  }

  getCategoryClass(category: string) {
    return this.currentCategory === category ? 'btn-primary' : 'btn-default';
  }

  getKeywords() {
    return this.keywordsRaw == null ? null : this.searchParams.getKeywords();
  }

  private filterRecipes() {
    this.currentPage = 1;
    let recipes: any[] = [];
    if (this.currentCategory != null) {
      recipes = this.recipesRaw.filter(recipe => recipe.category === this.currentCategory);
    } else {
      recipes = this.recipesRaw;
    }
    recipes = this.searchPipe.transform(recipes, this.searchParams);
    recipes = this.arraySortPipe.transform(recipes, 'publishedTime');
    this.recipes = recipes;
  }
}
