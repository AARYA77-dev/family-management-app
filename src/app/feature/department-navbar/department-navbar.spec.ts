import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentNavbar } from './department-navbar';

describe('DepartmentNavbar', () => {
  let component: DepartmentNavbar;
  let fixture: ComponentFixture<DepartmentNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
