import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { pipGetAccessToken } from '../../auth/Pip';
import { useDispatch, useSelector } from 'react-redux';
import { convertRupeeToYCoinData, getTaxDeatils, getTopUpPlan, topUpUserWalletYCoins, verifyPaymentTransactionData } from '../../redux/actions/subscriptions';
import Loader from '../../components/Loader';
import { razorPayTestKey } from '../../routes/BackendRoutes';

const TopUpUserWallet = ({ messageApi }) => {
    const { isSubscriptionLoader, topUpPlan, tax, convertRupeeToYCoins } = useSelector((state) => state.subscriptionReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = pipGetAccessToken("user_data");
    const [selectedPlan, setSelectedPlan] = useState({});

    console.log({ tax, convertRupeeToYCoins });


    useEffect(() => {
        dispatch(getTopUpPlan({ messageApi }));
        dispatch(getTaxDeatils({ messageApi }));
        dispatch(convertRupeeToYCoinData({ messageApi }));
    }, []);

    const handleUpgradeWalletYCoins = () => {
        const callback = (response) => {
            console.log(response);
            openPaymentGateway(response?.transaction?.order_id,
                response?.transaction?.id);
        };
        if (selectedPlan?.id) {
            const amount = Number(selectedPlan?.rupees_ammount ?? 0) * (1 / (convertRupeeToYCoins ?? 1));
            const planID = selectedPlan?.id;
            const taxAmount = (amount * tax) / 100;
            const totalAmount = amount + taxAmount;
            const data = {
                amount: selectedPlan?.rupees_ammount ?? 0,
                total_amount: String(totalAmount),
            };
            dispatch(topUpUserWalletYCoins({ payload: data, params: planID, callback, messageApi }));
        } else {
            messageApi.error("Please select any plan to contineu");
        };
    };

    const openPaymentGateway = (orderId, transactionId) => {
        let key = razorPayTestKey;
        var options = {
            description: "Refill wallet",
            name: "YLanes",
            key: key,
            currency: "INR",
            order_id: orderId,
            prefill: {},
            theme: { color: "#528FF0" },
            handler: function (response) {
                console.log("Razorpay Response:", { response });
                const data = {
                    razorpay_payment_id: response?.razorpay_payment_id,
                    order_id: response?.razorpay_order_id,
                    payment_response: 1,
                    razorpay_signature: response?.razorpay_signature,
                };
                const callback = (res) => {
                    console.log({ confirm: res });
                    if (res?.transaction) {
                        messageApi.success(res.message);
                        navigate(pageRoutes.userWallet);
                    } else {
                        messageApi.error(messageApi.message);
                        navigate(pageRoutes.userWallet);
                    };
                };
                dispatch(verifyPaymentTransactionData({ payload: data, callback, messageApi }));
            },
            method: {
                netbanking: true,
                card: true,
                wallet: true,
                upi: true,
                paylater: false,
                emi: false,
            },
            config: {
                display: {
                    hide: [{ method: "paylater" }, { method: "emi" }],
                },
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    if (isSubscriptionLoader) {
        return <Loader />;
    };
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
                                    Top Up Your Wallet
                                </h4>
                            </div>
                            <div className="ct_wallet_light_yellow_bg">
                                <p className="mb-1 ct_text_op_6">Wallet Balance</p>
                                <h2 className="ct_fs_18 ct_fw_600">{userData?.attributes?.ycoins ?? 0} YCoins</h2>
                                <div className="ct_wallet_icon_top">
                                    <img src="assets/img/wallet_icon.png" alt="" />
                                </div>
                            </div>
                            <div className="mt-5">
                                <h4 className="ct_fs_20 ct_fw_600 mb-4">Topup Recharge Plans
                                </h4>
                                <ul>
                                    {topUpPlan?.map((item) => (
                                        <li onClick={() => setSelectedPlan(item)} >
                                            <div className={`d-flex align-items-center justify-content-between gap-3 ct_top_wallet_bg ${item?.id == selectedPlan?.id && 'active'}`}>
                                                <p className="ct_fs_20 ct_fw_600 mb-0">{item?.ycoins_ammount ?? 0} YCoins</p>
                                                <p className="ct_fs_20 ct_fw_600 mb-0">Rs. {item?.rupees_ammount ?? 0}</p>
                                            </div>
                                        </li>
                                    ))}
                                    <p className="ct_text_op_6"><i className="fa-solid fa-circle-info me-2"></i>YCoins valid only till you have an active subscription
                                    </p>
                                </ul>
                                {topUpPlan?.length != 0 &&
                                    <div className="mt-5 text-center">
                                        <button className="ct_yellow_btn" onClick={handleUpgradeWalletYCoins}>Continue</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default TopUpUserWallet;