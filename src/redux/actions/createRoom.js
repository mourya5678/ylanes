import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { createPollAPI, createRoomAPI, getAgoraTokenAPI, getAllChatUserAPI, getAllConnectionsAPI, getAllUpcommingRoomDataAPI, getDiscoverAllConnectionAPI, getPollDataAPI, getPreviousMessagesAPI, getRoomTypeAPI, sendInvitationToUserAPI, sendMessageToUserAPI } from "../../routes/BackendRoutes";

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

export const createRoomData = createAsyncThunk('create-room', async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: createRoomAPI,
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
            isSuccessToast: false
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