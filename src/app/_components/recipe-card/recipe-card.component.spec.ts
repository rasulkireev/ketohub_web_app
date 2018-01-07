import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardComponent } from './recipe-card.component';

import { HighlightedResultPipe } from '../../_pipes/highlighted-result/highlighted-result.pipe';
import { CapitalizePipe } from '../../_pipes/capitalize/capitalize.pipe';
import { TimeSincePipe } from '../../_pipes/time-since/time-since.pipe';
import { RootDomainPipe } from '../../_pipes/root-domain/root-domain.pipe';

const recipe = {
  category: 'entree',
  defaultThumbnailUrl: 'https://storage.googleapis.com/ketohub-gcs1/ruled-me_keto-tuna-casserole-680w.jpg',
  ingredients: ['butter', 'carrots'],
  mainImage: 'https://cdn.ruled.me/wp-content/uploads/2017/11/tuna-casserole-featured.jpg',
  publishedTime: '2017-12-21T12:00:54+00:00',
  thumbnailUrls: 'https://storage.googleapis.com/ketohub-gcs1/ruled-me_keto-tuna-casserole-680w.jpg 680w, https://storage.googleapis.com/ketohub-gcs1/ruled-me_keto-tuna-casserole-560w.jpg 560w, https://storage.googleapis.com/ketohub-gcs1/ruled-me_keto-tuna-casserole-340w.jpg 340w',
  title: 'Keto Tuna Casserole',
  url: 'https://www.ruled.me/keto-tuna-casserole/'
};

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

    component.recipe = recipe;
    component.searchKeywords = null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
