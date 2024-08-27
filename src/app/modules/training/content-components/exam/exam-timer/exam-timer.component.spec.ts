import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTimerComponent } from './exam-timer.component';

describe('ExamTimerComponent', () => {
  let component: ExamTimerComponent;
  let fixture: ComponentFixture<ExamTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
