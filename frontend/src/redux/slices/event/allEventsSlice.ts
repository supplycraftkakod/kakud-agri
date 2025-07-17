// src/redux/allallEventsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_URL } from '../../../../config';

interface Speaker {
    id: string;
    name: string;
    imageUrl: string;
    role: string;
}

interface Venue {
    id: string;
    address: string;
    landmark?: string;
    googleMapUrl: string;
}

interface WhyAttendPoint {
    id: string;
    point: string;
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
    venue?: Venue;
    whyAttend: WhyAttendPoint[];
    createdAt: string;
    updatedAt: string;
}

interface EventState {
    events: Event[];
    loading: boolean;
    error: string | null;
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
};

export const fetchAllEvents = createAsyncThunk(
    'events/fetchAll',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get<any>(`${BE_URL}/api/v1/admin/event`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

const allEventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default allEventsSlice.reducer;
