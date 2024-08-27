import { PersonnelJobBranch } from './personnel-job-branch.interface';
import { Base } from './_base.interface';

export interface PersonnelJob extends Base {
  IsActive: boolean;
  JobBranch: Array<PersonnelJobBranch>;
}
