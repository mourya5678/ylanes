importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyA-su31F4JN5qBYQlEbJcbVvUyVvIUxjrg",
    authDomain: "ylanes1.firebaseapp.com",
    projectId: "ylanes1",
    storageBucket: "ylanes1.appspot.com",
    messagingSenderId: "899494597149",
    appId: "1:899494597149:web:cbcc54f491ef31fb22ecf4",
    measurementId: "G-86Q2Z5B4XD",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title || "Default Title"; // Fallback title
    const notificationOptions = {
        body: payload.notification.body || "Default body message.", // Fallback body
        icon: payload.notification.icon || 'YOUR_NOTIFICATION_ICON_URL', // Optional icon
    };
    // Show the notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});