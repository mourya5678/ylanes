import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router';
import { signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { auth, onMessageListener, requestForToken } from "../../auth/Firebase";
import { smsConfirmation } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, SMSConfirmationAPI } from '../../routes/BackendRoutes';
import { pageRoutes } from '../../routes/PageRoutes';
import { pipSetAccessToken } from '../../auth/Pip';
import Loader from '../../components/Loader';
import { requestOtp, resendOtp } from '../../auth/requestOtp';

const VerifyOtp = ({ messageApi }) => {
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

    const { isLoading } = useSelector((state) => state.authReducer);
    const { state } = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();
    const { verificationId, mobileNumber } = location.state || {};

    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);

    const [isLoader, setIsLoader] = useState(false);
    const [isLoader1, setIsLoader1] = useState(false);

    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    useEffect(() => {
        // Register service worker
        if ("serviceWorker" in navigator) {
            navigator?.serviceWorker
                ?.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
                .then((registration) => {
                    // console.log(
                    //     "Service Worker registered with scope:",
                    //     registration?.scope
                    // );
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
                // console.log("Foreground notification received:", payload);
            })
            .catch((err) => console.error("Error: ", err));
    }, []);

    const handleOtpSubmit = async () => {
        setIsLoader(true);
        if (otp?.length < 6) {
            messageApi.error("Invalid Otp")
            return;
        };
        try {
            // Option 1: Use stored confirmationResult (best)
            if (window.confirmationResult) {
                const result = await window.confirmationResult.confirm(otp);
                setIsLoader(false);
                handleSmsConfirmation(result);
                return;
            };
            // Option 2: Fallback if confirmationResult not stored
            if (verificationId) {
                const credential = PhoneAuthProvider.credential(verificationId, otp);
                const result = await signInWithCredential(auth, credential);
                setIsLoader(false);
                handleSmsConfirmation(result);
            };
        } catch (err) {
            setIsLoader(false);
            messageApi?.error(err?.message);
        };
    };

    const handleSmsConfirmation = async (res) => {
        setIsLoader(true);
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken();
            pipSetAccessToken("ylanes_firebaseToken", idToken)
        };
        const userToken = await res?.user?.getIdToken();
        pipSetAccessToken("ylanes_Token", userToken)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            dateStyle: "full",
            timeStyle: "long",
        }).format(now);
        const fcmToken = window.safeStorage.getItem("ylanes-fcm");
        var myHeaders = new Headers();
        myHeaders.append("token", userToken);
        myHeaders.append("Content-Type", "application/json");
        const data = {
            full_phone_number: res?.user?.phoneNumber,
            device_id: typeof fcmToken !== "undefined" && fcmToken != null && fcmToken != ""
                ? fcmToken
                : "",
            time_stamp: formatted,
        }
        axios({
            method: "POST",
            url: BASE_URL + SMSConfirmationAPI,
            headers: myHeaders,
            data: data
        })
            .then((res) => {
                setIsLoader(false);
                if (res?.status == 201 || res?.status == 200) {
                    messageApi.success(res?.data?.meta?.message)
                } else {
                    messageApi.error(res?.data?.meta?.message)
                }
                pipSetAccessToken('user_data', res?.data?.data);
                pipSetAccessToken('yLanes_user_Token', res?.data?.meta?.token);
                if (res?.data?.data?.attributes?.is_profile_created) {
                    navigate(pageRoutes.dashboard);
                } else {
                    navigate(pageRoutes.onBoarding);
                };
            })
            .catch((err) => {
                setIsLoader(false);
            });
    };

    const handleResentOtp = async () => {
        if (!isLoader1) {
            resendOtp({
                mobileNumber: state?.mobileNumber,
                messageApi,
                loaderValueChange: () => setIsLoader1(false),
            })
        };
    };

    if (isLoading || isLoader) {
        return <Loader />;
    };
    return (
        <div className="ct_login_center_main">
            <div id="recaptcha-container"></div>
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
                                {timeLeft == 0 ?
                                    <p className="ct_link_under_line text-center mb-0 mt-3 ct_text_op_6" onClick={handleResentOtp}>Resend Otp</p>
                                    :
                                    <p className="ct_link_under_line text-center mb-0 mt-3 ct_text_op_6"> Resend OTP in {formatTime(timeLeft)}</p>
                                }
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