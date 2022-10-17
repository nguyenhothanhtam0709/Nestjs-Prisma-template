export class PaginateResult<T> {
  data: T;
  totalCount: number;
  pageSize: number;
  pageIndex: number;

  constructor(
    data: T,
    totalCount: number,
    pageSize: number,
    pageIndex: number,
  ) {
    this.data = data;
    this.totalCount = totalCount;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
