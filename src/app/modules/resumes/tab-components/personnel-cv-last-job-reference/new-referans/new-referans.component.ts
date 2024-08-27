import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PersonnelCvLastJobReference } from 'src/app/models/personnel-cv-last-job-reference.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { BaseModalComponent } from '../../base-personnel-cv/base-modal.component';

@Component({
  selector: 'app-new-referans',
  templateUrl: './new-referans.component.html',
  styleUrls: ['./new-referans.component.scss'],
})
export class NewReferansComponent extends BaseModalComponent implements OnInit {
  form = new FormGroup({});
  model: Partial<PersonnelCvLastJobReference> = {};
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
            key: 'ReferenceName',
            type: 'input',
            focus: true,
            props: {
              label: 'Adı Soyadı',
              required: true,
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'ReferenceCompany',
            type: 'input',
            props: {
              label: 'İşyeri',
              required: false,
            },
          },

          {
            className: 'col-12 col-md-6 ',
            key: 'ReferenceTelephone1',
            type: 'phoneNumber',
            props: {
              label: 'Telefonu',
              required: false,
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'ReferenceEmail',
            type: 'input',
            props: {
              label: 'Email Adresi',
              required: false,
            },
            validators: {
              validation: ['email'],
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'ReferenceTelephone2',
            type: 'phoneNumber',
            props: {
              label: 'Telefon 2',
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
        ? this.api.put(
            `PersonnelCvLastJobReferences/${this.model.Oid}`,
            this.model
          )
        : this.api.post<PersonnelCvLastJobReference>(
            'PersonnelCvLastJobReferences',
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
