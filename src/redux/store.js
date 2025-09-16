import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import createRoomReducer from "./reducers/createRoomReducers";
import subscriptionReducer from "./reducers/subscriptionsReducer";


const store = configureStore({
    reducer: {
        authReducer,
        createRoomReducer,
        subscriptionReducer
    },
});

export default store;