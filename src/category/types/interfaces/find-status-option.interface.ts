import { SortOrder } from 'src/shared/types/enums';

export interface IFindStatusOptions {
  active?: boolean;
  take?: number;
  skip?: number;
  orderKey?: SortOrder;
  keyword?: string;
  provider?: string;
  code_article?: string;
  name?: string;
}
