import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { blockUserAPI, commentPostAPI, createPollAPI, CreatePostAPI, deleteNotificationAPI, getAllConnectionsAPI, getAllPostAPI, getFaqListAPI, getLandingFaqAPI, getNotificationAPI, getPostTopicsAPI, getPrivacyPolicyDataAPI, getRoomTypeAPI, getTermsConditionsDataAPI, getWalletTransactionHistoryAPI, likePostAPI, markAsReadToAllNotificationsAPI, sendFeedbackAPI, SMSConfirmationAPI, updateUserProfileAPI, userOnboardAPI, userProfileAPI } from "../../routes/BackendRoutes";

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
            isSuccessToast: false,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error)
        callback(null, error);
    };
});

// CreatePostAPI
export const deleteUserPost = createAsyncThunk("delete-user-post", async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: CreatePostAPI + `/${payload}`,
            method: "DELETE",
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error)
        callback(null, error);
    };
});

export const deleteUserPoll = createAsyncThunk("delete-user-poll", async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: createPollAPI + `/${payload}`,
            method: "DELETE",
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

export const getPostDataByID = createAsyncThunk('get-post-by-id', async (props) => {
    const { messageApi, payload } = props;
    try {
        const response = await API_REQUEST({
            url: commentPostAPI + `${payload.slice(1)}/public_show`,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getLikeAllPost = createAsyncThunk('get-like-all-post', async (props) => {
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
            isSuccessToast: false,
            isErrorToast: false,
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
    const { payload, callback, messageApi, params } = props;
    try {
        const response = await API_REQUEST({
            url: commentPostAPI + params,
            method: "POST",
            data: payload,
            messageApi,
            isSuccessToast: false,
            isErrorToast: false
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error);
        callback(null, error);
    };
});


// getPollDataAPI
export const getAllPostComment = createAsyncThunk('post-comment', async (props) => {
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

export const getAllPostCommentss = createAsyncThunk('get-post-commentss', async (props) => {
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
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
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
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
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
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
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
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
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

// Notification deleteNotificationAPI
export const getNotificationData = createAsyncThunk('get-notification', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getNotificationAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const deleteNotificationData = createAsyncThunk('delete-notification', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: deleteNotificationAPI + payload,
            method: "DELETE",
            messageApi,
            isSuccessToast: false,
            isErrorToast: false
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error);
        callback(null, error);
    }
});

export const markAsReadToAllNotificationsDate = createAsyncThunk('mark-as-read', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: markAsReadToAllNotificationsAPI,
            isSuccessToast: false,
            isErrorToast: false,
            method: "PUT",
            messageApi,
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getLandingPageFaq = createAsyncThunk('get-landing-faq', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getLandingFaqAPI,
            method: "GET",
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const userOnboarding = createAsyncThunk('user-onboarding', async (props) => {
    const { callback, payload, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: userOnboardAPI,
            method: "POST",
            data: payload,
            messageApi,
            isErrorToast: false,
            isSuccessToast: false,
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error);
        callback(null, error)
    };
});

export const updatePostDetails = createAsyncThunk('update-post', async (props) => {
    const { messageApi, payload, param, callback } = props;
    try {
        const response = await API_REQUEST({
            url: commentPostAPI + param,
            method: "PUT",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
        console.log({ error });
    };
});

export const blockUserData = createAsyncThunk('block-user', async (props) => {
    const { messageApi, payload, callback } = props;
    try {
        const response = await API_REQUEST({
            url: blockUserAPI,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
        console.log({ error });
    };
});