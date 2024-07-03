import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState:{
        categoreis: [],
    },
    reducers: {
        setCategoreis( state, action) {
            state.categoreis = action.payload;
        },
        addCategory (state, action) {
            state.categoreis.push(action.payload);
        },
        deleteCategory(state, action) {
            state.categoreis = state.categoreis.filter( c => c._id !== action.payload);
        }
    }
});
const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export{ categoryActions, categoryReducer };