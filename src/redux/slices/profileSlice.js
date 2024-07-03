import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState:{
        profile: null,
        usersCount: null,
        profiles: [],
        loading: false,
        loadingDelete: false,
        isProfileDeleted: false,
    },
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
        setProfilePhoto(state, action) {
            state.profile.profilePhoto = action.payload;
        },
        updateProfile (state,action){
            state.profile = action.payload;
        },
        setUserCount(state, action) {
            state.usersCount = action.payload;
        },
        setProfiles(state, action) {
            state.profiles = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setLoadingDelete(state) {
            state.loadingDelete = true;
        },
        clearLoadingDelete(state) {
            state.loadingDelete = false;
        },
        setIsProfileDeleted(state) {
            state.isProfileDeleted = true;
            state.loadingDelete = false;
        },
        clearIsProfileDeleted(state) {
            state.isProfileDeleted = false;
        },
    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export{ profileActions, profileReducer };