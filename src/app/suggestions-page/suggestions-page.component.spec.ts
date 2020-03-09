import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsPageComponent } from './suggestions-page.component';

describe('SuggestionsPageComponent', () => {
  let component: SuggestionsPageComponent;
  let fixture: ComponentFixture<SuggestionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
