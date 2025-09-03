import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const Subscription = ({ messageApi }) => {
    const navigate = useNavigate();

    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center   gap-3 mb-5">
                                <a onClick={() => navigate(pageRoutes.userWallet)} className="ct_back_btn ct_cursor text-dark">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </a>
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Subscription Plan
                                </h4>
                            </div>
                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-lg-4 mb-5">
                                        <div className="ct_pricing_card">
                                            <span className="ct_pricing_badge">Most Popular</span>
                                            <div>
                                                <p className="mb-0 ct_fs_20 text-center mb-3 ct_fw_600">Silver Member</p>
                                                <div className="ct_pricing_title">
                                                    <h2 className="ct_fs_35 text-center mb-0 ct_fw_600">Rs 1000</h2>
                                                    <p className="mb-0 text-center">One time payment</p>
                                                </div>
                                                <ul className="ct_mt_30 mb-4">
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>5000 YCoins
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Blue Tick
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mt-auto text-center pt-4">
                                                <button className="ct_yellow_btn w-100">Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-5">
                                        <div className="ct_pricing_card active">
                                            <span className="ct_pricing_badge">Most Popular</span>
                                            <div>
                                                <p className="mb-0 ct_fs_20 text-center mb-3 ct_fw_600">Gold Member</p>
                                                <div className="ct_pricing_title">
                                                    <h2 className="ct_fs_35 text-center mb-0 ct_fw_600">Rs 2000</h2>
                                                    <p className="mb-0 text-center">One time payment</p>
                                                </div>
                                                <ul className="ct_mt_30 mb-4">
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>25000 YCoins
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Yellow Tick
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Moderator Status

                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Create any Video room free of cost including Moderated rooms. Earn Ycoins on
                                                        participation for your Moderated
                                                        rooms
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Invitation to write blogs.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mt-auto text-center pt-4">
                                                <button className="ct_yellow_btn w-100">Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-5">
                                        <div className="ct_pricing_card ">
                                            <span className="ct_pricing_badge">Most Popular</span>
                                            <div>
                                                <p className="mb-0 ct_fs_20 text-center mb-3 ct_fw_600">Silver Member</p>
                                                <div className="ct_pricing_title">
                                                    <h2 className="ct_fs_35 text-center mb-0 ct_fw_600">Rs 1000</h2>
                                                    <p className="mb-0 text-center">One time payment</p>
                                                </div>
                                                <ul className="ct_mt_30 mb-4">
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>5000 YCoins
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Blue Tick
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Superhost Status
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-check"></i>Create Video rooms free of cost
                                                        (Except for Moderated rooms).
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mt-auto text-center pt-4">
                                                <button className="ct_yellow_btn w-100">Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Subscription;