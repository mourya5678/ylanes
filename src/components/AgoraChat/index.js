import WebIM from "agora-chat";

const APP_ID = '611227230#1418219';
let messageCallback = null;
let conn = null;


export const initChat = () => {
    conn = new WebIM.connection({
        appKey: APP_ID,
        isHttpDNS: true,
        isMultiLoginSessions: true,
        https: true,
        isDebug: true,
    });

    conn.addEventHandler("connection", {
        onConnected: () => {
            console.log("Connected to Agora Chat");
        },
        onDisconnected: () => {
            console.log("Disconnected from Agora Chat");
        },
        onTextMessage: (msg) => {
            console.log("New Message:", msg);
            if (messageCallback) {
                messageCallback(msg);
            };
        },
    });

    return conn;
};

export const loginChat = async (userId, passwordOrToken) => {
    if (!conn) throw new Error("Agora Chat not initialized. Call initChat first.");
    try {
        await conn.open({
            user: userId,
            pwd: passwordOrToken,
        });
        console.log("Login successful:", userId);
    } catch (err) {
        console.error("Login failed:", err);
    };
};

export const sendMessage = async (to, msg, chatType = "singleChat") => {
    if (!conn) throw new Error("Agora Chat not initialized.");
    const message = WebIM.message.create({
        type: "txt",
        msg,
        to,
        chatType,
    });
    try {
        await conn.send(message);
        console.log("Message sent:", msg);
    } catch (err) {
        console.error("Message send failed:", err);
    };
};

export const logoutChat = () => {
    if (!conn) return;
    conn.close();
    console.log("Logged out from Agora Chat");
};

export const setMessageListener = (callback) => {
    messageCallback = callback;
};