import React from 'react';
import Header from '../../components/Header';

const Refer = () => {

    return (
        <div>
            <Header />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="ct_refer_friend_bg">
                                <img src="assets/img/welcome-concept-landing-page.png" alt="" />
                                <div className="text-center">
                                    <h4 className="ct_fs_20 ct_fw_600">Refer your friends</h4>
                                    <p>Refer your friends to YLanes and receive 100 YCoins per referral who signs up!</p>
                                    <div className="text-center">
                                        <button className="ct_yellow_btn">Share With Friends</button>
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

export default Refer;