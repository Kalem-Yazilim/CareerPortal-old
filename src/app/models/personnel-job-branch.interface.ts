import { PersonnelJob } from './personnel-job.interface';
import { Base } from './_base.interface';

export interface PersonnelJobBranch extends Base {
  IsActive: boolean;
  PersonnelJob: Array<PersonnelJob>;
}
