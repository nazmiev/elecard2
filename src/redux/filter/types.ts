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

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export const sortList: SortItem[] = [
  { name: "category", sortProperty: SortPropertyEnum.CATEGORY },
  { name: "date", sortProperty: SortPropertyEnum.DATE },
  { name: "name", sortProperty: SortPropertyEnum.NAME },
  { name: "size", sortProperty: SortPropertyEnum.SIZE },
];