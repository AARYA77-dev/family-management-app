import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comfirmdialog } from './comfirmdialog';

describe('Comfirmdialog', () => {
  let component: Comfirmdialog;
  let fixture: ComponentFixture<Comfirmdialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comfirmdialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comfirmdialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
