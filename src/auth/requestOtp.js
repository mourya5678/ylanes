import { pageRoutes } from "../routes/PageRoutes";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./Firebase";

export const requestOtp = async ({
    mobileNumber,
    route,
    navigate,
    metaData = {},
    messageApi,
    loaderValueChange,
}) => {
    try {
        const fullPhoneNumber = mobileNumber.startsWith("+")
            ? mobileNumber
            : "+91" + mobileNumber;

        const recaptchaContainer = document.getElementById("recaptcha-container");
        if (!recaptchaContainer) throw new Error("Missing recaptcha container");

        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: () => { },
        });

        const confirmationResult = await signInWithPhoneNumber(
            auth,
            fullPhoneNumber,
            window.recaptchaVerifier
        );

        window.confirmationResult = confirmationResult;
        loaderValueChange();
        navigate(route, {
            state: {
                verificationId: confirmationResult.verificationId,
                mobileNumber: fullPhoneNumber,
                metaData,
            },
        });
    } catch (error) {
        console.error("Error in signInWithPhoneNumber:", error);
        loaderValueChange();
        const errorMessage = String(error).toLowerCase();
        if (errorMessage.includes("invalid-phone-number")) messageApi.error("Invalid Phone Number");
        else if (errorMessage.includes("too-many-requests")) messageApi.error("Too many attempts, please try again later");
        else if (errorMessage.includes("captcha-check-failed")) messageApi.error("Captcha verification failed");
        else if (errorMessage.includes("quota-exceeded")) messageApi.error("SMS quota exceeded. Please contact admin");
        else messageApi.error("Something went wrong, please try again");
    }
};

export const resendOtp = async ({ mobileNumber, messageApi, loaderValueChange }) => {
    try {
        const fullPhoneNumber = mobileNumber.startsWith("+")
            ? mobileNumber
            : "+91" + mobileNumber;
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        };
        const recaptchaContainer = document.getElementById("recaptcha-container");
        if (!recaptchaContainer) {
            throw new Error("Missing <div id='recaptcha-container'></div> in your component.");
        };
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // console.log("reCAPTCHA solved again:", response);
                },
            }
        );
        await window.recaptchaVerifier.render();
        const confirmationResult = await signInWithPhoneNumber(
            auth,
            fullPhoneNumber,
            window.recaptchaVerifier
        );
        window.confirmationResult = confirmationResult;
        loaderValueChange();
        messageApi.success("OTP has been resent successfully ✅");
    } catch (error) {
        console.error("Error in resendOtp:", error);
        loaderValueChange();
        const errorMessage = String(error).toLowerCase();
        if (errorMessage.includes("invalid-phone-number")) {
            messageApi.error("Invalid Phone Number");
        } else if (errorMessage.includes("too-many-requests")) {
            messageApi.error("Too many resend attempts. Please try again later");
        } else if (errorMessage.includes("captcha-check-failed")) {
            messageApi.error("Captcha verification failed");
        } else if (errorMessage.includes("quota-exceeded")) {
            messageApi.error("SMS quota exceeded. Please contact admin");
        } else {
            messageApi.error("Failed to resend OTP, please try again");
        };
    }
};