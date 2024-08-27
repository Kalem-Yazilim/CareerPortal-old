import { StateDefinition } from './state-definition.interface';
import { Base } from './_base.interface';

export interface CountryDefinition extends Base {
  BinaryCode: string;
  TripleCode: string;
  CountryCode: string;
  StateDefinitions: Array<StateDefinition>;
}
