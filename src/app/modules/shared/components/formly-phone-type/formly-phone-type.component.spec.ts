import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyPhoneTypeComponent } from './formly-phone-type.component';

describe('FormlyPhoneTypeComponent', () => {
  let component: FormlyPhoneTypeComponent;
  let fixture: ComponentFixture<FormlyPhoneTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyPhoneTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyPhoneTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
