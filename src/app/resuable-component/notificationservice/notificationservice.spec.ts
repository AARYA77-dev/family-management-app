import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notificationservice } from './notificationservice';

describe('Notificationservice', () => {
  let component: Notificationservice;
  let fixture: ComponentFixture<Notificationservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notificationservice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Notificationservice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
