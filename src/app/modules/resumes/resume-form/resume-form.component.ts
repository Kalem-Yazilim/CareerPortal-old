import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonnelCvComponent } from '../tab-components/personnel-cv/personnel-cv.component';
import { ApiService } from '../../shared/services/api.service';
import { RequestConfig } from '../../shared/interfaces/requestConfig.interface';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss'],
})
export class ResumeFormComponent implements OnInit {
  active: number = 1;
  oid: number | null;
  mode: 'post' | 'put';
  @ViewChild('personlCV') public personlCV: PersonnelCvComponent;
  eduRequestConfig: RequestConfig = {
    url: 'PersonnelCvEducations',
    columns: [],
  };
  qualityRequestConfig: RequestConfig = {
    columns: [],
    url: 'PersonnelCvJobQualitys',
  };

  lastJobRequestConfig: RequestConfig = {
    columns: [],
    url: 'PersonnelCvLastJobs',
  };
  languageRequestConfig: RequestConfig = {
    columns: [],
    url: 'PersonnelCvLanguages',
  };
  educationListCount: number | undefined;
  jobQualityListCount: number | undefined;
  lastJobListCount: number | undefined;
  languageListCount: number | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.oid = +(this.route.snapshot.paramMap.get('oid') as string);
    if (this.oid && this.oid > 0) this.mode = 'put';
    else {
      this.mode = 'post';
      this.oid = null;
    }
  }

  ngOnInit() {
    if (this.oid) {
      this.eduRequestConfig.query = (q) => {
        q.top(0),
          q.filter({
            PersonnelCv: { Oid: this.oid },
          });
      };

      this.qualityRequestConfig.query = (q) => {
        q.top(0),
          q.filter({
            PersonnelCv: { Oid: this.oid },
          });
      };

      this.lastJobRequestConfig.query = (q) => {
        q.top(0), q.filter({ PersonnelCv: { Oid: this.oid } });
      };
      this.languageRequestConfig.query = (q) => {
        q.top(0), q.filter({ PersonnelCv: { Oid: this.oid } });
      };

      this.apiService
        .httpRequest(
          this.eduRequestConfig.url,
          this.eduRequestConfig.query,
          true
        )
        .subscribe({
          next: ({ annots, entities }) => {
            this.educationListCount = annots.count;
          },
        });
    }

    this.apiService
      .httpRequest(
        this.qualityRequestConfig.url,
        this.qualityRequestConfig.query,
        true
      )
      .subscribe({
        next: ({ annots, entities }) => {
          this.jobQualityListCount = annots.count;
        },
      });

    this.apiService
      .httpRequest(
        this.lastJobRequestConfig.url,
        this.lastJobRequestConfig.query,
        true
      )
      .subscribe({
        next: ({ annots, entities }) => {
          this.lastJobListCount = annots.count;
        },
      });

    this.apiService
      .httpRequest(
        this.languageRequestConfig.url,
        this.languageRequestConfig.query,
        true
      )
      .subscribe({
        next: ({ annots, entities }) => {
          this.languageListCount = annots.count;
        },
      });
  }

  changeDangerIcon(countName: string | undefined) {
    switch (countName) {
      case 'educationListCount':
        this.educationListCount!++;
        break;
      case 'jobQualityListCount':
        this.jobQualityListCount!++;
        break;
      case 'lastJobListCount':
        this.lastJobListCount!++;
        break;
      case 'languageListCount':
        this.languageListCount!++;
        break;
    }
  }
}
