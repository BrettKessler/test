import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneFourtyOneComponent } from './one-fourty-one.component';

describe('OneFourtyOneComponent', () => {
  let component: OneFourtyOneComponent;
  let fixture: ComponentFixture<OneFourtyOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneFourtyOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneFourtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
