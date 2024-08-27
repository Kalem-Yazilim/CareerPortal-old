import { EducationStatus } from '../enums/education-status';
import { PersonnelCv } from './personnel-cv.interface';
import { PersonnelEducation } from './personnel-education.interface';
import { PersonnelSchoolDepartment } from './personnel-school-department.interface';
import { PersonnelSchool } from './personnel-school.interface';

export interface PersonnelCvEducation {
  Oid: number;
  Institue: string;
  InstitueDepartment: string;
  GraduationYear: string;
  GruaduationRate: string;
  SchoolName: string;
  NonSchoolName: string;
  NonSchoolBranch: string;
  EducationStatus: EducationStatus;
  PersonnelEducation: PersonnelEducation;
  PersonnelSchool: PersonnelSchool;
  PersonnelSchoolDepartment: PersonnelSchoolDepartment;
  PersonnelCv: Partial<PersonnelCv>;
}
