import { SortOrder } from 'src/shared/types/enums';

export interface IFindQueryOptions {
  take?: number;
  skip?: number;
  orderKey?: SortOrder;
  keyword?: string;
  status?: string[];
}
