import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { QualityRate } from 'src/app/enums/quality-rate';
import { QualityYears } from 'src/app/enums/quality-years';
import { PersonnelCvJobQuality } from 'src/app/models/personnel-cv-job-qualitys.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { BaseModalComponent } from '../../base-personnel-cv/base-modal.component';

@Component({
  selector: 'app-new-quality',
  templateUrl: './new-quality.component.html',
  styleUrls: ['./new-quality.component.scss'],
})
export class NewQualityComponent extends BaseModalComponent implements OnInit {
  form = new FormGroup({});
  model: Partial<PersonnelCvJobQuality> = {};
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
            key: 'QualityDesc',
            type: 'input',
            focus: true,
            props: {
              label: 'Nitelik',
              required: true,
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'AbilityDesc',
            type: 'input',
            props: {
              label: 'Açıklama',
            },
          },

          {
            className: 'col-12 col-md-6 ',
            key: 'QualityRate',
            type: 'select',
            props: {
              label: 'Seviye',
              required: true,
              options: [
                {
                  label: 'Kötü',
                  value: QualityRate[QualityRate.Bad],
                },
                {
                  label: 'Orta',
                  value: QualityRate[QualityRate.Middle],
                },
                {
                  label: 'İyi',
                  value: QualityRate[QualityRate.Good],
                },
                {
                  label: 'Çok İyi',
                  value: QualityRate[QualityRate.Elegant],
                },
              ],
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'QualityYears',
            type: 'select',
            props: {
              label: 'Tecrübe (Yıl)',
              required: true,
              options: [
                {
                  label: '1',
                  value: QualityYears[QualityYears.one],
                },
                {
                  label: '2',
                  value: QualityYears[QualityYears.Two],
                },
                {
                  label: '3',
                  value: QualityYears[QualityYears.Tree],
                },
                {
                  label: '4',
                  value: QualityYears[QualityYears.Four],
                },
                {
                  label: '5',
                  value: QualityYears[QualityYears.five],
                },
                {
                  label: '6',
                  value: QualityYears[QualityYears.six],
                },
                {
                  label: '7',
                  value: QualityYears[QualityYears.seven],
                },
                {
                  label: '8',
                  value: QualityYears[QualityYears.eight],
                },
                {
                  label: '9',
                  value: QualityYears[QualityYears.nine],
                },
                {
                  label: '10',
                  value: QualityYears[QualityYears.ten],
                },
                {
                  label: '10+',
                  value: QualityYears[QualityYears.morethenTen],
                },
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
        ? this.api.put(`PersonnelCvJobQualitys/${this.model.Oid}`, this.model)
        : this.api.post<PersonnelCvJobQuality>(
            'PersonnelCvJobQualitys',
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
