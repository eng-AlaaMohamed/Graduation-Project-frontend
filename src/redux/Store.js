import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { userReducer } from "./slices/usersSlice";
import { projectReducer } from "./slices/projectsSlice";
import { categoryReducer } from "./slices/categorySlice";
import { portfolioReducer } from "./slices/portfolioSlice";
import { passwordReducer } from "./slices/passwordSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        user: userReducer,
        project: projectReducer,
        category: categoryReducer,
        portfolio: portfolioReducer,
        password: passwordReducer,
    }
});

export default store;