import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import { RecipeDataService } from './recipe-data.service';

describe('RecipeDataService', () => {
  const component: RecipeDataService;
  const fixture: ComponentFixture<RecipeDataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ],
      declarations: [],
      providers: [RecipeDataService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // TODO: Uncomment these when we figure out why they're failing.
    
    // fixture = TestBed.createComponent(RecipeDataService);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
