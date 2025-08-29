import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { SMSConfirmationAPI } from "../../routes/BackendRoutes";

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
        console.log({ response });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});