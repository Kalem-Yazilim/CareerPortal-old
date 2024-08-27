import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReferansComponent } from './new-referans.component';

describe('NewReferansComponent', () => {
  let component: NewReferansComponent;
  let fixture: ComponentFixture<NewReferansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReferansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReferansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
