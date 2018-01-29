import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { RecipeDataService } from './recipe-data.service';
import { AngularFireDatabase } from 'angularfire2/database';

const mockData = [
  {
    key: "heyketomama-com_meatpie",
    payload: null,
    prevKey: null,
    type: 'value'
  },
  {
    key: "heyketomama-com_bacon",
    payload: null,
    prevKey: null,
    type: 'value'
  }
];
const angularFireDatabaseStub = {
  list: () => ({
    snapshotChanges: () => Observable.of(mockData)
  })
};

describe('RecipeDataService', () => {

  let service;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        RecipeDataService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub },
      ]
    });

    service = TestBed.get(RecipeDataService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return recipes', () => {
    service.recipes.subscribe(data => {
      expect(data).toEqual(mockData);
    })
  });
});
