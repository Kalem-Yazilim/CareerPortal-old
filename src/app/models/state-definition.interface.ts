import { CityDefinition } from './city-definition.interface';
import { CountryDefinition } from './country-definition.interface';
import { Base } from './_base.interface';

export interface StateDefinition extends Base {
  CountryDefinition: CountryDefinition;
  CityDefinitions: Array<CityDefinition>;
}
