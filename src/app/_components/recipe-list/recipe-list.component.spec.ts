import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../../environments/environment';

import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeListComponent } from './recipe-list.component';
import { RangePipe } from '../../_pipes/range/range.pipe';
import { HighlightedResultPipe } from '../../_pipes/highlighted-result/highlighted-result.pipe';
import { RootDomainPipe } from '../../_pipes/root-domain/root-domain.pipe';
import { TimeSincePipe } from '../../_pipes/time-since/time-since.pipe';
import { CapitalizePipe } from '../../_pipes/capitalize/capitalize.pipe';
import { ArraySortPipe } from '../../_pipes/array-sort/array-sort.pipe';
import { SearchPipe } from '../../_pipes/search/search.pipe';
import { ParseSearchQueryPipe } from '../../_pipes/parse-search-query/parse-search-query.pipe';
import { RecipeDataService } from '../../_services/recipe-data.service';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ],
      declarations: [
        RecipeListComponent,
        RecipeCardComponent,
        RangePipe,
        HighlightedResultPipe,
        RootDomainPipe,
        TimeSincePipe,
        CapitalizePipe,
      ],
      providers: [RecipeDataService, ArraySortPipe, SearchPipe, ParseSearchQueryPipe],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
