export enum SortPropertyEnum {
    CATEGORY = "category",
    DATE = "date",
    NAME = "name",
    SIZE = "size"
  }
  
  export type Sort = {
    name: string,
    sortProperty: SortPropertyEnum,
  }
  
  export interface FilterSliceState {
    view: string,
    currentPage: number,
    sort: Sort,
  }