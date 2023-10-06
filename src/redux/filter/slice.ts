import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  view: "cards",
  currentPage: 1,
  sort: {
    name: "категории",
    sortProperty: SortPropertyEnum.CATEGORY,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setView(state, action: PayloadAction<string>) {
      state.view = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.view = action.payload.view;
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.view = "cards";
        state.sort = {
          name: 'категории',
          sortProperty: SortPropertyEnum.CATEGORY,
        }
      }
    },
  },
});

export const { setView, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
