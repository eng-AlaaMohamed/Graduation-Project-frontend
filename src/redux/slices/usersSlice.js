import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState:{
        users: [],
        usersCate: []
    },
    reducers: {
        setUsers( state, action) {
            state.users = action.payload;
        },
        setUsersCate( state, action) {
            state.usersCate = action.payload;
        }
    }
});
const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export{ userActions, userReducer };