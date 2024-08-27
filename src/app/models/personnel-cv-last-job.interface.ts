import { LasJobsStatus } from '../enums/las-jobs-status';
import { PersonnelCv } from './personnel-cv.interface';

export interface PersonnelCvLastJob {
  Oid: number;
  LastCompanyName: string;
  LastPosition: string;
  LastSalary: number;
  LastCompanyStartDate: Date;
  LastCompanyEndDate: Date;
  LastCompanyDepartureDesc: string;
  Reasonfordeparture: string;
  LasJobsStatus: LasJobsStatus;
  PersonnelCv: Partial<PersonnelCv>;
}
