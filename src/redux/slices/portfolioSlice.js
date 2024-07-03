import { createSlice } from '@reduxjs/toolkit';

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState:{
        portfolios: [],
        portfolio: null,
        projectsInportfolio: [],
        projectsInportfolioCount: null,
        loading: false,
        isPortfolioCreated: false,
        isPortfolioDeleted: false,
        isPortfolioImageChanged: false,
    },
    reducers: {
        setPortfolios(state, action) {
            state.portfolios = action.payload;
        },
        setPortfolio(state ,action) {
            state.portfolio = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsPortfolioCreated(state) {
            state.isPortfolioCreated = true;
            state.loading = false;
        },
        clearIsPortfolioCreated(state) {
            state.isPortfolioCreated = false;
        },
        deletePortfolio(state, action){
            state.portfolios = state.portfolios.filter(p => p._id !== action.payload);
            state.isPortfolioDeleted = true;
        },
        clearIsPortfolioDeleted(state) {
            state.isPortfolioDeleted = false;
        },
        setIsPortfolioImageChanged(state) {
            state.isPortfolioImageChanged = true;
            state.loading = false
        },
        clearIsPortfolioImageChanged(state) {
            state.isPortfolioImageChanged = false;
        },
    }
});

const portfolioReducer = portfolioSlice.reducer;
const portfolioActions = portfolioSlice.actions;

export{ portfolioActions, portfolioReducer };