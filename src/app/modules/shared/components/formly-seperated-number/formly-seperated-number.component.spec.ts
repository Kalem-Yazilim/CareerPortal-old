import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySeperatedNumberComponent } from './formly-seperated-number.component';

describe('FormlySeperatedNumberComponent', () => {
  let component: FormlySeperatedNumberComponent;
  let fixture: ComponentFixture<FormlySeperatedNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlySeperatedNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlySeperatedNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
