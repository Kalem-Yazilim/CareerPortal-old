import { AttacmentFileType } from '../enums/attacment-file-type';
import { PersonnelCv } from './personnel-cv.interface';

export interface FileSystemStoreObjectBase {
  Oid: number;
  AttacmentFileType: AttacmentFileType;
  Description: string;
  DemandFromDetail: any; //    DemandFromDetail
  DocItemBase: any; //    DocItemBase
  PersonnelCV: PersonnelCv;
  DocBase: any; //    DocBase
  CardBase: any; //    CardBase
  File: any; //    FileSystemStoreObject
}
