import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsItKetoSearchComponent } from './is-it-keto-search.component';

describe('IsItKetoSearchComponent', () => {
  let component: IsItKetoSearchComponent;
  let fixture: ComponentFixture<IsItKetoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsItKetoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsItKetoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
