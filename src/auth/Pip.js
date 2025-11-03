import moment from "moment";
export const curSym = '$';

export const pipGetAccessToken = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : "";
};

export const pipSetAccessToken = (key, token) => {
    if (!token) return;
    else localStorage.setItem(key, JSON.stringify(token));
};

export const pipSetFCMAccessToken = (key, token) => {
    if (!token) return;
    else localStorage.setItem(key, token);
};

export const pipSuccessMessage = (messageApi, messages) => {
    return messageApi.success(messages);
};

export const pipErrorMessage = (messageApi, messages) => {
    return messageApi.error(messages);
};

export const pipDeleteTokenAuth = () => {
    localStorage.removeItem("ylanes_token");
    localStorage.removeItem("ylanes_data");
};

export const pipLogout = (messageApi) => {
    localStorage.removeItem("ylanes_Token");
    localStorage.removeItem("ylanes_firebaseToken");
    localStorage.removeItem("user_data");
    localStorage.removeItem("ylanes-fcm");
    localStorage.removeItem("yLanes_user_Token");
    messageApi.success('Logout successfully!');

};

export const pipViewDate = (date) => {
    return moment.utc(date).format("DD-MM-YYYY");
};

export const pipViewDate2 = (date) => {
    return moment(date).format("MMM DD, YYYY - h:mm A");
    // return moment.utc(date).format("DD-MM-YYYY - h:mm:A");
};

export const pipViewDate3 = (date) => {
    return moment.utc(date).format("DD-MM-YYYY - h:mm:A");
};