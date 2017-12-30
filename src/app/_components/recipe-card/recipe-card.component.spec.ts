import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardComponent } from './recipe-card.component';

import { HighlightedResultPipe } from '../../_pipes/highlighted-result/highlighted-result.pipe';
import { CapitalizePipe } from '../../_pipes/capitalize/capitalize.pipe';
import { TimeSincePipe } from '../../_pipes/time-since/time-since.pipe';
import { RootDomainPipe } from '../../_pipes/root-domain/root-domain.pipe';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCardComponent, HighlightedResultPipe, CapitalizePipe, TimeSincePipe, RootDomainPipe],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
