import { pageRoutes } from "../routes/PageRoutes";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./Firebase";

export const requestOtp = async ({ mobileNumber, isAgreed, navigate, messageApi, loaderValueChange }) => {
    try {
        const fullPhoneNumber = mobileNumber.startsWith("+")
            ? mobileNumber
            : "+91" + mobileNumber;
        const recaptchaContainer = document.getElementById("recaptcha-container");
        if (!recaptchaContainer) {
            throw new Error("Missing <div id='recaptcha-container'></div> in your component.");
        };
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        console.log("reCAPTCHA solved:", response);
                    },
                }
            );
        };
        const confirmationResult = await signInWithPhoneNumber(
            auth,
            fullPhoneNumber,
            window.recaptchaVerifier
        );
        window.confirmationResult = confirmationResult;
        loaderValueChange();
        navigate(pageRoutes.otpVerify, {
            state: {
                verificationId: confirmationResult.verificationId,
                mobileNumber: fullPhoneNumber,
            },
        });
    } catch (error) {
        console.error("Error in signInWithPhoneNumber:", error);
        loaderValueChange();
        const errorMessage = String(error).toLowerCase();
        if (errorMessage.includes("invalid-phone-number")) {
            messageApi.error("Invalid Phone Number");
        } else if (errorMessage.includes("too-many-requests")) {
            messageApi.error("Too many attempts, please try again later");
        } else if (errorMessage.includes("captcha-check-failed")) {
            messageApi.error("Captcha verification failed");
        } else if (errorMessage.includes("quota-exceeded")) {
            messageApi.error("SMS quota exceeded. Please contact admin");
        } else {
            messageApi.error("Something went wrong, please try again");
        };
    };
};