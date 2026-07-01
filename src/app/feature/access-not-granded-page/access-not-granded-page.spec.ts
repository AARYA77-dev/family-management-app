import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessNotGrandedPage } from './access-not-granded-page';

describe('AccessNotGrandedPage', () => {
  let component: AccessNotGrandedPage;
  let fixture: ComponentFixture<AccessNotGrandedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessNotGrandedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessNotGrandedPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
