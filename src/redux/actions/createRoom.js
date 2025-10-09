import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { cancelRoomByHostAPI, cancelRoomByUserAPI, createPollAPI, createRoomAPI, disconnectUserAPI, getAgoraTokenAPI, getAllChatUserAPI, getAllConnectionsAPI, getAllMyRoomsDataAPI, getAllPastRoomDataAPI, getAllRecommendedRoomsDataAPI, getAllUpcommingRoomDataAPI, getDiscoverAllConnectionAPI, getPollCommentAPI, getPollDataAPI, getPreviousMessagesAPI, getRoomTypeAPI, registerRoomAPI, sendInvitationToUserAPI, sendMessageToUserAPI } from "../../routes/BackendRoutes";

export const getRoomTypeData = createAsyncThunk('get-room-type', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getRoomTypeAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    };
});

export const createPollData = createAsyncThunk('create-roll', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: createPollAPI,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

// getPollCommentAPI
export const getPollCommentData = createAsyncThunk('get-poll-comments', async (props) => {
    const { payload, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getPollCommentAPI + payload + '/comments',
            method: "GET",
            // data: payload,
            messageApi
        });
        return response;
    } catch (error) {
    };
});

export const getPollCommentDatass = createAsyncThunk('get-poll-commentsss', async (props) => {
    const { payload, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getPollCommentAPI + payload + '/comments',
            method: "GET",
            // data: payload,
            messageApi
        });
        return response;
    } catch (error) {
    };
});

export const getPollTypeData = createAsyncThunk('get-poll-data', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getPollDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    };
});

export const getPollTypeDatass = createAsyncThunk('get-poll-datass', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getPollDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    };
});

export const answerPollData = createAsyncThunk('answer-poll', async (props) => {
    const { payload, callback, param, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getPollCommentAPI + `${param}/votes`,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

// Poll Comments
export const commentUserPoll = createAsyncThunk('comment-poll', async (props) => {
    const { payload, callback, messageApi, params } = props;
    try {
        const response = await API_REQUEST({
            url: getPollCommentAPI + params,
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

export const createRoomData = createAsyncThunk('create-room', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: createRoomAPI,
            method: "POST",
            data: payload,
            messageApi,
            isSuccessToast: false,
            isErrorToast: false,
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

export const getMyConnectionsData = createAsyncThunk('get-connection-data', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllConnectionsAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    }
});

export const descoverAllConnectionsData = createAsyncThunk('discover-all-connection', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getDiscoverAllConnectionAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
    }
});

export const sendInvitationToUser = createAsyncThunk('send-invite', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: sendInvitationToUserAPI,
            method: "POST",
            data: payload,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

export const disconnectUserConnection = createAsyncThunk('disconnect-user', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: disconnectUserAPI + payload,
            method: "POST",
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

export const getAllChatUsersData = createAsyncThunk('chat-user-data', async (props) => {
    const { payload, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllChatUserAPI,
            method: "POST",
            data: payload,
            messageApi,
            isPaythonApi: true,
            isSuccessToast: false
        });
        return response;
    } catch (error) {
    }
});

export const getAllChatAfterReciveUsersData = createAsyncThunk('chat-reciver-data', async (props) => {
    const { payload, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllChatUserAPI,
            method: "POST",
            data: payload,
            messageApi,
            isPaythonApi: true,
            isSuccessToast: false,
            isErrorToast: false
        });
        return response;
    } catch (error) {
    }
});

export const getAllPreviousMessages = createAsyncThunk('get-previous-message', async (props) => {
    const { payload, messageApi, callback, params } = props;
    try {
        const response = await API_REQUEST({
            url: getPreviousMessagesAPI + params,
            method: "POST",
            data: payload,
            isPaythonApi: true,
            isSuccessToast: false,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

export const getUserAgoraToken = createAsyncThunk('get-agora-token', async (props) => {
    const { payload, messageApi, callback } = props;
    try {
        const response = await API_REQUEST({
            url: getAgoraTokenAPI,
            method: "POST",
            data: payload,
            isPaythonApi: true,
            isSuccessToast: false,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

// sendMessageToUserAPI
export const sendMessageToUser = createAsyncThunk('send-message-to-user', async (props) => {
    const { payload, messageApi, callback } = props;
    try {
        const response = await API_REQUEST({
            url: sendMessageToUserAPI,
            method: "POST",
            data: payload,
            isPaythonApi: true,
            isSuccessToast: false,
            isErrorToast: false,
            messageApi
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});

export const getAllUserPreviousMessages = createAsyncThunk('get-user-previous-message', async (props) => {
    const { payload, messageApi, params } = props;
    try {
        const response = await API_REQUEST({
            url: getPreviousMessagesAPI + params,
            method: "POST",
            data: payload,
            isPaythonApi: true,
            isSuccessToast: false,
            isErrorToast: false,
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

// My Rooms
export const getUpcommingRoomData = createAsyncThunk('get-upcomming-room-list', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllUpcommingRoomDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getPastRoomData = createAsyncThunk('get-past-room-list', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllPastRoomDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getRecommendedRoomData = createAsyncThunk('get-recommended-room-list', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllRecommendedRoomsDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const getMyRoomData = createAsyncThunk('get-my-room-list', async (props) => {
    const { messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: getAllMyRoomsDataAPI,
            method: "GET",
            messageApi
        });
        return response;
    } catch (error) {
        console.log(error);
    };
});

export const registerRoomData = createAsyncThunk('register-room', async (props) => {
    const { payload, callback, messageApi, param } = props;
    try {
        const response = await API_REQUEST({
            url: registerRoomAPI + param,
            method: "POST",
            data: payload,
            messageApi,
            isSuccessToast: false,
            isErrorToast: false,
        });
        callback(response);
        return response;
    } catch (error) {
        messageApi.error(error?.data?.errors[0]?.message)
        callback(null, error);
    };
});

// Cancel Room By Host
export const roomCancelByHost = createAsyncThunk('room-cancel-by-host', async (props) => {
    const { payload, callback, messageApi, headers } = props;
    try {
        const response = await API_REQUEST({
            url: cancelRoomByHostAPI,
            method: "POST",
            data: payload,
            headers: headers,
            messageApi,
            isSuccessToast: false,
            isErrorToast: false,
        });
        callback(response);
        return response;
    } catch (error) {
        messageApi.error(error?.data?.errors[0]?.message)
        callback(null, error);
    };
});

export const roomCancelByUser = createAsyncThunk('room-cancel-by-user', async (props) => {
    const { payload, callback, messageApi, headers } = props;
    try {
        const response = await API_REQUEST({
            url: cancelRoomByUserAPI + payload,
            method: "POST",
            headers: headers,
            messageApi,
            isSuccessToast: false,
            isErrorToast: false,
        });
        callback(response);
        return response;
    } catch (error) {
        messageApi.error(error?.data?.errors[0]?.message)
        callback(null, error);
    };
});