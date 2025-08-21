import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { LoginSignupAPI } from "../../routes/BackendRoutes";

export const sellerLogin = createAsyncThunk("seller-login", async (props) => {
    const { payload, callback, messageApi } = props;
    try {
        const response = await API_REQUEST({
            url: LoginSignupAPI,
            method: "POST",
            data: payload,
            messageApi,
        });
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    };
});