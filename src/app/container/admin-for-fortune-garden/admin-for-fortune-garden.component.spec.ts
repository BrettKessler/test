import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForFortuneGardenComponent } from './admin-for-fortune-garden.component';

describe('AdminForFortuneGardenComponent', () => {
  let component: AdminForFortuneGardenComponent;
  let fixture: ComponentFixture<AdminForFortuneGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminForFortuneGardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminForFortuneGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
