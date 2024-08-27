import { Base } from './_base.interface';

export interface EducationDefinition extends Base {
  EducationDesc: string;
  EducationObjective: string;
  EducationContent: string;
  MinAttender: number;
  MaxAttender: number;
  EducationAttenderSum: number;
  ApprovedEducationAttenderCount: number;
  Active: 'Active' | 'Passive';
}
