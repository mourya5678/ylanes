import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SharePostModal from '../../components/Modals/SharePostModal';
import ReferCode from '../../components/Modals/ReferCode';
import { useDispatch, useSelector } from 'react-redux';
import { getAllYCoinsEarningData } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';

const Refer = ({ messageApi }) => {
    const dispatch = useDispatch();
    const { isLoading, getYCoinsData } = useSelector((state) => state?.authReducer);
    const [showShareModal, setShowShareModal] = useState(false);
    const [referValue, setReferValue] = useState(0);

    useEffect(() => {
        dispatch(getAllYCoinsEarningData({ messageApi }));
    }, []);

    useEffect(() => {
        if (getYCoinsData?.length != 0) {
            getYCoinsData?.map((item) => (
                item?.constant_key == "APP-REFERREE" &&
                setReferValue(item?.constant_value)
            ))
        } else {
            setReferValue(0);
        };
    }, [getYCoinsData]);

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="ct_refer_friend_bg">
                                <img src="assets/img/welcome-concept-landing-page.png" alt="" />
                                <div className="text-center">
                                    <h4 className="ct_fs_20 ct_fw_600">Refer your friends</h4>
                                    <p>Refer your friends to YLanes and receive {referValue ?? 0} YCoins per referral who signs up!</p>
                                    <div className="text-center">
                                        <button className="ct_yellow_btn" onClick={() => setShowShareModal(true)}>Share With Friends</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showShareModal &&
                <ReferCode
                    messageApi={messageApi}
                    onClose={() => setShowShareModal(false)}
                />
            }
        </div>
    )
};

export default Refer;