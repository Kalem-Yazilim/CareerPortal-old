import { PersonnelCv } from './personnel-cv.interface';

export interface PersonnelCvSendMail {
  Oid: Number;
  EmailTitle: string;
  EmailContent: string;
  SendDate: Date;
  Sender: string;
  PersonnelCv: PersonnelCv;
}
