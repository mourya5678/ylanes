import React from 'react';
import Header from '../../components/Header';

const UserWallet = () => {
    return (
        <div>
            <Header />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between  gap-3 mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Wallet
                                </h4>
                                <a className="ct_yellow_btn">Top Up Your Wallet</a>
                            </div>
                            <div className="ct_wallet_light_yellow_bg">
                                <p className="mb-1 ct_text_op_6">Wallet Balance</p>
                                <h2 className="ct_fs_18 ct_fw_600">0 YCoins</h2>
                                <div className="ct_wallet_icon_top">
                                    <img src="assets/img/wallet_icon.png" alt="" />
                                </div>
                            </div>
                            <div className="ct_wallet_list">
                                <ul>    
                                    <li>
                                        <a className="d-flex align-items-center gap-2 justify-content-between text-dark" >
                                            <div className="d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-gem"></i>
                                                <p className="mb-0 ct_fw_600">Subscription Plan</p>
                                            </div>
                                            <i className="fa-solid fa-chevron-right text-dark"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="d-flex align-items-center gap-2 justify-content-between text-dark">
                                            <div className="d-flex align-items-center gap-2">
                                                <i className="fa-solid fa-clock-rotate-left"></i>
                                                <p className="mb-0 ct_fw_600">Transaction History</p>
                                            </div>
                                            <i className="fa-solid fa-chevron-right text-dark"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default UserWallet;