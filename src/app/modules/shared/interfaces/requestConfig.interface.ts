import { ODataQueryOptionsHandler, ODataStructuredType } from 'angular-odata';
import { Column } from 'src/app/modules/shared/interfaces/column.interface';

export type QueryType<T=any> =(q: ODataQueryOptionsHandler<T>, s?: ODataStructuredType<T>) => void

export interface RequestConfig<T=any> {
  columns: Column[];
  url:string;
  query?: QueryType<T>
}
