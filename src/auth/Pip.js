import moment from "moment";
export const curSym = '$';
let safeStorage;
try {
    safeStorage = window.localStorage;
    safeStorage.setItem("test", "ok");
    window.safeStorage = safeStorage;
} catch {
    safeStorage = {
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
    };
    window.safeStorage = safeStorage;
    console.warn("localStorage is disabled or not accessible (using safe fallback)");
}

export const pipGetAccessToken = (key) => {
    const data = window.safeStorage.getItem(key);
    return data ? JSON.parse(data) : "";
};

export const pipSetAccessToken = (key, token) => {
    if (!token) return;
    else window.safeStorage.setItem(key, JSON.stringify(token));
};

export const pipSetFCMAccessToken = (key, token) => {
    if (!token) return;
    else window.safeStorage.setItem(key, token);
};

export const pipSuccessMessage = (messageApi, messages) => {
    return messageApi.success(messages);
};

export const pipErrorMessage = (messageApi, messages) => {
    return messageApi.error(messages);
};

export const pipDeleteTokenAuth = () => {
    window.safeStorage.removeItem("ylanes_token");
    window.safeStorage.removeItem("ylanes_data");
};

export const pipLogout = (messageApi) => {
    window.safeStorage.removeItem("ylanes_Token");
    window.safeStorage.removeItem("ylanes_firebaseToken");
    window.safeStorage.removeItem("user_data");
    window.safeStorage.removeItem("ylanes-fcm");
    window.safeStorage.removeItem("yLanes_user_Token");
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