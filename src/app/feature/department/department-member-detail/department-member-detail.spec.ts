import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentMemberDetail } from './department-member-detail';

describe('DepartmentMemberDetail', () => {
  let component: DepartmentMemberDetail;
  let fixture: ComponentFixture<DepartmentMemberDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentMemberDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentMemberDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
