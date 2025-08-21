import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    isLoading: false
};

export const authSlice = createSlice({
    name: "Auth",
    initialState: initialStates,
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default authSlice.reducer;