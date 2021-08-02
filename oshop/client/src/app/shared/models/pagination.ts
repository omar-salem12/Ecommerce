
import { IProduct } from './product';
export interface IPagination {

  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  items: IProduct[];
}
