import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../routes/PageRoutes';

const Header = () => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);

    return (
        <header className="ct_header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ct_navbr_main">
                            <div className="ct_logo">
                                <a onClick={() => navigate(pageRoutes.dashboard)}>
                                    <img src="assets/img/logo.png" alt="" />
                                </a>
                            </div>
                            <div className="ct_navbar">
                                <ul>
                                    <div className="ct_close_menu">
                                        <i className="fa-solid fa-xmark"></i>
                                    </div>
                                    <li onClick={() => navigate(pageRoutes.dashboard)}>
                                        <a>Home</a>
                                    </li>
                                    <li>
                                        <a>Polls</a>
                                    </li>
                                    <li>
                                        <a>My Rooms</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <a className="ct_header_icon" onClick={() => navigate(pageRoutes.notification)}>
                                    <img src="assets/img/notifications_icon.png" alt="" />
                                </a>
                                <a className="ct_header_icon">
                                    <img src="assets/img/message_icon.png" alt="" />
                                </a>
                                <div className="ct_right_dropdown dropdown">
                                    <button onClick={() => setIsShow(!isShow)}>
                                        <div className="d-flex align-items-center gap-2">
                                            <img src="assets/img/user.png" alt="" className="ct_img_30" />
                                            <div className="text-start">
                                                <small className="ct_text_939393 ct_fw_600 ct_white_nowrap">Jorge</small>
                                            </div>
                                        </div>
                                        <i className="fa-solid fa-angle-down ms-auto"></i>
                                    </button>
                                    <ul className={`dropdown-menu ${isShow && "show"}`}>
                                        <li onClick={() => navigate(pageRoutes.profile)}>
                                            <a className="dropdown-item">
                                                <img src="../assets/img/dashbaord-images/profile_icon.svg" alt="" />
                                                My Profile
                                            </a>
                                        </li>
                                        <li onClick={() => navigate(pageRoutes.setting)}>
                                            <a className="dropdown-item">
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item"
                                            // data-bs-toggle="modal"
                                            //     data-bs-target="#ct_logout_modal_post"
                                            >
                                                <img src="../assets/img/dashbaord-images/logout.svg" alt="" />
                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ct_menu_bar">
                                    <i className="fa-solid fa-bars-staggered"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;