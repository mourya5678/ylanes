import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

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
                                    <button type="button" onClick={() => navigate(pageRoutes.dashboard)} className="ct_yellow_btn mx-auto">Submit</button>
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