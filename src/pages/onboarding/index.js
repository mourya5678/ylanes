import React from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';

const OnBoardingScreen = ({ messageApi }) => {
    const navigate = useNavigate();

    const initialeState = {
        referral_code: "",
        profile_image: "",
        profike_name: "",
        year_of_birth: "",
        gender: "",
        email: ""
    };

    const handleNextButton = (val) => {
        console.log({ val });
    };

    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div
                                className="ct_multistep_form_card pt-4 mt-3 mb-3 ct_host_process_bg"
                            >
                                <form id="msform">
                                    <ul id="ct_form_progressbar" className="ct_host_process_multi_form">
                                        <li className="active ct_flex_1">
                                            <h5>Profile Setup</h5>
                                        </li>
                                        <li id="ct_pricing">
                                            <h5>Completed</h5>
                                        </li>
                                    </ul>
                                    <fieldset className="ct_mt_60 ct_white_bg">
                                        <div className="ct_profile_img">
                                            <img src="assets/img/user.png" alt="" />
                                            <label for="ct_profile_update">
                                                <input
                                                    type="file"
                                                    className="d-none"
                                                    id="ct_profile_update"
                                                />
                                                <div className="ct_upload_icon">
                                                    <i className="fa-solid fa-pen"></i>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-md-12">
                                                <div className="form-group text-start mb-4">
                                                    <label className="ct_fw_500 mb-2 text-start"
                                                    >Profile Name</label
                                                    >
                                                    <input
                                                        type="text"
                                                        className="form-control ct_input"
                                                        placeholder="Enter Profile Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group text-start mb-4">
                                                    <label className="ct_fw_500 mb-2 text-start">Year Of Birth</label>
                                                    <select className="form-control ct_input">
                                                        <option value="">Select year of birth</option>
                                                        <option value="">1996</option>
                                                        <option value="">1997</option>
                                                        <option value="">1998</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group text-start mb-4">
                                                    <label className="ct_fw_500 mb-2 text-start">Gender</label>
                                                    <select className="form-control ct_input">
                                                        <option value="">Select gender</option>
                                                        <option value="">Male</option>
                                                        <option value="">Female</option>
                                                        <option value="">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ct_yellow_btn ct_form_next float-end"
                                        >
                                            Next
                                        </button>
                                    </fieldset>
                                    <fieldset className="ct_white_bg">
                                        <div className="ct_profile_img">
                                            <img src="assets/img/user.png" alt="" />
                                            <label for="ct_profile_update">
                                                <input
                                                    type="file"
                                                    className="d-none"
                                                    id="ct_profile_update"
                                                />
                                                <div className="ct_upload_icon">
                                                    <i className="fa-solid fa-pen"></i>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-md-12">
                                                <div className="form-group text-start mb-4">
                                                    <label className="ct_fw_500 mb-2 text-start"
                                                    >Email</label
                                                    >
                                                    <input
                                                        type="email"
                                                        className="form-control ct_input"
                                                        placeholder="Enter Profile Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group text-start mb-4">
                                                    <label className="ct_fw_500 mb-2 text-start"
                                                    >Referral Code</label
                                                    >
                                                    <input
                                                        type="number"
                                                        className="form-control ct_input"
                                                        placeholder="Enter Profile Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ct_yellow_btn ct_form_next float-end"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="ct_outline_btn previous float-end me-3"
                                        >
                                            Back
                                        </button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default OnBoardingScreen;