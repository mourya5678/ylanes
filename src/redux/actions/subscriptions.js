import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { createSubscriptionPlanAPI, getAllDashboardSubscriptionPlanAPI, getAllSubscriptionPlanAPI, getUserSubscriptionPlanAPI, purchaseSubscriptionPlanAPI } from "../../routes/BackendRoutes";

export const getAllSubscriptionPlan = createAsyncThunk('get-subscription-plan', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllSubscriptionPlanAPI,
            method: "GET",
            messageApi
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
            messageApi
        });
        return response;
    } catch (error) {
    };
});

export const getDashboardAllSubscriptionPlan = createAsyncThunk('get-dashboard-subscription-plan', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllDashboardSubscriptionPlanAPI,
            method: "GET",
            messageApi
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