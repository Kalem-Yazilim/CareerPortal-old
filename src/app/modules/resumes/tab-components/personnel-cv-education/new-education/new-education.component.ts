import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PersonnelCvEducation } from 'src/app/models/personnel-cv-education.interface';
import { PersonnelCvJobQuality } from 'src/app/models/personnel-cv-job-qualitys.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { BaseModalComponent } from '../../base-personnel-cv/base-modal.component';

@Component({
  selector: 'app-new-education',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.scss'],
})
export class NewEducationComponent
  extends BaseModalComponent
  implements OnInit
{
  form = new FormGroup({});
  model: Partial<PersonnelCvEducation> = {};
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
            key: 'Institue',
            type: 'input',
            focus: true,
            props: {
              label: 'Okul Adı',
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'InstitueDepartment',
            type: 'input',
            props: {
              label: 'Bölüm Adı',
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'GraduationYear',
            type: 'string',
            props: {
              label: 'Mezuniyet Yılı',
              type: 'Number'
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'GruaduationRate',
            type: 'string',
            props: {
              label: 'Lisans Derecesi',
              type: 'Number'
            },
          },
          // {
          //   className: 'col-12 col-md-6 ',
          //   key: 'SchoolName',
          //   type: 'input',
          //   props: {
          //     label: 'Lise Açıklaması',
          //   },
          // },
          {
            className: 'col-12 col-md-6 ',
            key: 'EducationStatus',
            type: 'select',
            props: {
              label: 'Durumu',
              options: [
                { label: 'Seçiniz', value: 'Default' },
                { label: 'Devam Ediyorum', value: 'Continued' },
                { label: 'Terk', value: 'Abandonment' },
                { label: 'Mezun', value: 'Graduated' },
              ],
            },
          },
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
        ? this.api.put(`PersonnelCvEducations/${this.model.Oid}`, this.model)
        : this.api.post<PersonnelCvEducation>(
            'PersonnelCvEducations',
            this.model
          )
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
