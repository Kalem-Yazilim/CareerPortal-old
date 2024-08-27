import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbDropdownModule,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ODataModule } from 'angular-odata';
import { NgChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { FooterComponent } from './components/footer/footer.component';
import { GridComponent } from './components/grid/grid.component';
import { DevMenuComponent } from './components/nav/dev-menu/dev-menu.component';
import { MenuComponent } from './components/nav/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { ContentDirective } from './directives/content.directive';
import { FormlyKvkkInputComponent } from './components/formly-kvkk-input/formly-kvkk-input.component';
import { YesNoModalComponent } from './components/yes-no-modal/yes-no-modal.component';
import { FormlyHorizontalWrapper } from './components/formly-wrappers/horizontal-wrapper';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyPhoneTypeComponent } from './components/formly-phone-type/formly-phone-type.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { FormlySeperatedNumberComponent } from './components/formly-seperated-number/formly-seperated-number.component';
import { FormlyImageDataComponent } from './components/formly-image-data/formly-image-data.component';
import { ImageDataAccessorDirective } from './directives/image-data-accessor.directive';
import { SafePipe } from './pipes/safe.pipe';
import { FormlyDateInputComponent } from './components/formly-date-input/formly-date-input.component';
import { CourseStatusFilter } from './pipes/courseStatusFilter.pipe';

export function passwordMatchValidator(control: AbstractControl) {
  let { password, passwordConfirm, Password } = control.value;

  if (Password) password = Password;

  if (!passwordConfirm || !password) {
    // avoid displaying the message error when values are empty
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { passwordMatch: { message: 'Yeni şifre ile aynı değil' } };
}

export function EmailValidator(control: AbstractControl) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)
    ? null
    : { email: { message: 'Geçerli bir E-Posta adresi değil' } };
}

export function PassportNoValidator(control: AbstractControl) {
  return /^(?!^0+$)[a-zA-Z0-9]{3,30}$/.test(control.value) ||
    (control.parent?.controls as any).IdentificationDocumentType.value ==
      'Identification'
    ? null
    : { passport: { message: 'Geçerli bir pasaport numarası değil' } };
}

export function TurkishIdentityNoValidator(control: AbstractControl) {
  // if (
  //   (control.parent?.controls as any).IdentificationDocumentType.value ==
  //   'Passport'
  // ) {
  //   return null;
  // }

  const no = control.value;
  if (no == undefined || no == null) {
    return { tcno: { message: 'Geçerli bir T.C. kimlik numarası değil' } };
  }

  let ruleLength = no.length == 11;
  if (!ruleLength) {
    return { tcno: { message: 'Geçerli bir T.C. kimlik numarası değil' } };
  }

  let ruleZero = no.substring(0) !== '0';
  if (!ruleZero) {
    return { tcno: { message: 'Geçerli bir T.C. kimlik numarası değil' } };
  }

  let sumx1 = 0;
  let sumy1 = 0;
  let sumy2 = 0;

  for (let i = 0; i < 10; i++) {
    sumx1 += Number(no.substring(i, i + 1));
  }
  let rule1 = sumx1 % 10 == Number(no.substring(10, 11));

  for (let i = 0; i < 10; i += 2) {
    sumy1 += Number(no.substring(i, i + 1));
  }
  for (let i = 1; i < 8; i += 2) {
    sumy2 += Number(no.substring(i, i + 1));
  }
  let rule2 = (sumy1 * 7 - sumy2) % 10 == Number(no.substring(9, 10));

  if (!rule1 || !rule2) {
    return { tcno: { message: 'Geçerli bir T.C. kimlik numarası değil' } };
  }

  return null;
}

export function minLengthValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `Bu alan ${field.props!.minLength} karakterden az olamaz`;
}

export function upperCaseStringValidator(control: AbstractControl) {
  // Check if string contains only alphabetic characters
  return !/^[A-ZĞÜŞÖÇİ\s]*$/.test(control.value) ? null : { upperCase: true };
}

export function upperCaseValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return 'Sadece büyük harfler geçerli';
}

@NgModule({
  declarations: [
    ContentDirective,
    DoughnutChartComponent,
    FooterComponent,
    NavComponent,
    MenuComponent,
    DevMenuComponent,
    GridComponent,
    FormlyKvkkInputComponent,
    YesNoModalComponent,
    FormlyHorizontalWrapper,
    FormlyPhoneTypeComponent,
    FormlySeperatedNumberComponent,
    FormlyImageDataComponent,
    ImageDataAccessorDirective,
    SafePipe,
    CourseStatusFilter,
    FormlyDateInputComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgChartsModule,
    RouterModule,
    NgbNavModule,
    ODataModule.forRoot({
      serviceRootUrl: 'https://ikapitest.casper.com.tr/api/odata/',
    }),
    FormlyModule.forRoot({
      types: [
        { name: 'kvkkInput', component: FormlyKvkkInputComponent },
        {
          name: 'phoneNumber',
          component: FormlyPhoneTypeComponent,
        },
        {
          name: 'seperatedNumber',
          component: FormlySeperatedNumberComponent,
        },
        {
          name: 'imageData',
          component: FormlyImageDataComponent,
        },
        {
          name: 'ngb-datepicker',
          component: FormlyDateInputComponent,
        },
      ],
      validators: [
        { name: 'passwordMatch', validation: passwordMatchValidator },
        { name: 'email', validation: EmailValidator },
        { name: 'tcno', validation: TurkishIdentityNoValidator },
        { name: 'passport', validation: PassportNoValidator },
        { name: 'upperCase', validation: upperCaseStringValidator },
      ],
      validationMessages: [
        { name: 'minLength', message: minLengthValidationMessage },
        { name: 'upperCase', message: upperCaseValidationMessage },
      ],
      wrappers: [
        { name: 'form-field-horizontal', component: FormlyHorizontalWrapper },
      ],
    }),
    FormlyBootstrapModule,
    NgbDropdownModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ToastrModule.forRoot(),
  ],
  exports: [
    DoughnutChartComponent,
    FooterComponent,
    NavComponent,
    ContentDirective,
    NgbNavModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    NgbDropdownModule,
    GridComponent,
    SafePipe,
    CourseStatusFilter
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
