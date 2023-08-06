import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySectionComponent } from './today-section.component';

describe('TodaySectionComponent', () => {
  let component: TodaySectionComponent;
  let fixture: ComponentFixture<TodaySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodaySectionComponent]
    });
    fixture = TestBed.createComponent(TodaySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
