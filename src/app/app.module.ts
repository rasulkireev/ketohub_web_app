// Angular
import { BrowserModule, BrowserTransferStateModule , Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Environment
import { environment } from '../environments/environment';

// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// TEMP DISABLE AS BREAKS SSR https://github.com/ng-bootstrap/ng-bootstrap/issues/858
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './_components/footer/footer.component';
import { NavComponent } from './_components/nav/nav.component';
import { MailingListComponent } from './_components/mailing-list/mailing-list.component';
import { RecipeListComponent } from './_components/recipe-list/recipe-list.component';
import { RecipeCardComponent } from './_components/recipe-card/recipe-card.component';
import { InputDebounceComponent } from './_components/debounced-input/debounced-input.component';

// Pipes
import { TimeSincePipe } from './_pipes/time-since/time-since.pipe';
import { RootDomainPipe } from './_pipes/root-domain/root-domain.pipe';
import { SearchPipe } from './_pipes/search/search.pipe';
import { RangePipe } from './_pipes/range/range.pipe';
import { CapitalizePipe } from './_pipes/capitalize/capitalize.pipe';
import { ArraySortPipe } from './_pipes/array-sort/array-sort.pipe';
import { HighlightedResultPipe } from './_pipes/highlighted-result/highlighted-result.pipe';
import { ParseSearchQueryPipe } from './_pipes/parse-search-query/parse-search-query.pipe';
// TEMP - dont use service right now
// import { RecipeDataService } from 'app/_services/recipe-data.service';
import { QueryParamService } from 'app/_services/query-param.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MailingListComponent,
    RecipeListComponent,
    RecipeCardComponent,
    InputDebounceComponent,
    TimeSincePipe,
    RootDomainPipe,
    SearchPipe,
    RangePipe,
    CapitalizePipe,
    ArraySortPipe,
    HighlightedResultPipe,
    FooterComponent,
    ParseSearchQueryPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ketohub' }),
    BrowserTransferStateModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,

    // TEMP DISABLE AS BREAKS SSR https://github.com/ng-bootstrap/ng-bootstrap/issues/858
    // NgbModule.forRoot(),
  ],
  providers: [Title, ArraySortPipe, SearchPipe, ParseSearchQueryPipe, QueryParamService],
  bootstrap: [AppComponent],
})
export class AppModule { }
