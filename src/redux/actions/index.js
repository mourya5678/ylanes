import axios from 'axios';
import { pipDeleteTokenAuth, pipGetAccessToken } from "../../auth/Pip";
import { BASE_URL, BASE_URL1 } from "../../routes/BackendRoutes";
import { pageRoutes } from '../../routes/PageRoutes';

export const API_REQUEST = async (props) => {
    const { BASE = BASE_URL, url, method, data, headers, params, isErrorToast = false, isSuccessToast = false, messageApi, isPaythonApi = false } = props;
    const token = pipGetAccessToken("yLanes_user_Token");
    const requestOptions = {
        url: !isPaythonApi ? BASE + url : BASE_URL1 + url,
        method,
        headers: {
            token: `${token}`,
            ...headers,
        },
        params: method === "GET" ? params : undefined,
        data: method !== "GET" ? data : undefined,
    };
    try {
        const response = await axios(requestOptions);
        if (method !== "GET") {
            isSuccessToast == true && messageApi.success(response?.message);
        } else if (response?.data?.success == false && method !== "GET") {
            isSuccessToast == true && messageApi.error(response?.message);
        };
        return response?.data;
    } catch (error) {
        if (isErrorToast) {
            if (error.response) {
                if (error?.response?.data?.status == 401) {
                    pipDeleteTokenAuth();
                    messageApi.error(error?.response?.data?.message);
                    window.location.href = pageRoutes?.login;
                    return;
                };
                messageApi.error(error?.response?.data?.errors?.message);
            } else if (error.request) {
                messageApi.error("No response received from server");
            } else {
                messageApi.error("Error:", error.message);
            };
        } else {
            if (error?.response) {
                if (error?.response?.data?.status == 401) {
                    messageApi.error(error?.response?.data?.message);
                    pipDeleteTokenAuth(error?.response?.data?.message);
                    window.location.href = pageRoutes?.login;
                    return;
                };
            };
        }
        throw error.response;
    }
};