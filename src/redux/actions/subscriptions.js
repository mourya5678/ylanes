import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { createSubscriptionPlanAPI, getAllSubscriptionPlanAPI, purchaseSubscriptionPlanAPI } from "../../routes/BackendRoutes";

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