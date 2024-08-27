import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss'],
})
export class NewApplicationComponent implements OnInit {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    birthDate: [''],
    contact: this.fb.group({
      email: ['', Validators.email],
      telephone: ['', Validators.pattern('[- +()0-9]+')],
    }),
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.fb.array([this.fb.control('')]),
  });

  get aliases() {
    return this.form.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder, private router:Router) {}
  ngOnInit(): void {
    this.updateProfile();
  }

  updateProfile() {
    this.form.patchValue({
      firstName: 'Kalem',
      lastName: 'Yazılım',
      birthDate: '1989-01-01',
      contact: {
        email: 'destek@kalemyazilim.com',
        telephone: '+90500000000',
      },
      address: {
        city: 'İstanbul',
      },
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
    this.router.navigateByUrl('applications');
  }
}
