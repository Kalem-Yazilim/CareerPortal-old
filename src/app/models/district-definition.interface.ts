import { AreaDefinition } from './area-definition.interface';
import { CityDefinition } from './city-definition.interface';
import { Base } from './_base.interface';

export interface DistrictDefinition extends Base {
  DistrictMernisCode: string;
  CityDefinition: CityDefinition;
  AreaDefinitions: Array<AreaDefinition>;
}
