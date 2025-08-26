import React from 'react';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const LoginScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="ct_login_center_main">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
                        <div className="ct_login_main">
                            <h2 className="text-center ct_fw_600 mb-4 ct_fs_24">Sign In / Sign Up</h2>
                            <div className="text-center  mt-4">
                                <img src="assets/img/login_vector.png" alt="" />
                            </div>
                            <p className="mb-0 mt-4 mb-3">We respect your privacy, Your number will not be shared anywhere</p>
                            <form>
                                <div className="mb-2">
                                    <label className="form-label">Enter Phone Number</label>
                                    <input type="number" className="form-control ct_input" placeholder="Enter Phone Number" />
                                </div>
                                <div className="d-flex  align-items-center mt-2">
                                    <div className="form-check ct_custom_check2">
                                        <input className="form-check-input" type="checkbox" />
                                    </div>
                                    <label for=""><span className="ct_text_op_6">Please read and agree to our</span> <a href={pageRoutes.termAndCondition} target='_blank' className="ct_link_under_line text-dark">Terms of Use</a> and <a className="ct_link_under_line text-dark"><span className="ct_text_op_6">Privacy Policy</span></a></label>
                                </div>
                                <div className="text-center mt-5">
                                    <button onClick={() => navigate(pageRoutes.otpVerify)} type="submit" className="ct_yellow_btn mx-auto">Get Otp</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginScreen;