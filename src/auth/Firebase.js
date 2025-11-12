import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-su31F4JN5qBYQlEbJcbVvUyVvIUxjrg",
    authDomain: "ylanes1.firebaseapp.com",
    projectId: "ylanes1",
    storageBucket: "ylanes1.appspot.com",
    messagingSenderId: "899494597149",
    appId: "1:899494597149:web:cbcc54f491ef31fb22ecf4",
    measurementId: "G-86Q2Z5B4XD",
};

const vapidkey = "BFbRvk8xkU8MvzH1ospaiqQS8BbaNSu0dhwbGEd2wW0OkSXcuveGJxv1pFkvyNnnLPIg_dGQ0zZRywLdTJW02cA";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

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


export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };

// Initialize Firebase Cloud Messaging

export const requestForToken = async () => {
    try {
        const registration = await navigator.serviceWorker.getRegistration(
            `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`
        );
        if (!registration) {
            console.warn("No service worker registration found.");
            return;
        }
        const currentToken = await getToken(messaging, {
            vapidKey: vapidkey,
            serviceWorkerRegistration: registration,
        });

        if (currentToken) {
            window.safeStorage.setItem("ylanes-fcm", currentToken);
            return currentToken
        } else {
            console.warn("No registration token available.");
        }
    } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
    }
};


// Listen for foreground messages
export const onMessageListener = () => new Promise((resolve) => {
    onMessage(messaging, (payload) => {
        resolve(payload);
    });
});