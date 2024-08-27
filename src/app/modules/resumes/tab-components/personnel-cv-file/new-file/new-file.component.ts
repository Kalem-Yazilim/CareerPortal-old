import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { PersonnelCvLastJobReference } from 'src/app/models/personnel-cv-last-job-reference.interface';
import { PersonnelCVFile } from 'src/app/models/personnel-cvfile.interface';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { BaseModalComponent } from '../../base-personnel-cv/base-modal.component';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss'],
})
export class NewFileComponent extends BaseModalComponent implements OnInit {
  form = new FormGroup({});
  model: Partial<PersonnelCVFile> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private modalService: NgbModal, private api: ApiService) {
    super();
  }

  ngOnInit(): void {
    if (this.updateModel) {
      this.model.Oid=this.updateModel.Oid;
      this.model.FileName = this.updateModel.FileName;
    }
    this.setFields();
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 mb-3',
            key: 'FileName',
            type: 'input',
            wrappers: ['form-field-horizontal'],
            focus: true,
            props: {
              label: 'Açıklama',
              required: true,
            },
          },
          {
            className: 'col-12',
            key: 'FileContent',
            type: 'input',
            wrappers: ['form-field-horizontal'],
            props: {
              type: 'file',
              label: 'Dosya',
              required: true,
              change: (f, $event) => this.changeFile($event),
            },
          },
        ],
      },
    ];
  }

  changeFile(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    var reader = e.target;
    let [fileType, base64file] = (reader.result as string).split(',');
    this.model.FileContent = base64file;
    this.model.FileName = this.model.FileName + `|${fileType}`;
  }

  onSubmit() {
    if (this.form.valid && this.oid) {
      this.model.PersonnelCv = {
        Oid: +this.oid,
      };

      console.info('Model -> ', this.model);

      (this.model.Oid
        ? this.api.put(`PersonnelCVFiles/${this.model.Oid}`, this.model)
        : this.api.post<PersonnelCVFile>('PersonnelCVFiles', this.model)
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
