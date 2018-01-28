import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from 'angularfire2/database';

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
