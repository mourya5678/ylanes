import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const CreateRoom = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">Create Room</h4>
                                <button className="ct_outline_border ct_w_100_767" onClick={() => navigate(pageRoutes.userWallet)}>
                                    <img src="assets/img/wallet_icon.png" alt="" width="20px" />
                                    1495
                                </button>
                            </div>
                            <form action="" className="mt-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Select Topics</label>
                                            <select className="form-control ct_input">
                                                <option value="">Search for topics</option>
                                                <option value="">Search for topics</option>
                                                <option value="">Search for topics</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Select Room Type</label>
                                            <select className="form-control ct_input">
                                                <option value="">Search for Room Type</option>
                                                <option value="">Search for Room Type</option>
                                                <option value="">Search for Room Type</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Date and Time</label>
                                            <input type="date" className="form-control ct_input" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Your Take</label>
                                            <textarea className="form-control ct_input h-auto" rows="5">Please share what you will be bringing to this conversation a subtopic, experience, question, perspective, some ideas, etc. You can also share any relevant resources such as YouTube links, websites, Instagram / Pinterest pages, etc. using the link below
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex align-items-center gap-3 mb-4">
                                            <label for="ct_upload_file">
                                                <input type="file" className="d-none" id="ct_upload_file" />
                                                <i className="fa-solid fa-paperclip text-dark"></i>
                                            </label>
                                            <p className="mb-0">Add Resources</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex align-items-center gap-3 mt-2 mb-4">
                                            <label className="toggle-switch">
                                                <input type="checkbox" />
                                                <div className="toggle-switch-background">
                                                    <div className="toggle-switch-handle"></div>
                                                </div>
                                            </label>
                                            <p className="mb-0">Global Room</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center ">
                                        <div className="form-check ct_custom_check2">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                        <p className="mb-0">JOIN ANONYMOUSLY</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <button type='button' className="ct_yellow_btn mx-auto">Create Room</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default CreateRoom;