import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    isLoading: false,
    isToggle: "1"
};

export const authSlice = createSlice({
    name: "Auth",
    initialState: initialStates,
    reducers: {
        toggleChange: (state, action) => {
            console.log({ payload: action?.payload })
            state.isToggle = action?.payload;
        },
    },
    extraReducers: (builder) => {

    }
});

export const { toggleChange } = authSlice.actions;
export default authSlice.reducer;