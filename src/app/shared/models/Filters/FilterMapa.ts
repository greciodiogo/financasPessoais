import { FilterInterface } from '@app/shared/interfaces/FilterInterface';
export class FilterMapa implements FilterInterface {
  search: string = '';
  orderBy: string = '';
  typeOrderBy: string = 'DESC';
  typeFilter: string = '';
  typeDocument: string = '';
  startDate: Date;
  endDate: Date;
  userId: string = '' ;
  lojaId: string = '' ;
  constructor() {
  }
}
