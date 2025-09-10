import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { createPollAPI, getPollDataAPI, getRoomTypeAPI } from "../../routes/BackendRoutes";

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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
    };
});