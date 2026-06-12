import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    photo: string;
    cover: string;
    followersCount: number;
    followingCount: number;
    bookmarksCount: number;
}

interface ProfileState {
    user: User | null;
    loading: boolean;
    uploadLoading: boolean;
}

const initialState: ProfileState = {
    user: null,
    loading: false,
    uploadLoading: false,
}

export const getMyProfile = createAsyncThunk<User, void, { state: RootState }>(
    'profile/getMyProfile',
    async (_, myStore) => {
        const token = myStore.getState().userReducer.token;
        const { data } = await axios.get(
            'https://route-posts.routemisr.com/users/profile-data',
            { headers: { AUTHORIZATION: `Bearer ${token}` } }
        );
        return data.data.user;
    }
);

export const uploadProfilePhoto = createAsyncThunk<User, FormData, { state: RootState }>(
    'profile/uploadPhoto',
    async (formData, myStore) => {
        const token = myStore.getState().userReducer.token;
        const { data } = await axios.put(
            'https://route-posts.routemisr.com/users/upload-photo',
            formData,
            { headers: { AUTHORIZATION: `Bearer ${token}` } }
        );
        return data.data.user;
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyProfile.pending, (state) => { state.loading = true })
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(getMyProfile.rejected, (state) => { state.loading = false })

        builder.addCase(uploadProfilePhoto.pending, (state) => { state.uploadLoading = true })
        builder.addCase(uploadProfilePhoto.fulfilled, (state, action) => {
            state.uploadLoading = false;
            state.user = action.payload;
        })
        builder.addCase(uploadProfilePhoto.rejected, (state) => { state.uploadLoading = false })
    }
});

export const profileReducer = profileSlice.reducer;