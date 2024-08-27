import { QualityRate } from '../enums/quality-rate';
import { QualityYears } from '../enums/quality-years';
import { PersonnelCv } from './personnel-cv.interface';

export interface PersonnelCvJobQuality {
  Oid: number;
  QualityDesc: string;
  AbilityDesc: string;
  QualityRate: QualityRate;
  QualityYears: QualityYears;
  PersonnelCv: Partial<PersonnelCv>;
}
