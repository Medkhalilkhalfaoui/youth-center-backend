import { SortOrder } from 'src/shared/types/enums';

export interface IFindProviderOptions {
  active?: boolean;
  take?: number;
  skip?: number;
  orderKey?: SortOrder;
  keyword?: string;
}
