import { Component, OnInit } from '@angular/core';
import { PersonnelCv } from 'src/app/models/personnel-cv.interface';
import { ApiService } from '../shared/services/api.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { YesNoModalComponent } from '../shared/components/yes-no-modal/yes-no-modal.component';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss'],
})
export class ResumesComponent implements OnInit {
  personnelCvs: Array<PersonnelCv> = [];

  constructor(private api: ApiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetch();
  }

  async fetch() {
    this.personnelCvs = (
      await this.api.getList<PersonnelCv[]>('PersonnelCvs')
    ).data;
  }

  deleteResume(oid: number) {
    let modal = this.modalService.open(YesNoModalComponent, {
      backdrop: 'static',
    });
    modal.componentInstance.question = 'Silmek istediğinize emin misiniz?';
    modal.result.then((result) => {
      if (result) {
        if (result.res === true) {
          this.api.delete(`PersonnelCvs/${oid}`).subscribe({
            next: (res) => {
              if (res) this.fetch();
            },
            error: (err) => {
              alert(err);
            },
          });
        }
      }
    });
  }
}
