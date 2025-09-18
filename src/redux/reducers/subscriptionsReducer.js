import { createSlice } from "@reduxjs/toolkit";
import { getAllSubscriptionPlan, getDashboardAllSubscriptionPlan, getUserSubscriptionPlan, purchaseSubscriptionPlan } from "../actions/subscriptions";

const initialStates = {
    isSubscriptionLoader: false,
    allSubscription: [],
    allDashboardSubscription: [],
    userPlan: []
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

        // getDashboardAllSubscriptionPlan
        builder.addCase(getDashboardAllSubscriptionPlan.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getDashboardAllSubscriptionPlan.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.allDashboardSubscription = data?.plans ?? []
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getDashboardAllSubscriptionPlan.rejected, (state, action) => {
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

        // getUserSubscriptionPlan
        builder.addCase(getUserSubscriptionPlan.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getUserSubscriptionPlan.fulfilled, (state, action) => {
            state.userPlan = action?.payload ?? [];
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getUserSubscriptionPlan.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });
    }
});

export default subscriptionSlice.reducer;