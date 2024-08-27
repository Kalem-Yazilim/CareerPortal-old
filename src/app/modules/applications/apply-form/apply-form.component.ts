import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { JobApplicationType } from 'src/app/enums/job-application-type';
import { PersonnelJobAnnouncement } from 'src/app/models/personnel-job-announcement.interface';
import { PersonnelJobApplication } from 'src/app/models/personnel-job-application.interface';
import { ApiService } from '../../shared/services/api.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.component.html',
  styleUrls: ['./apply-form.component.scss'],
})
export class ApplyFormComponent implements OnInit {
  appId: number | string | null;
  form = new FormGroup({});
  model: Partial<PersonnelJobApplication> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  jobAnnouncement: any;

  compareWithCondition = (field: FormlyFieldConfig) => {
    if (/* this.mode == 'Update' && */ field.props) {
      field.props['compareWith'] = (o1: any, o2: any) => o1.Name === o2.Name;
    }
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.appId = route.snapshot.paramMap.get('appId');
  }

  async ngOnInit() {
    this.setFields();
    this.jobAnnouncement = (
      await this.apiService.getSingle<PersonnelJobAnnouncement>(
        'PersonnelJobAnnouncements',
        +this.appId!
      )
    ).data;

    this.model.PersonnelJobAnnouncement = this.jobAnnouncement;
  }

  async setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-12',
            key: 'PersonnelCv',
            type: 'select',
            props: {
              label: 'Kayıtlı Öz Geçmişlerim',
              options: (await this.apiService.getList<any[]>('PersonnelCvs'))
                .data,
              valueProp: (option: any) => option,
              labelProp: 'NameOfPersonnelCV',
              required: true,
            },
            /* hooks: {
            onInit: (field) => {
              this.compareWithCondition(field)
            },
          }, */
          },
        ],
      },
    ];
  }

  onSubmit() {
    //
    console.log('başvuru on submit', this.model);
    if (this.form.valid) {
      this.model.JobApplicationType = JobApplicationType.NotApplicable;

      if (this.model.PersonnelCv)
        delete (this.model.PersonnelCv as any).DescriptionA;
      this.apiService.post('personnelJobApplications', this.model).subscribe({
        next: (res) => {
          this.notification.show('Başvurunuz başarıyla gönderildi!', 'success');
          this.router.navigateByUrl('applications');
        },
        error: (err) => {
          const error = err.error.value as string;
          if (error.includes('başvuru sağlanılan ilanlara tekrar')) {
            this.notification.show(error, 'warning');
          } else {
            this.notification.show('Tanımlanamayan hata!', 'warning');
          }
        },
      });
    }
  }
}
