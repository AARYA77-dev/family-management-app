import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentFooter } from './department-footer';

describe('DepartmentFooter', () => {
  let component: DepartmentFooter;
  let fixture: ComponentFixture<DepartmentFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
