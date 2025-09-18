import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { createSubscriptionPlan, getAllSubscriptionPlan, getUserSubscriptionPlan, purchaseSubscriptionPlan } from '../../redux/actions/subscriptions';
import { BASE_URL, razorPayTestKey } from '../../routes/BackendRoutes';

const Subscription = ({ messageApi }) => {
    const { isSubscriptionLoader, allSubscription, userPlan } = useSelector((state) => state.subscriptionReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedPlan, setSelectedPlan] = useState();

    useEffect(() => {
        dispatch(getAllSubscriptionPlan({ messageApi }));
        dispatch(getUserSubscriptionPlan({ messageApi }));
    }, []);

    const handlePurchasePlan = (val) => {
        const callback = (response) => {
            handleOpenRazorPayModal(response)
        };
        dispatch(purchaseSubscriptionPlan({ payload: val?.amount, messageApi, callback }))
    };

    const handleOpenRazorPayModal = (val) => {
        var options = {
            description: "Refill wallet",
            name: "YLanes",
            key: razorPayTestKey,
            currency: "INR",
            order_id: val?.transaction?.order_id,
            prefill: {},
            theme: { color: "#528FF0" },
            handler: function (response) {
                // console.log("Razorpay Response:", response);
                const data = {
                    plan_id: 'unlimited',
                    payload: { ...response }
                };
                const callback = (response) => {
                    if (response?.subscription) {
                        messageApi.success(response.message);
                        navigate(pageRoutes.userWallet);
                    } else {
                        messageApi.error(messageApi.message);
                        navigate(pageRoutes.userWallet);
                    };
                };
                dispatch(createSubscriptionPlan({ payload: data, callback, messageApi }))
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
                        {console.log({ userPlan })}
                        <div className="col-md-12">
                            <div className="d-flex align-items-center   gap-3 mb-5">
                                <a onClick={() => navigate(pageRoutes.userWallet)} className="ct_back_btn ct_cursor text-dark">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </a>
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Subscription Plan
                                </h4>
                            </div>
                            {userPlan?.length != 0 ?
                                userPlan?.slice(0, 1)?.map((item) => (
                                    <div className='row'>
                                        <div className='col-md-6 mx-auto'>
                                            <div className='ct_pricing_card h-auto ct_pricing_card_light_green position-relative'>
                                                <div class="ribbon-content">
                                                    <span class="ribbon">purchased </span>
                                                </div>
                                                <div>
                                                    <div className="ct_pricing_title">
                                                        <div className='ct_price_head_bg'>
                                                            <h2 className="ct_fs_35 text-center mb-0 ct_fw_600 d-flex align-items-center gap-2 justify-content-center">
                                                                Rs {item?.amount ?? 0} <span className='ct_fs_16'>/ Month</span></h2>
                                                            <p className="mb-0 text-center">One time payment</p>
                                                        </div>
                                                        <ul class="ct_mt_30 mb-4 px-3">
                                                            <li>
                                                                <i class="fa-solid fa-check"></i>
                                                                Yellow Tick
                                                            </li>
                                                            <li>
                                                                <i class="fa-solid fa-check"></i>Moderator Status
                                                            </li><li><i class="fa-solid fa-check"></i>Create any Video room free of cost including Moderated rooms. Earn Ycoins on participation for your Moderated rooms</li><li><i class="fa-solid fa-check"></i>Invitation to write blogs.</li></ul>
                                                    </div>
                                                    <div className='mb-0 px-3 d-flex align-items-center justify-content-between gap-2'>
                                                        <p className='mb-0'>Start Date : <span className='ct_fw_600'>08-05-2025</span></p>
                                                        <p className='mb-0'>End Date : <span className='ct_fw_600'>08-05-2025</span></p>
                                                    </div>
                                                </div>
                                                <div className='text-center mt-4'>
                                                    <button className='ct_yellow_btn mx-auto'>Upgrade Your Plan</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="mt-5">
                                    <div className="row">
                                        {allSubscription?.length != 0 &&
                                            allSubscription?.map((item, i) => (
                                                < div className="col-lg-4 mb-5">
                                                    <div className={`ct_pricing_card ${selectedPlan?.id == item?.id && "active"}`} onClick={() => setSelectedPlan(item)}>
                                                        <span className="ct_pricing_badge">Most Popular</span>
                                                        <div>
                                                            <p className="mb-0 ct_fs_20 text-center mb-3 ct_fw_600">{item?.name ?? ""}</p>
                                                            <div className="ct_pricing_title">
                                                                <h2 className="ct_fs_35 text-center mb-0 ct_fw_600">
                                                                    {/* {item?.currency} */}
                                                                    Rs {item?.amount ?? 0}</h2>
                                                                <p className="mb-0 text-center">One time payment</p>
                                                            </div>
                                                            <ul className="ct_mt_30 mb-4">
                                                                {item?.description &&
                                                                    item?.description?.split(',')?.map((item) => (
                                                                        <li>
                                                                            <i className="fa-solid fa-check"></i>{item}
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div className="mt-auto text-center pt-4">
                                                            <button className="ct_yellow_btn w-100" onClick={() => {
                                                                handlePurchasePlan(item)
                                                                setSelectedPlan(item)
                                                            }}>Continue</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
};

export default Subscription;