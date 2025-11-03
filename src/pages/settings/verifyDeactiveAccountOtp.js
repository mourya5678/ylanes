import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router';
import { signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { auth, onMessageListener, requestForToken } from "../../auth/Firebase";
import { deleteAccountData } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { pipGetAccessToken } from '../../auth/Pip';
import { pageRoutes } from '../../routes/PageRoutes';

const VerifyDeactiveAccountOtp = ({ messageApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [otp, setOtp] = useState('');
    const location = useLocation();

    const [isLoader, setIsLoader] = useState(false);
    const { verificationId, mobileNumber } = location.state || {};

    const user_data = pipGetAccessToken("ylanes-fcm");


    const handleOtpSubmit = async () => {
        setIsLoader(true);
        const callback = (response) => {
            if (response) {
                messageApi.success("Account Deactivated SuccessFully.")
                navigate(pageRoutes.login);
            } else {
                messageApi.error("Otp verification failed please try again after some time!!!");
                navigate(-1)
            };
        };
        if (otp?.length < 6) {
            messageApi.error("Invalid Otp")
            return;
        };
        try {
            // Option 1: Use stored confirmationResult (best)
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const now = new Date();
            const formatted = new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                dateStyle: "full",
                timeStyle: "long",
            }).format(now);
            let raw = JSON.stringify({
                reason: location?.state?.metaData?.reason,
                device_id: typeof user_data !== 'undefined' && user_data != null && user_data != '' ? user_data : '',
                time_stamp: formatted,
            });
            if (window.confirmationResult) {
                const result = await window.confirmationResult.confirm(otp);
                setIsLoader(false);
                dispatch(deleteAccountData({ payload: raw, messageApi, callback }));
                return;
            };
            // Option 2: Fallback if confirmationResult not stored
            if (verificationId) {
                const credential = PhoneAuthProvider.credential(verificationId, otp);
                const result = await signInWithCredential(auth, credential);
                setIsLoader(false);
                dispatch(deleteAccountData({ payload: raw, messageApi, callback }));
            };
        } catch (err) {
            setIsLoader(false);
            messageApi?.error(err?.message);
        };
    };

    return (
        <div className="ct_login_center_main">
            <div id="recaptcha-container"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
                        <div className="ct_login_main">
                            <a onClick={() => navigate(-1)} className="ct_back_icon"><i className="fa-solid fa-arrow-left"></i></a>
                            <h2 className="text-center ct_fw_600 mb-2 ct_fs_24">Delete Account Data Verification</h2>
                            <p className="text-center mb-0">We've sent the code to your phone number</p>
                            <div className="text-center mt-4">
                                <img src="assets/img/otp.png" alt="" />
                            </div>
                            <p className="mb-0 mt-4 mb-3">We respect your privacy, Your number will not be shared anywhere</p>
                            <form>
                                <div className="ct_otp_input d-flex justify-content-center gap-3 mb-2">
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>
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

export default VerifyDeactiveAccountOtp;