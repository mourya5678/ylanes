import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { createSubscriptionPlanAPI, getAllDashboardSubscriptionPlanAPI, getAllSubscriptionPlanAPI, getAllTopicAndDetailAPI, getReviewDataAPI, getTaxDataAPI, getTopupPlanAPI, getUserSubscriptionPlanAPI, getWhyYlanesDataAPI, purchaseSubscriptionPlanAPI, rupeeToYCoinConvertion, topupWalletAPI, verifyPaymentTransactionAPI } from "../../routes/BackendRoutes";

export const getAllSubscriptionPlan = createAsyncThunk('get-subscription-plan', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllSubscriptionPlanAPI,
            method: "GET",
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        return response;
    } catch (error) {
    };
});

export const getUserSubscriptionPlan = createAsyncThunk('get-user-subscription-plan', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getUserSubscriptionPlanAPI,
            method: "GET",
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        return response;
    } catch (error) {
    };
});

export const getTopUpPlan = createAsyncThunk('get-top-up-plan', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getTopupPlanAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    };
});

// getTaxDataAPI
export const getTaxDeatils = createAsyncThunk('get-tax', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getTaxDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    };
});

// rupeeToYCoinConvertion
export const convertRupeeToYCoinData = createAsyncThunk('convert-rupee-to-ycoin', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: rupeeToYCoinConvertion,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    };
});

// topupWalletAPI
export const topUpUserWalletYCoins = createAsyncThunk('top-up-ycoins', async (props) => {
    const { messageApi, callback, params, payload } = props;
    try {
        const response = await API_REQUEST({
            url: topupWalletAPI + params,
            method: "POST",
            isSuccessToast: false,
            messageApi,
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

// verifyPaymentTransactionAPI
export const verifyPaymentTransactionData = createAsyncThunk('verify-payment', async (props) => {
    const { messageApi, callback, payload } = props;
    try {
        const response = await API_REQUEST({
            url: verifyPaymentTransactionAPI,
            method: "PUT",
            data: payload,
            isSuccessToast: false,
            messageApi,
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});


export const getDashboardAllSubscriptionPlan = createAsyncThunk('get-dashboard-subscription-plan', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllDashboardSubscriptionPlanAPI,
            method: "GET",
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        return response;
    } catch (error) {
    };
});

export const purchaseSubscriptionPlan = createAsyncThunk('purchase-subscription-plan', async (props) => {
    const { messageApi, callback, payload } = props;
    try {
        const response = await API_REQUEST({
            url: purchaseSubscriptionPlanAPI + payload,
            method: "POST",
            isSuccessToast: false,
            messageApi,
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});
// createSubscriptionPlanAPI

export const createSubscriptionPlan = createAsyncThunk('create-subscription-plan', async (props) => {
    const { messageApi, callback, payload } = props;
    try {
        const response = await API_REQUEST({
            url: createSubscriptionPlanAPI,
            data: payload,
            method: "POST",
            isSuccessToast: false,
            messageApi,
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

// get Why Ylanes
export const getDashboardWhyYlanes = createAsyncThunk('get-dashboard-why-ylanes', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getWhyYlanesDataAPI,
            method: "GET",
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        return response;
    } catch (error) {
    };
});

// Get Topic And Details
export const getDashboardTopicAndDetails = createAsyncThunk('get-dashboard-topic-details', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllTopicAndDetailAPI,
            method: "GET",
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        return response;
    } catch (error) {
    };
});

// Get Reviews
export const getDashboardReview = createAsyncThunk('get-dashboard-review', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getReviewDataAPI,
            method: "GET",
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        return response;
    } catch (error) {
    };
});