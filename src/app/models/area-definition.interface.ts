import { NeighborhoodDefinition } from './neighborhood-definition.interface';
import { Base } from './_base.interface';

export interface AreaDefinition extends Base {
  NeighborhoodDefinitions: Array<NeighborhoodDefinition>;
}
