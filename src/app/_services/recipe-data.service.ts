import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeDataService {

  // Recipes as they appear in the database.
  private recipesRaw: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.recipesRaw = this.db.list('recipes').snapshotChanges();
  }

  public get recipes(): Observable<any[]> {
    return this.recipesRaw;
  }
}
