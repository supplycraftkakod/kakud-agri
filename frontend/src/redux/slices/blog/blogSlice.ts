import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_URL } from '../../../../config';

interface ContentBlock {
    type: 'bigHeading' | 'subHeading' | 'paragraph' | 'image';
    value?: string;
}

interface Blog {
    id: string;
    title: string;
    contentBlocks: ContentBlock[];
    createdAt: string;
}

interface BlogState {
    blogs: Blog[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    search: string;
}

const initialState: BlogState = {
    blogs: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    search: '',
};

export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async (
        { page, limit, search, selectedCategory }: { page: number; limit: number; search: string, selectedCategory?: string },
        thunkAPI
    ) => {
        try {
            const authStorage = localStorage.getItem("auth");
            let token;

            if (authStorage) {
                const authData = JSON.parse(authStorage);
                token = authData.token;
            }

            const res = await axios.get<any>(`${BE_URL}/api/v1/admin/all`, {
                params: { page, limit, search, category: selectedCategory },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.error || 'Failed to fetch blogs'
            );
        }
    }
);

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
            state.page = 1;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload.blogs;
                state.totalPages = action.payload.totalPages || 1;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearch, setPage } = blogSlice.actions;
export default blogSlice.reducer;
