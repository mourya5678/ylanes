import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router';
import { signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { auth, onMessageListener, requestForToken } from "../../auth/Firebase";

const VerifyOtp = ({ messageApi }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { verificationId, mobileNumber } = location.state || {};

    const [otp, setOtp] = useState('');

    useEffect(() => {
        // Register service worker
        if ("serviceWorker" in navigator) {
            navigator?.serviceWorker
                ?.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
                .then((registration) => {
                    console.log(
                        "Service Worker registered with scope:",
                        registration?.scope
                    );
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });
        }
        requestForToken();
    }, []);

    useEffect(() => {
        onMessageListener()
            .then((payload) => {
                console.log("Foreground notification received:", payload);
            })
            .catch((err) => console.error("Error: ", err));
    }, []);

    const handleOtpSubmit = async () => {
        if (otp?.length < 6) {
            messageApi.error("Invalid Otp")
            return;
        };
        try {
            // Option 1: Use stored confirmationResult (best)
            if (window.confirmationResult) {
                const result = await window.confirmationResult.confirm(otp);
                console.log("User signed in:", result.user);
                return;
            };
            // Option 2: Fallback if confirmationResult not stored
            if (verificationId) {
                const credential = PhoneAuthProvider.credential(verificationId, otp);
                const result = await signInWithCredential(auth, credential);
                console.log("User signed in:", result.user);
            };
        } catch (err) {
            console.log(err)
        };
    };

    // localStorage.getItem("trophy-talk-seller-fcm") || "" 

    const handleSmsConfirmation = async (res) => {
        const user = auth().currentUser;
        if (user) {
            const idToken = await user.getIdToken();
            console.log("Firebase ID Token:", idToken);
            localStorage.setItem("ylanes_firebaseToken", idToken);
        };
        const userToken = await res.user.getIdToken();
        console.log("User token:", userToken);
    };

    return (
        <div className="ct_login_center_main">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
                        <div className="ct_login_main">
                            <a onClick={() => navigate(-1)} className="ct_back_icon"><i className="fa-solid fa-arrow-left"></i></a>
                            <h2 className="text-center ct_fw_600 mb-2 ct_fs_24">Verify OTP</h2>
                            <p className="text-center mb-0">We've sent the code to your phone number</p>
                            <div className="text-center mt-4">
                                <img src="assets/img/otp.png" alt="" />
                            </div>
                            <p className="mb-0 mt-4 mb-3">We respect your privacy, Your number will not be shared anywhere</p>
                            <form>
                                <div className="ct_otp_input d-flex justify-content-center gap-3 mb-2">
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>
                                <p className="ct_link_under_line text-center mb-0 mt-3 ct_text_op_6">Code expires in 01:52</p>
                                <div className="text-center mt-5">
                                    <button type="button" onClick={handleOtpSubmit} className="ct_yellow_btn mx-auto">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VerifyOtp;