import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router';
import { requestOtp, resendOtp } from '../../auth/requestOtp';
import { deleteAccountByOTP } from '../../redux/actions/authActions';
import { auth, onMessageListener, requestForToken } from "../../auth/Firebase";
import { signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { pipGetAccessToken, pipSetAccessToken } from '../../auth/Pip';



const VerifyPhoneNumber = ({ messageApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();

    const { state } = useLocation();
    const { verificationId } = location.state || {};


    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);

    const [isLoader, setIsLoader] = useState(false);
    const [isLoader1, setIsLoader1] = useState(false);

    const user_data = pipGetAccessToken("ylanes-fcm");

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

    const handleResentOtp = async () => {
        if (!isLoader1) {
            resendOtp({
                mobileNumber: state?.mobileNumber,
                messageApi,
                loaderValueChange: () => setIsLoader1(false),
            })
        };
    };

    const handleOtpSubmit = async () => {
        setIsLoader(true);
        if (otp?.length < 6) {
            messageApi.error("Invalid Otp")
            return;
        };
        if (otp?.length < 6) {
            messageApi.error("Invalid Otp")
            return;
        };
        try {
            if (window.confirmationResult) {
                const result = await window.confirmationResult.confirm(otp);
                setIsLoader(false);
                handleSmsConfirmation(result);
                return;
            };
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
        const callback = (response) => {
            if (response) {
                messageApi.success("Account Deactivated SuccessFully.")
                navigate(-1);
            } else {
                messageApi.error("Otp verification failed please try again after some time!!!");
                navigate(-1)
            };
        };
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken();
        };
        const userToken = await res?.user?.getIdToken();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            dateStyle: "full",
            timeStyle: "long",
        }).format(now);
        let raw = {
            firebase_token: userToken || '',
        }
        setIsLoader(false);
        dispatch(deleteAccountByOTP({ payload: raw, messageApi, callback }));
    };

    return (
        <div className="ct_login_center_main">
            <div id="recaptcha-container"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
                        <div className="ct_login_main">
                            <a onClick={() => navigate(-1)} className="ct_back_icon"><i className="fa-solid fa-arrow-left"></i></a>
                            <h2 className="text-center ct_fw_600 mb-2 ct_fs_24">Verify Phone Number</h2>
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
                                    <button
                                        type="button"
                                        onClick={handleOtpSubmit}
                                        className="ct_yellow_btn mx-auto"
                                    >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VerifyPhoneNumber;