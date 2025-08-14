import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../../../config";

interface ProductState {
    product: any;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    product: null,
    loading: false,
    error: null,
};

// Async thunk to fetch single product
export const fetchProductById = createAsyncThunk(
    "singleProduct/fetchById",
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<any>(`${BE_URL}/api/v1/product/${id}`);
            return response.data.product;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch product");
        }
    }
);

const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {
        clearProduct: (state) => {
            state.product = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;
