import { createSlice } from "@reduxjs/toolkit";
import { smsConfirmation } from "../actions/authActions";

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
        // smsConfirmation
        builder.addCase(smsConfirmation.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(smsConfirmation.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            // state.policyData = data ?? "";
            state.isLoading = false;
        });
        builder.addCase(smsConfirmation.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});

export const { toggleChange } = authSlice.actions;
export default authSlice.reducer;