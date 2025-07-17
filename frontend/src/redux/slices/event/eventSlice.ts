// src/redux/slices/eventSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../../../../config";

// Define the shape of the event state
interface Speaker {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
}

interface Venue {
    address: string;
    landmark: string;
    googleMapUrl: string;
}

interface Event {
    id: string;
    name: string;
    shortDesc: string;
    heroImageUrl: string;
    city: string;
    state: string;
    date: string;
    timing: string;
    registerLink: string;
    speakers: Speaker[];
    venue: Venue | null;
    whyAttend: string[];
    createdAt: string;
    updatedAt: string;
}

interface EventState {
    loading: boolean;
    error: string | null;
    data: Event | null;
}

// Initial state
const initialState: EventState = {
    loading: false,
    error: null,
    data: null,
};

// Async thunk to fetch event by ID
export const fetchEventById = createAsyncThunk(
    "event/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<any>(`${BE_URL}/api/v1/admin/event/${id}`);
            return response.data.event;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch event");
        }
    }
);

// Slice
const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        clearEvent(state) {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<Event>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Export actions and reducer
export const { clearEvent } = eventSlice.actions;
export default eventSlice.reducer;
