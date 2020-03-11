import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikStarComponent } from './kwik-star.component';

describe('KwikStarComponent', () => {
  let component: KwikStarComponent;
  let fixture: ComponentFixture<KwikStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KwikStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
