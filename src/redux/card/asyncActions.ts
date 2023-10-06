import { createAsyncThunk } from "@reduxjs/toolkit";
import { Card } from "./types";
import axios from "axios";

export const fetchCards = createAsyncThunk<Card[]>(
    'product/fetchProductsStatus',
    async () => {
        const { data } = await axios.get<Card[]>(
            "http://contest.elecard.ru/frontend_data/catalog.json"
        );

        return data
    }
)