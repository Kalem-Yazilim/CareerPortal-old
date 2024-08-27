import { PersonnelSchoolDepartment } from './personnel-school-department.interface';

export interface PersonnelSchool {
  SchoolName: string;
  Code: string;
  PersonnelSchoolDepartment: Array<PersonnelSchoolDepartment>;
}
