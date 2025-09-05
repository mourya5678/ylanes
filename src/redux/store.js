import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import createRoomReducer from "./reducers/createRoomReducers";

const store = configureStore({
    reducer: {
        authReducer,
        createRoomReducer
    },
});

export default store;