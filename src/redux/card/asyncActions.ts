import { createAsyncThunk } from "@reduxjs/toolkit";
import { Card } from "./types";
import axios from "axios";
import { baseName } from "../../main";

export const fetchCards = createAsyncThunk<Card[]>(
    'product/fetchProductsStatus',
    async () => {
        try {
            const { data } = await axios.get<Card[]>(
                "http://contest.elecard.ru/frontend_data/catalog.json"
            );
            return data.map(item => { item.image = 'http://contest.elecard.ru/frontend_data/' + item.image; return item });
        } catch (e) {
            console.warn('не смог загрузить данные, использую локальные: ', e);

            const { data } = await axios.get<Card[]>(
                baseName + 'catalog.json'
            );
            return data.map(item => { item.image = baseName + item.image; return item });
        }
    }
)