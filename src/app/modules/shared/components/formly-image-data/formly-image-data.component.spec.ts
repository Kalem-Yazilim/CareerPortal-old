import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyImageDataComponent } from './formly-image-data.component';

describe('FormlyImageDataComponent', () => {
  let component: FormlyImageDataComponent;
  let fixture: ComponentFixture<FormlyImageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyImageDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyImageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
