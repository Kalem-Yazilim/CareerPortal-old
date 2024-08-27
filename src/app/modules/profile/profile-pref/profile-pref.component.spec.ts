import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePrefComponent } from './profile-pref.component';

describe('ProfilePrefComponent', () => {
  let component: ProfilePrefComponent;
  let fixture: ComponentFixture<ProfilePrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePrefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
