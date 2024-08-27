import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CountryDefinition } from 'src/app/models/country-definition.interface';
import { PersonnelCv } from 'src/app/models/personnel-cv.interface';
import { QueryType } from 'src/app/modules/shared/interfaces/requestConfig.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { BasePersonnelCvComponent } from '../base-personnel-cv/base-personnel-cv.component';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { MilitaryServiceState } from 'src/app/enums/military-service-state';

export function dateParser(date: any) {
  return date.substring(0, date.indexOf('T'));
}

@Component({
  selector: 'app-personnel-cv',
  templateUrl: './personnel-cv.component.html',
  styleUrls: ['./personnel-cv.component.scss'],
})
export class PersonnelCvComponent
  extends BasePersonnelCvComponent
  implements OnInit
{
  form = new FormGroup({});
  model: Partial<PersonnelCv> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  selectQuery: QueryType = (q) => {
    q.select(['Oid', 'Name']);
  };
  selectObj = { select: ['Oid', 'Name'] };

  // Bu alan put isteğinde seti olmayan alanlar gelmemesi için sadece ilgili alanların get edilmesi içindir
  singleSelectedProperties = [
    'NameOfPersonnelCV',
    'Oid',
    'Name',
    'Surname',
    'FatherName',
    'Gender',
    'IdentificationNumber',
    'MaritalStatus',
    'DrivingLicence',
    'BirthDate',
    'HomeAdress',
    'OfficePhone',
    'HomePhone',
    'MobilPhone',
    'Email',
    'CareerObjective',
    'SalaryExpectation',
    'InterestPosition',
    'GeneralDesc',
    'Interests',
    'InterZoneTrip',
    'MemberComminuties',
    'Smoking',
    'PhysicallyHandicappedDesc',
    'MilitaryServiceState',
    'MilitaryManifestationDate',
    'MilitaryDate',
    'IdentificationDocumentType',
    'MilitaryServiceDesc',
    'ImageData',
  ];
  expandQuery: QueryType = (q) => {
    q.expand({
      PersonnelNationality: this.selectObj,
      CountryDefinition: this.selectObj,
      StateDefinition: this.selectObj,
      CityDefinition: this.selectObj,
      BirthCountryDefinition: this.selectObj,
      BirthCityDefinition: this.selectObj,
      PersonnelEducation: {},
    }),
      q.select(this.singleSelectedProperties);
  };

  countryDefinitions: CountryDefinition[] = [];
  personnelNationalities: any[] = [];

  mode: 'Update' | 'Create';
  years: any[] = [];
  months: any[] = [];
  days: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notification: NotificationService
  ) {
    super();
  }

  ngOnInit() {
    const currentYear =new Date().getFullYear();

    for (let i = currentYear - 75; i <= currentYear - 15; i++) {
      this.years.push({
          value: i.toString()
      });
    }

    for (let i = 1; i <= 12; i++) {
      this.months.push({
          value: i.toString()
      });
    }

    for (let i = 1; i <= 31; i++) {
      this.days.push({
          value: i.toString()
      });
    }


    this.mode = this.oid ? 'Update' : 'Create';
    if (this.mode === 'Update') {
      this.apiService
        .getSingleReq('PersonnelCvs', +this.oid!, this.expandQuery)
        .subscribe({
          next: (res) => {
            this.model = res.entity;
            this.model.BirthDate = dateParser(this.model.BirthDate);
            const birthDate = this.model.BirthDate.toString().split('-')
            this.model.year = birthDate[0];
            this.model.month = parseInt(birthDate[1]).toString();
            this.model.day = parseInt(birthDate[2]).toString();
            if (this.model.MilitaryManifestationDate)
              this.model.MilitaryManifestationDate = dateParser(
                this.model.MilitaryManifestationDate
              );
            if (this.model.MilitaryDate)
              this.model.MilitaryDate = dateParser(this.model.MilitaryDate);

            this.apiService
              .httpRequest('PersonnelNationalities', this.selectQuery)
              .subscribe((res) => {
                if (res.entities) this.personnelNationalities = res.entities;
                this.apiService
                  .httpRequest('CountryDefinitions', (q: any) => {
                    q.expand({
                      StateDefinitions: {
                        expand: ['CityDefinitions'],
                      },
                    });
                  })
                  .subscribe((countries) => {
                    if (countries.entities) {
                      this.countryDefinitions = countries.entities;
                      this.setFields();
                    }
                  });
              });
          },
          error: (err) => {
            if (err.value) {
              this.notification.show(
                err.value,
                'error',
                'bottom-right',
                'Bir hata oluştu'
              );
            }
          },
        });
    } else {
      this.apiService
        .httpRequest('PersonnelNationalities', this.selectQuery)
        .subscribe((res) => {
          if (res.entities) this.personnelNationalities = res.entities;
          this.apiService
            .httpRequest('CountryDefinitions', (q: any) => {
              q.expand({
                StateDefinitions: {
                  expand: ['CityDefinitions'],
                },
              });
            })
            .subscribe((countries) => {
              if (countries.entities) {
                this.countryDefinitions = countries.entities;
                this.setFields();
              }
            });
        });
    }
  }

  logModel() {
    console.log(this.model);
  }

  setFields() {
    this.fields = [
      // {
      //   template:
      //     '<div><strong> Oid => ' +
      //     this.oid?.toString() +
      //     '</strong></div><hr />',
      // },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6',
            key: 'NameOfPersonnelCV',
            type: 'input',
            props: {
              label: 'Özgeçmiş Kayıt Adı:',
              required: true,
              maxLength: 30,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'ImageData',
            type: 'imageData',
            props: {
              label: 'Görsel',
            },
          },
        ],
      },
      {
        template: '<hr /><div><strong>Temel Bilgiler:</strong></div>',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6',
            key: 'Name',
            type: 'input',
            validators: ['upperCase'],
            props: {
              label: 'Ad',
              required: true,
              maxLength: 30,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'Surname',
            type: 'input',
            validators: ['upperCase'],
            //  defaultValue: 'Soyadınız',
            props: {
              label: 'Soyad',
              required: true,
              maxLength: 30,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'FatherName',
            type: 'input',
            props: {
              label: 'Baba Adı',
              required: true,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'Gender',
            type: 'select',
            props: {
              label: 'Cinsiyetiniz',
              required: true,
              options: [
                { label: 'Erkek', value: 'Male' },
                { label: 'Kadın', value: 'Female' },
              ],
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'PersonnelNationality',
            type: 'select',
            props: {
              label: 'Uyruğu',
              options: this.personnelNationalities,
              valueProp: (option: any) => option,
              compareWith: (o1: any, o2: any) => {
                if (o1 && o2 && o1.Name && o2.Name) {
                  return o1.Name === o2.Name;
                } else {
                  return false;
                }
              },
              labelProp: 'Name',
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'IdentificationDocumentType',
            type: 'select',
            defaultValue: 'Identification',
            props: {
              label: 'Kimlik Türü',
              options: [
                { label: 'T.C. Kimlik', value: 'Identification' },
                //{ label: 'Pasaport', value: 'Passport' },
              ],
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                const idType = field.formControl;
                idType!.valueChanges.subscribe(async (response: any) => {});
              },
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'IdentificationNumber',
            type: 'seperatedNumber',
            id: 'idenfiticationNumberId',
            props: {
              label: 'T.C. Kimlik Numarası',
              mask: '9*',
              maxLength: 11,
              required: true,
            },
            validators: {
              validation: ['tcno'],
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'DrivingLicence',
            type: 'select',
            defaultValue: false,
            props: {
              label: 'Sürücü Lisansı',
              type: 'boolean',
              options: [
                { label: 'Var', value: true },
                { label: 'Yok', value: false },
              ],
            },
          },
          // {
          //   className: 'col-12 col-md-6',
          //   key: 'BirthDate',
          //   type: 'ngb-datepicker',
          //   props: {
          //     label: 'Doğum Tarihi',
          //     required: true,
          //   },
          // },
          {
            className: 'col-12 col-md-2',
            key: 'year',
            type: 'select',
            props: {
              label: 'Doğum Yıl',
              valueProp: 'value',
              labelProp: 'value',
              required: true,
              options: this.years
            },
          },
          {
            className: 'col-12 col-md-2',
            key: 'month',
            type: 'select',
            props: {
              label: 'Doğum Ay',
              valueProp: 'value',
              labelProp: 'value',
              required: true,
              options: this.months
            },
          },
          {
            className: 'col-12 col-md-2',
            key: 'day',
            type: 'select',
            props: {
              label: 'Doğum Gün',
              valueProp: 'value',
              labelProp: 'value',
              required: true,
              options: this.days
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'BirthCountryDefinition',
            type: 'select',
            props: {
              label: 'Doğduğu Ülke',
              options: this.countryDefinitions,
              valueProp: (option: any) => option,
              compareWith: (o1: any, o2: any) => {
                if (o1 && o2 && o1.Name && o2.Name) {
                  return o1.Name === o2.Name;
                } else {
                  return false;
                }
              },
              labelProp: 'Name',
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'BirthCityDefinition',
            type: 'select',
            props: {
              label: 'Doğduğu Şehir',
              options: [],
              valueProp: (option: any) => option,
              compareWith: (o1: any, o2: any) => {
                if (o1 && o2 && o1.Name && o2.Name) {
                  return o1.Name === o2.Name;
                } else {
                  return false;
                }
              },
              labelProp: 'Name',
            },
            hooks: {
              onInit: (field: any) => {
                const birthCountryDefinition = (field.parent as any).get(
                  'BirthCountryDefinition'
                ).formControl;

                if (
                  field.props.options.length < 1 &&
                  this.model.BirthCountryDefinition
                ) {
                  field.props.options = this.countryDefinitions
                    .find((e) => {
                      return e.Oid == birthCountryDefinition.value.Oid;
                    })
                    ?.StateDefinitions.flatMap(
                      (state) => state.CityDefinitions
                    );
                }

                birthCountryDefinition.valueChanges.subscribe(
                  async (response: any) => {
                    if (field.props) {
                      field.props.options = response.StateDefinitions.flatMap(
                        (state: any) => state.CityDefinitions
                      );
                    }
                  }
                );
              },
            },
          },
        ],
      },
      {
        template: '<hr /><div><strong>İletişim Bilgileri:</strong></div>',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6',
            key: 'CountryDefinition',
            type: 'select',
            props: {
              label: 'Ülke',
              options: [...this.countryDefinitions],
              valueProp: (option: any) => option,
              compareWith: (o1: any, o2: any) => {
                if (o1 && o2 && o1.Name && o2.Name) {
                  return o1.Name === o2.Name;
                } else {
                  return false;
                }
              },
              labelProp: 'Name',
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'StateDefinition',
            type: 'select',
            props: {
              label: 'Bölge',
              options: [],
              valueProp: (option: any) => option,
              compareWith: (o1: any, o2: any) => {
                if (o1 && o2 && o1.Name && o2.Name) {
                  return o1.Name === o2.Name;
                } else {
                  return false;
                }
              },
              labelProp: 'Name',
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                const countryDefinition = (field.parent as any).get(
                  'CountryDefinition'
                ).formControl;

                if (field.props && this.model.CountryDefinition) {
                  field.props.options = this.countryDefinitions.find((e) => {
                    return e.Oid == countryDefinition.value.Oid;
                  })?.StateDefinitions;
                }

                countryDefinition.valueChanges.subscribe(
                  async (response: any) => {
                    if (field.props) {
                      field.props.options = response.StateDefinitions;
                    }
                  }
                );
              },
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'CityDefinition',
            type: 'select',
            props: {
              label: 'İl',
              options: [],
              valueProp: (option: any) => option,
              compareWith: (o1: any, o2: any) => {
                if (o1 && o2 && o1.Name && o2.Name) {
                  return o1.Name === o2.Name;
                } else {
                  return false;
                }
              },
              labelProp: 'Name',
            },
            hooks: {
              onInit: (field: any) => {
                const stateDefinition = (field.parent as any).get(
                  'StateDefinition'
                ).formControl;

                if (
                  field.props &&
                  this.model.StateDefinition &&
                  this.model.CountryDefinition
                ) {
                  field.props.options = this.countryDefinitions
                    .find((e) => {
                      return e.Oid == this.model.CountryDefinition!.Oid;
                    })
                    ?.StateDefinitions.find((c) => {
                      return c.Oid == this.model.StateDefinition?.Oid;
                    })?.CityDefinitions;
                }

                stateDefinition.valueChanges.subscribe(
                  async (response: any) => {
                    if (field.props) {
                      field.props.options = response.CityDefinitions;
                    }
                  }
                );
              },
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'HomeAdress',
            type: 'input',
            props: {
              label: 'Ev Adresi',
              maxLength: 200,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'OfficePhone',
            type: 'phoneNumber',
            props: {
              label: 'İş Telefonu',
              maxLength: 30,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'HomePhone',
            type: 'phoneNumber',
            props: {
              label: 'Ev Telefonu',
              maxLength: 30,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'MobilPhone',
            type: 'phoneNumber',
            props: {
              label: 'Cep Telefonu',
              required: true,
              maxLength: 30,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'Email',
            type: 'input',
            props: {
              label: 'E-Mail',
              required: true,
              maxLength: 100,
            },
            validators: {
              validation: ['email'],
            },
          },
        ],
      },
      {
        template: '<hr /><div><strong>Beklentileri:</strong></div>',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6',
            key: 'CareerObjective',
            type: 'input',
            props: {
              label: 'Kariyer Hedefi',
              maxLength: 100,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'SalaryExpectation',
            type: 'seperatedNumber',
            props: {
              label: 'Maaş Beklentisi',
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'InterestPosition',
            type: 'input',
            props: {
              label: 'İlgilendiğiniz Pozisyonlar',
              maxLength: 30,
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'GeneralDesc',
            type: 'input',
            props: {
              label: 'Genel Açıklama',
              maxLength: 30,
            },
          },
        ],
      },

      {
        template: '<div><strong>Diğer Bilgiler</strong></div>',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6',
            key: 'Interests',
            type: 'input',
            props: {
              label: 'İlgi Alanları',
              maxLength: 30,
            },
          },
          // {
          //   className: 'col-12 col-md-6',
          //   key: 'InterZoneTrip',
          //   type: 'select',
          //   props: {
          //     label: 'Seyahat Engeli Var Mı?',
          //     type: 'boolean',
          //     options: [
          //       { label: 'Evet', value: true },
          //       { label: 'Hayır', value: false },
          //     ],
          //   },
          // },
          // {
          //   className: 'col-12 col-md-6',
          //   key: 'MemberComminuties',
          //   type: 'input',
          //   props: {
          //     label: 'Üye Olunan Sivil Toplum Kuruluşları',
          //   },
          // },
          // {
          //   className: 'col-12 col-md-6',
          //   key: 'Smoking',
          //   type: 'select',
          //   props: {
          //     label: 'Sigara Kullanıyorum',
          //     type: 'boolean',
          //     options: [
          //       { label: 'Evet', value: true },
          //       { label: 'Hayır', value: false },
          //     ],
          //   },
          // },
          // {
          //   className: 'col-12 col-md-6',
          //   key: 'PhysicallyHandicappedDesc',
          //   type: 'input',
          //   props: {
          //     label: 'Engel Durumu Açıklaması',
          //   },
          // },
        ],
      },
      {
        template: '<hr /><div><strong>Askerlik Bilgileri</strong></div>',
        props: {},
        expressions: {
          hide: (field: FormlyFieldConfig) => {
            return field.model.Gender == 'Female';
          },
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6',
            key: 'MilitaryServiceState',
            type: 'select',
            defaultValue: 'undefined',
            props: {
              label: 'Askerlik Durumu',
              options: [
                { label: 'Yapıldı', value: 'Complete' },
                { label: 'Yapılmadı', value: 'Uncomplete' },
                { label: 'Tecilli', value: 'free' },
                { label: 'Muaf', value: 'Manifestation' },
                { label: 'Belirtilmedi', value: 'undefined' },
              ],
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'MilitaryManifestationDate',
            type: 'input',
            props: {
              label: 'Askerlik Tecil Tarihi',
              type: 'Date',
            },
            hide: true,
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                let control = field.model.MilitaryServiceState !== 'free';
                if (control) {
                  delete this.model.MilitaryManifestationDate;
                }
                return control;
              },
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'MilitaryDate',
            type: 'input',
            props: {
              label: 'Askerlik Tamamlandığı Tarih',
              type: 'Date',
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                let control = field.model.MilitaryServiceState !== 'Complete';
                if (control) {
                  delete this.model.MilitaryDate;
                }
                return control;
              },
            },
          },
          {
            className: 'col-12 col-md-6',
            key: 'MilitaryServiceDesc',
            type: 'input',
            props: {
              label: 'Askerlik Durumu Açıklaması',
              maxLength: 30,
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                let control =
                  field.model.MilitaryServiceState == 'Complete' ||
                  field.model.MilitaryServiceState == 'free';
                if (control) {
                  delete this.model.MilitaryServiceDesc;
                }
                return control;
              },
            },
          },
        ],
        expressions: {
          hide: (field: FormlyFieldConfig) => {
            let control = field.model.Gender == 'Female';
            if (control) {
              this.model.MilitaryServiceState = MilitaryServiceState.undefined;
              delete this.model.MilitaryDate;
              delete this.model.MilitaryManifestationDate;
              delete this.model.MilitaryServiceDesc;
            }
            return control;
          },
        },
      },
    ];
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let body = JSON.parse(JSON.stringify(this.model));
    body.month = parseInt(body.month) < 10 ? `0${body.month}` : body.month;
    body.day = parseInt(body.day) < 10 ? `0${body.day}` : body.day;

    body.BirthDate = `${body.year}-${body.month}-${body.day}`;
    delete body.year;
    delete body.month;
    delete body.day;

    if (this.mode === 'Create') {
      this.apiService.post('PersonnelCvs', body).subscribe({
        next: (response: any) => {
          this.notification.show('Kayıt başarılı!', 'success', 'bottom-right');
          this.notification.show(
            'Eğitim Bilgisi, Dil Bilgisi, İş Tecrübeleri, Nitelikler alanlarını doldurunuz',
            'warning',
            'top-center'
          );
          this.router.navigateByUrl('/resumes/update/' + response.Oid);
        },
        error: (err) => {
          this.notification.show('Hata!', 'error', 'bottom-right');
          console.log('Personnel cv PUT error => ', err);
        },
      });
    } else {
      body = { ...body, Oid: +this.oid! };
      this.apiService.put('PersonnelCvs/' + this.oid, body).subscribe({
        next: (response) => {
          this.notification.show('Kayıt başarılı!', 'success', 'bottom-right');
          this.router.navigateByUrl('/resumes/update/' + this.oid);
        },
        error: (err) => {
          this.notification.show('Hata!', 'error', 'bottom-right');
          console.log('Personnel cv PUT error => ', err);
        },
      });
    }
  }
}
