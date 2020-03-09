import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McdonaldsComponent } from './mcdonalds.component';

describe('McdonaldsComponent', () => {
  let component: McdonaldsComponent;
  let fixture: ComponentFixture<McdonaldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McdonaldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McdonaldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
