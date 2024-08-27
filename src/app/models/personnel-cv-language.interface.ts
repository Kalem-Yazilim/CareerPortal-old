import { ReadWriteRate } from '../enums/read-write-rate';
import { PersonnelCv } from './personnel-cv.interface';
import { PersonnelLanguageDefinition } from './personnel-language-definition.interface';

export interface PersonnelCvLanguage {
  Oid: number;
  ReadRate: ReadWriteRate;
  WriteRate: ReadWriteRate;
  TalkRate: ReadWriteRate;
  UnderStandRate: ReadWriteRate;
  PersonnelCv: Partial<PersonnelCv>;
  PersonnelLanguageDefinition: PersonnelLanguageDefinition;
  OtherLanguageName: string;
}
