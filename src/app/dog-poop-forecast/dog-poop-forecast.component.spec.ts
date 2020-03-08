import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogPoopForecastComponent } from './dog-poop-forecast.component';

describe('DogPoopForecastComponent', () => {
  let component: DogPoopForecastComponent;
  let fixture: ComponentFixture<DogPoopForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogPoopForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogPoopForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
