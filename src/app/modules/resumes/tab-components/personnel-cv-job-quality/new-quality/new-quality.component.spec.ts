import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQualityComponent } from './new-quality.component';

describe('NewQualityComponent', () => {
  let component: NewQualityComponent;
  let fixture: ComponentFixture<NewQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQualityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
