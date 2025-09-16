import { createSlice } from "@reduxjs/toolkit";
import { getAllSubscriptionPlan, purchaseSubscriptionPlan } from "../actions/subscriptions";

const initialStates = {
    isSubscriptionLoader: false,
    allSubscription: []
};

export const subscriptionSlice = createSlice({
    name: "Auth",
    initialState: initialStates,
    reducers: {},
    extraReducers: (builder) => {
        // getAllSubscriptionPlan
        builder.addCase(getAllSubscriptionPlan.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getAllSubscriptionPlan.fulfilled, (state, action) => {
            const { plans } = action?.payload || {};
            state.allSubscription = plans ?? []
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getAllSubscriptionPlan.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // purchaseSubscriptionPlan
        builder.addCase(purchaseSubscriptionPlan.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(purchaseSubscriptionPlan.fulfilled, (state, action) => {
            state.isSubscriptionLoader = false;
        });
        builder.addCase(purchaseSubscriptionPlan.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });
    }
});

export default subscriptionSlice.reducer;