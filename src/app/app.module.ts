// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Environment
import { environment } from '../environments/environment';

// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PaginationModule } from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { NavComponent } from './_components/nav/nav.component';
import { MailingListComponent } from './mailing-list/mailing-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

// Pipes
import { TimeSincePipe } from './_pipes/time-since/time-since.pipe';
import { RootDomainPipe } from './_pipes/root-domain/root-domain.pipe';
import { SearchPipe } from './_pipes/search/search.pipe';
import { RangePipe } from './_pipes/range/range.pipe';
import { CapitalizePipe } from './_pipes/capitalize/capitalize.pipe';
import { ArraySortPipe } from './_pipes/array-sort/array-sort.pipe';
import { HighlightedResultPipe } from './_pipes/highlighted-result/highlighted-result.pipe';
import { FooterComponent } from './_components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MailingListComponent,
    RecipeListComponent,
    TimeSincePipe,
    RootDomainPipe,
    SearchPipe,
    RangePipe,
    CapitalizePipe,
    ArraySortPipe,
    HighlightedResultPipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,

    PaginationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
