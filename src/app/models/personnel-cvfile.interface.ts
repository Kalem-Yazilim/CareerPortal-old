import { PersonnelCv } from './personnel-cv.interface';

export interface PersonnelCVFile {
  Oid: string;
  FileContent: string;
  FileName: string;
  FileType:string;
  PersonnelCv: Partial<PersonnelCv>;
}
