import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const TopUpUserWallet = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center   gap-3 mb-5">
                                <a onClick={() => navigate(pageRoutes.userWallet)} className="ct_back_btn ct_cursor text-dark">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </a>
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Top Up Your Wallet
                                </h4>
                            </div>
                            <div className="ct_wallet_light_yellow_bg">
                                <p className="mb-1 ct_text_op_6">Wallet Balance</p>
                                <h2 className="ct_fs_18 ct_fw_600">0 YCoins</h2>
                                <div className="ct_wallet_icon_top">
                                    <img src="assets/img/wallet_icon.png" alt="" />
                                </div>
                            </div>
                            <p className="ct_text_op_6 mt-2"><span className="ct_fw_600">Gold Gold Member Package</span> to be renewed on with <span className="ct_fw_600">25000 YCoins</span> added to your wallet.
                            </p>
                            <div className="mt-5">
                                <h4 className="ct_fs_20 ct_fw_600 mb-4">Topup Recharge Plans
                                </h4>
                                <ul>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between gap-3 ct_top_wallet_bg">
                                            <p className="ct_fs_20 ct_fw_600 mb-0">2500 YCoins</p>
                                            <p className="ct_fs_20 ct_fw_600 mb-0">Rs. 500</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between gap-3 ct_top_wallet_bg">
                                            <p className="ct_fs_20 ct_fw_600 mb-0">2500 YCoins</p>
                                            <p className="ct_fs_20 ct_fw_600 mb-0">Rs. 500</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between gap-3 ct_top_wallet_bg">
                                            <p className="ct_fs_20 ct_fw_600 mb-0">2500 YCoins</p>
                                            <p className="ct_fs_20 ct_fw_600 mb-0">Rs. 500</p>
                                        </div>
                                    </li>
                                    <p className="ct_text_op_6"><i className="fa-solid fa-circle-info me-2"></i>YCoins valid only till you have an active subscription
                                    </p>
                                </ul>
                                <div className="mt-5 text-center">
                                    <button className="ct_yellow_btn">Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default TopUpUserWallet;