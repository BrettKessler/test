import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsOpenComponent } from './is-open.component';

describe('IsOpenComponent', () => {
  let component: IsOpenComponent;
  let fixture: ComponentFixture<IsOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
