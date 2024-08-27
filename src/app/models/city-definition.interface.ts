import { DistrictDefinition } from './district-definition.interface';
import { StateDefinition } from './state-definition.interface';
import { Base } from './_base.interface';

export interface CityDefinition extends Base {
  PlateNo: string;
  CityMernisCode: string;
  StateDefinition: StateDefinition;
  DistrictDefinitions: Array<DistrictDefinition>;
}
