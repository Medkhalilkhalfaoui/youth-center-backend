import { SortOrder } from '../enums';

export interface IFindPaginationOptions {
  take?: number;
  skip?: number;
  order?: SortOrder;
}
