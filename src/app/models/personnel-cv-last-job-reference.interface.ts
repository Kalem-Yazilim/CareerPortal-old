import { PersonnelCv } from './personnel-cv.interface';

export interface PersonnelCvLastJobReference {
  Oid: number;
  ReferenceName: string;
  ReferenceCompany: string;
  ReferenceTelephone1: string;
  ReferenceEmail: string;
  ReferenceTelephone2: string;
  PersonnelCv: Partial<PersonnelCv>;
}
