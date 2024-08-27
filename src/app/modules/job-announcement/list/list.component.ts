import { ConfigService, IConfigObject } from './../../shared/services/config.service';
import { Component, OnInit } from '@angular/core';
import { ODataServiceFactory } from 'angular-odata';
import { PersonnelJobAnnouncement } from 'src/app/models/personnel-job-announcement.interface';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  jobAnnouncements: PersonnelJobAnnouncement[] = [];
  count: number = 0;

  oDataApiUrl: string;

  constructor(private factory: ODataServiceFactory,
    private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs) {
          this.oDataApiUrl = configs.odata_url;
          this.getAnnouncements();
      }
      });
  }

  getAnnouncements() {
    let entityFactory = this.factory.entitySet<PersonnelJobAnnouncement>(
      'PersonnelJobAnnouncements'
    );
    let entityService = entityFactory.entities();
    entityFactory.api.serviceRootUrl = this.oDataApiUrl;

    entityService
      .query((q) => {
        q.filter({ IsActive: true });
      })
      .fetch({
        withCount: true,
      })
      .subscribe(({ entities, annots }) => {
        if (entities) this.jobAnnouncements = entities;
        this.count = annots.count ? annots.count : 0;
      });
  }
}
