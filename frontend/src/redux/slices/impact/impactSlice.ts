import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../../../../config";

export const fetchImpactData = createAsyncThunk("impact/fetch", async () => {
    const response = await axios.get<any>(`${BE_URL}/api/v1/impact`);
    return response.data.data;
});

interface ImpactItem {
    id: number;
    number: string;
    label: string;
    imageUrl: string;
}

interface ImpactState {
    data: ImpactItem[];
    loading: boolean;
    error: string | null;
}

const initialState: ImpactState = {
    data: [],
    loading: false,
    error: null,
};

const impactSlice = createSlice({
    name: "impact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImpactData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchImpactData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchImpactData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch";
            });
    },
});

export default impactSlice.reducer;
