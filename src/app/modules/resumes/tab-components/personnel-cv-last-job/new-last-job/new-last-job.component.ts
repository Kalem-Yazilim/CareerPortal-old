import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PersonnelCvJobQuality } from 'src/app/models/personnel-cv-job-qualitys.interface';
import { PersonnelCvLastJob } from 'src/app/models/personnel-cv-last-job.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { BaseModalComponent } from '../../base-personnel-cv/base-modal.component';

@Component({
  selector: 'app-new-last-job',
  templateUrl: './new-last-job.component.html',
  styleUrls: ['./new-last-job.component.scss'],
})
export class NewLastJobComponent extends BaseModalComponent implements OnInit {
  form = new FormGroup({});
  model: Partial<PersonnelCvLastJob> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private modalService: NgbModal, private api: ApiService) {
    super();
  }

  ngOnInit(): void {
    if (this.updateModel) this.model = this.updateModel;
    this.setFields();
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6 ',
            key: 'LastCompanyName',
            type: 'input',
            focus: true,
            props: {
              label: 'Şirket Adı',
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'LastPosition',
            type: 'input',
            props: {
              label: 'Pozisyon',
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'LastCompanyStartDate',
            type: 'input',
            props: {
              label: 'Başlangıç Tarihi',
              type: 'date',
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'LastCompanyEndDate',
            type: 'input',
            props: {
              label: 'Bitiş Tarihi',
              type: 'date',
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'LastSalary',
            type: 'seperatedNumber',
            props: {
              label: 'Aldığınız Net Ücret',
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'Reasonfordeparture',
            type: 'input',
            props: {
              label: 'Ayrılış Nedeni',
            },
          },
          // {
          //   className: 'col-12 col-md-6 ',
          //   key: 'LastCompanyDepartureDesc',
          //   type: 'input',
          //   props: {
          //     label: 'Ayrılış Açıklaması',
          //   },
          // },
        ],
      },
    ];
  }

  onSubmit() {
    if (this.form.valid && this.oid) {
      this.model.PersonnelCv = {
        Oid: +this.oid,
      };
      (this.model.Oid
        ? this.api.put(`PersonnelCvLastJobs/${this.model.Oid}`, this.model)
        : this.api.post<PersonnelCvLastJob>('PersonnelCvLastJobs', this.model)
      ).subscribe({
        next: (res) => {
          this.entityAdded(true);
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          alert(err);
        },
      });
    } else {
      alert('Öz geçmiş formu kayıtlı edilmeli!');
    }
  }

  closeModal() {
    // Bu bütün açık olan modalları kapatır;
    this.modalService.dismissAll();
  }
}
