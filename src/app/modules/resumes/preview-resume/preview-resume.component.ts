import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Objects } from 'angular-odata';
import { PersonnelCv } from 'src/app/models/personnel-cv.interface';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-preview-resume',
  templateUrl: './preview-resume.component.html',
  styleUrls: ['./preview-resume.component.scss'],
})
export class PreviewResumeComponent implements OnInit {
  oid: number | null;
  personnelCv: PersonnelCv;
  feilds: any[];

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.oid = +(this.route.snapshot.paramMap.get('oid') as string);
  }
  async ngOnInit() {
    if (this.oid && !isNaN(+this.oid)) {
      this.personnelCv = (
        await this.api.getSingle<PersonnelCv>('PersonnelCvs', this.oid)
      ).data;
      this.feilds = Object.entries(this.personnelCv);
    }
  }
}
