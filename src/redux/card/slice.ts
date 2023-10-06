import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardSliceState, Status } from "./types";
import { fetchCards } from "./asyncActions";

const initialState: CardSliceState = {
    items: [],
    status: Status.LOADING,
};

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Card[]>) {
            state.items = action.payload;
        },
        sortItems(state, action: PayloadAction<any>) {
            console.log('action.payload: ', action.payload);
            switch (action.payload) {
                case "size":
                    state.items = state.items.sort((a, b) => a.filesize - b.filesize);
                    break;

                case "date":
                    state.items = state.items.sort((a, b) => a.timestamp - b.timestamp);
                    break;

                case "name":
                    state.items.sort((a, b) => {
                        const nameA = a.image.toUpperCase();
                        const nameB = b.image.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    break;

                default:
                    state.items.sort((a, b) => {
                        const nameA = a.category.toUpperCase();
                        const nameB = b.category.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCards.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchCards.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
});

export const { setItems, sortItems } = cardSlice.actions;

export default cardSlice.reducer;
