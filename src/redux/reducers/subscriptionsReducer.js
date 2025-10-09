import { createSlice } from "@reduxjs/toolkit";
import { convertRupeeToYCoinData, getAllSubscriptionPlan, getDashboardAllSubscriptionPlan, getDashboardReview, getDashboardTopicAndDetails, getDashboardWhyYlanes, getTaxDeatils, getTopUpPlan, getUserSubscriptionPlan, purchaseSubscriptionPlan, topUpUserWalletYCoins, verifyPaymentTransactionData } from "../actions/subscriptions";

const initialStates = {
    isSubscriptionLoader: false,
    allSubscription: [],
    allDashboardSubscription: [],
    userPlan: [],
    topUpPlan: [],
    tax: 0,
    convertRupeeToYCoins: 1,
    whyYlanesData: [],
    buzzList: [],
    reviewList: [],
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
            state.allDashboardSubscription = data ?? []
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

        // getDashboardWhyYlanes
        builder.addCase(getDashboardWhyYlanes.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getDashboardWhyYlanes.fulfilled, (state, action) => {
            const { data } = action?.payload ?? {};
            state.whyYlanesData = data ?? [];
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getDashboardWhyYlanes.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // getTopUpPlan
        builder.addCase(getTopUpPlan.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getTopUpPlan.fulfilled, (state, action) => {
            state.topUpPlan = action?.payload ?? [];
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getTopUpPlan.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // topUpUserWalletYCoins
        builder.addCase(topUpUserWalletYCoins.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(topUpUserWalletYCoins.fulfilled, (state, action) => {
            state.isSubscriptionLoader = false;
        });
        builder.addCase(topUpUserWalletYCoins.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // getTaxDeatils
        builder.addCase(getTaxDeatils.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getTaxDeatils.fulfilled, (state, action) => {
            const { data } = action?.payload;
            state.tax = data?.constant_value ?? 0;
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getTaxDeatils.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // convertRupeeToYCoinData
        builder.addCase(convertRupeeToYCoinData.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(convertRupeeToYCoinData.fulfilled, (state, action) => {
            const { data } = action?.payload;
            var value = Number(
                String(data?.constant_value).replace(/[^0-9.]/g, "")
            );
            state.convertRupeeToYCoins = value ?? 0;
            state.isSubscriptionLoader = false;
        });
        builder.addCase(convertRupeeToYCoinData.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // verifyPaymentTransactionData
        builder.addCase(verifyPaymentTransactionData.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(verifyPaymentTransactionData.fulfilled, (state, action) => {
            state.isSubscriptionLoader = false;
        });
        builder.addCase(verifyPaymentTransactionData.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // getDashboardTopicAndDetails
        builder.addCase(getDashboardTopicAndDetails.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getDashboardTopicAndDetails.fulfilled, (state, action) => {
            const { data } = action?.payload ?? {};
            state.buzzList = data ?? [];
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getDashboardTopicAndDetails.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });

        // getDashboardReview
        builder.addCase(getDashboardReview.pending, (state, action) => {
            state.isSubscriptionLoader = true;
        });
        builder.addCase(getDashboardReview.fulfilled, (state, action) => {
            const { data } = action?.payload ?? {};
            state.reviewList = data ?? [];
            state.isSubscriptionLoader = false;
        });
        builder.addCase(getDashboardReview.rejected, (state, action) => {
            state.isSubscriptionLoader = false;
        });
    }
});

export default subscriptionSlice.reducer;