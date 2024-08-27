import { JobApplicationType } from '../enums/job-application-type';
import { PersonnelCv } from './personnel-cv.interface';
import { PersonnelJobAnnouncement } from './personnel-job-announcement.interface';

export interface PersonnelJobApplication {
  Oid: number;
  JobApplicationType: JobApplicationType;
  ApplicationDate: Date;
  PersonnelJobAnnouncement: PersonnelJobAnnouncement;
  PersonnelCv: PersonnelCv;
}
