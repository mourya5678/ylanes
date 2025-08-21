import axios from 'axios';
import { pipDeleteTokenAuth, pipGetAccessToken } from "../../auth/Pip";
import { BASE_URL } from "../../routes/BackendRoutes";
import { pageRoutes } from '../../routes/PageRoutes';

export const API_REQUEST = async (props) => {
    const { BASE = BASE_URL, url, method, data, headers, params, isErrorToast = true, isSuccessToast = true, messageApi } = props;
    const token = pipGetAccessToken("seller_token");
    const requestOptions = {
        url: BASE + url,
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            ...headers,
        },
        params: method === "GET" ? params : undefined,
        data: method !== "GET" ? data : undefined,
    };

    try {
        const response = await axios(requestOptions);
        if (method !== "GET" && response?.data?.success == true) {
            isSuccessToast == true && messageApi.success(response?.data?.message);
        } else if (response?.data?.success == false && method !== "GET") {
            isSuccessToast == true && messageApi.error(response?.data?.message);
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
                messageApi.error(error?.response?.data?.message);
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