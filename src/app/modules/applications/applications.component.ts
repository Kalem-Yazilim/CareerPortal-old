import { Component, OnInit } from '@angular/core';
import { PersonnelJobApplication } from 'src/app/models/personnel-job-application.interface';
import { QueryType } from '../shared/interfaces/requestConfig.interface';
import { ApiService } from '../shared/services/api.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  personnelJobApplications: PersonnelJobApplication[];
  constructor(
    private api: ApiService,
    private notification: NotificationService
  ) {}

  async ngOnInit() {
    // PersonnelJobApplications?$expand=PersonnelJobAnnouncement($select=JobAnnouncementTitle),PersonnelCv($select=Email)
    await this.fetchData();
  }

  async fetchData() {
    let query: QueryType = (q) => {
      q.expand({
        PersonnelJobAnnouncement: {
          select: ['JobAnnouncementTitle'],
        },
        PersonnelCv: { select: ['NameOfPersonnelCV'] },
      });
    };

    this.personnelJobApplications = (
      await this.api.getList<PersonnelJobApplication[]>(
        'personnelJobApplications',
        query
      )
    ).data;
  }

  removeApplication(id: string | number) {
    this.api.delete(`PersonnelJobApplications/${id}`).subscribe({
      next: () => {
        this.notification.show('Başvuru geri alındı!', 'success');
        this.fetchData();
      },
      error: () => {
        this.notification.show('Başvuru geri alınamadı!', 'warning');
      },
    });
  }
}
