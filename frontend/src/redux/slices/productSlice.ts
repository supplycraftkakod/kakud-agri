// store/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../../../config";

export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
        const response = await axios.get<any>(`${BE_URL}/api/v1/product?page=${page}&limit=${limit}&search=${search}`);
        return response.data;
    }
);

interface ProductState {
    products: any[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    totalPages: 1,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            });
    },
});

export default productSlice.reducer;
