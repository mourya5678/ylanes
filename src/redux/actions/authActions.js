import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { commentPostAPI, CreatePostAPI, getAllPostAPI, getFaqListAPI, getNotificationAPI, getPostTopicsAPI, getPrivacyPolicyDataAPI, getRoomTypeAPI, getTermsConditionsDataAPI, getWalletTransactionHistoryAPI, likePostAPI, sendFeedbackAPI, SMSConfirmationAPI, updateUserProfileAPI, userProfileAPI } from "../../routes/BackendRoutes";

export const smsConfirmation = createAsyncThunk("sms-confirmation", async (props) => {
    const { payload, callback, messageApi, myHeaders } = props;
    try {
        const response = await API_REQUEST({
            url: SMSConfirmationAPI,
            method: "POST",
            data: payload,
            messageApi,
            headers: myHeaders
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

export const createUserPost = createAsyncThunk("create-post", async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: CreatePostAPI,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error)
        callback(null, error);
    };
});

export const getPostTopics = createAsyncThunk('get-post-topic', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getPostTopicsAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getAllPost = createAsyncThunk('get-all-post', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllPostAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const likeUserPost = createAsyncThunk('like-post', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: likePostAPI,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error);
        callback(null, error);
    };
});

export const commentUserPost = createAsyncThunk('comment-post', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: commentPostAPI,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error);
        callback(null, error);
    };
});

export const getAllPostComment = createAsyncThunk('get-post-comment', async (props) => {
    const { payload, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllPostAPI + `/${payload}/comments`,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getMyProfileData = createAsyncThunk('get-profile-data', async (props) => {
    const { payload, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: userProfileAPI + payload,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const updateUserProfileData = createAsyncThunk('update-user-profile', async (props) => {
    const { callback, payload, messageApi, data } = props;
    try {
        const response = await API_REQUEST({
            url: updateUserProfileAPI + data,
            method: "PATCH",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error);
        callback(null, error)
    };
});

// getWalletTransactionHistoryAPI

export const getWalletTransaction = createAsyncThunk('wallet-transaction', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getWalletTransactionHistoryAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getFaqData = createAsyncThunk('get-faq', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getFaqListAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getNotificationData = createAsyncThunk('get-notification', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getNotificationAPI,
            method: "GET",
            data: "",
            headers: {
                deviceType: 'WEB',
            },
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

// getTermsConditionsDataAPI
export const getTermsConditionData = createAsyncThunk('get-term-condition', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getTermsConditionsDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getPrivacyPolicyData = createAsyncThunk('get-privacy-policy', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getPrivacyPolicyDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const provideFeedBackData = createAsyncThunk('send-feedback', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: sendFeedbackAPI,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error);
        callback(null, error);
    }
});