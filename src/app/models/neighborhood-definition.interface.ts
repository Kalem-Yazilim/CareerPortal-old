import { StreetDefinition } from './street-definition.interface';
import { Base } from './_base.interface';

export interface NeighborhoodDefinition extends Base {
  StreetDefinitions: Array<StreetDefinition>;
}
