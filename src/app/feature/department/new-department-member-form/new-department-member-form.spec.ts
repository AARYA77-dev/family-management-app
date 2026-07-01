import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepartmentMemberForm } from './new-department-member-form';

describe('NewDepartmentMemberForm', () => {
  let component: NewDepartmentMemberForm;
  let fixture: ComponentFixture<NewDepartmentMemberForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDepartmentMemberForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDepartmentMemberForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
