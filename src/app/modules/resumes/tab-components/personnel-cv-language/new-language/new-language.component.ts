import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PersonnelCvLanguage } from 'src/app/models/personnel-cv-language.interface';
import { QueryType } from 'src/app/modules/shared/interfaces/requestConfig.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import {NotificationService} from 'src/app/modules/shared/services/notification.service';
import { BaseModalComponent } from '../../base-personnel-cv/base-modal.component';

@Component({
  selector: 'app-new-language',
  templateUrl: './new-language.component.html',
  styleUrls: ['./new-language.component.scss'],
})
export class NewLanguageComponent extends BaseModalComponent implements OnInit {
  form = new FormGroup({});
  model: Partial<PersonnelCvLanguage> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  readWriteOptions = [
    { label: 'Kötü', value: 'Bad' },
    { label: 'Orta', value: 'Middle' },
    { label: 'İyi', value: 'Good' },
    { label: 'Çok İyi', value: 'Elegant' },
  ];

  otherLanguageFieldHidden = true;
  personnelLanguageDefinitions: any[] = [];

  constructor(private modalService: NgbModal, private api: ApiService,
    private notification: NotificationService) {
    super();
  }

  ngOnInit(): void {
    console.log('this.updateModel >> ', this.updateModel);
    if (this.updateModel) this.model = this.updateModel;

    if (this.model?.PersonnelLanguageDefinition?.Oid == 7) {
      this.otherLanguageFieldHidden = false;
    }

    this.getPersonnelLanguageDefinitions();
  }

  selectQuery: QueryType = (q) => {
    q.select(['Oid', 'Name']);
  };

  async getPersonnelLanguageDefinitions() {
    const res = await this.api.getList<any[]>('PersonnelLanguageDefinitions', this.selectQuery);
    this.personnelLanguageDefinitions = res?.data ?? [];
    this.setFields();
  }

  async setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-6 ',
            key: 'PersonnelLanguageDefinition.Oid',
            type: 'select',
            props: {
              label: 'Dil Adı',
              options: this.personnelLanguageDefinitions,
              valueProp: 'Oid',
              labelProp: 'Name',
              change: (field, $event) => this.controlSelectedLang(),
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'OtherLanguageName',
            type: 'input',
            hide: this.otherLanguageFieldHidden,
            props: {
              label: 'Diğer Dilin Adı',
              required: true
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'ReadRate',
            type: 'select',
            props: {
              label: 'Okuma Seviyesi',
              options: this.readWriteOptions,
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'WriteRate',
            type: 'select',
            props: {
              label: 'Yazma Seviyesi',
              options: this.readWriteOptions,
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'TalkRate',
            type: 'select',
            props: {
              label: 'Konuşma Seviyesi',
              options: this.readWriteOptions,
            },
          },
          {
            className: 'col-12 col-md-6 ',
            key: 'UnderStandRate',
            type: 'select',
            props: {
              label: 'Anlama Seviyesi',
              options: this.readWriteOptions,
            },
          },
        ],
      },
    ];
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.oid) {
      this.notification.show('Öz geçmiş formu kayıtlı edilmeli!!', 'warning');
      return;
    }

    this.model.PersonnelCv = {
      Oid: +this.oid,
    };
    (this.model.Oid
      ? this.api.put(`PersonnelCvLanguages/${this.model.Oid}`, this.model)
      : this.api.post<PersonnelCvLanguage>('PersonnelCvLanguages', this.model)
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
  }

  controlSelectedLang() {
    const formData: any = this.form.getRawValue();

    if (formData?.PersonnelLanguageDefinition?.Oid == 7) {
      this.otherLanguageFieldHidden = false;
    } else {
      this.otherLanguageFieldHidden = true;
    }
    this.setFields();
  }

  closeModal() {
    // Bu bütün açık olan modalları kapatır;
    this.modalService.dismissAll();
  }
}
