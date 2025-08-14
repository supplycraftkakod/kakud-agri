import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../../../../config";

export const fetchTeam = createAsyncThunk("team/fetchTeam", async () => {
    const res = await axios.get<any>(`${BE_URL}/api/v1/team`);
    return res.data.team;
});

const teamSlice = createSlice({
    name: "team",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchTeam.rejected, (state, action) => {
                state.loading = false;
                //@ts-ignore
                state.error = action.error.message || "Failed to load team";
            });
    },
});

export default teamSlice.reducer;
