import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { createSubscriptionPlan, getAllSubscriptionPlan, getUserSubscriptionPlan, purchaseSubscriptionPlan } from '../../redux/actions/subscriptions';
import { BASE_URL, razorPayTestKey } from '../../routes/BackendRoutes';
import { getMyProfileData } from '../../redux/actions/authActions';

const Subscription = ({ messageApi }) => {
  const { isSubscriptionLoader, allSubscription, userPlan } = useSelector((state) => state.subscriptionReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedPlan, setSelectedPlan] = useState();

  useEffect(() => {
    dispatch(getAllSubscriptionPlan({ messageApi }));
    dispatch(getUserSubscriptionPlan({ messageApi }));
  }, []);

  const handlePurchasePlan = async (val) => {
    const callback = (response) => {
      handleOpenRazorPayModal(response, val)
    };
    dispatch(purchaseSubscriptionPlan({ payload: val?.amount, messageApi, callback }))
  };

  const handleOpenRazorPayModal = async (val, plan) => {
    var options = {
      description: "Refill wallet",
      name: "YLanes",
      key: razorPayTestKey,
      currency: "INR",
      order_id: val?.transaction?.order_id,
      prefill: {},
      theme: { color: "#528FF0" },
      handler: function (response) {
        const data = {
          plan_id: plan?.external_id,
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
            <div className="col-md-12">
              <div className="d-flex align-items-center   gap-3 mb-5">
                <a
                  onClick={() => navigate(pageRoutes.userWallet)}
                  className="ct_back_btn ct_cursor text-dark"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </a>
                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                  Subscription Plan
                </h4>
              </div>
              {userPlan?.length != 0 ? (
                userPlan?.slice(0, 1)?.map((item) => (
                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="ct_pricing_card p-4 h-auto ct_pricing_card_light_green position-relative">
                        <ul className="ct_price_plan_info_grid">
                          <li>
                            <p className="mb-0 ct_fw_600">{item?.name ?? ""}</p>
                            <p className="mb-0 ct_green_btn">{item?.status ?? ''}</p>
                          </li>
                          <li>
                            <p className="mb-0 ct_fw_600">Frequency</p>
                            <p className="mb-0">{item?.name ?? ""}</p>
                          </li>
                          <li>
                            <p className="mb-0 ct_fw_600">Plan</p>
                            <p className="mb-0">{item?.period ?? ""}</p>
                          </li>
                          <li>
                            <p className="mb-0 ct_fw_600">
                              Price (per Gold Member)
                            </p>
                            <p className="mb-0">Rs. {item?.amount ?? 0}</p>
                          </li>
                          <li>
                            <p className="mb-0 ct_fw_600">YCoins</p>
                            <p className="mb-0">{item?.ycoins ?? 0}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-5">
                  <div className="row">
                    {allSubscription?.length != 0 &&
                      allSubscription?.map((item, i) => (
                        <div className="col-lg-4 mb-5">
                          <div
                            className={`ct_pricing_card ${selectedPlan?.id == item?.id && "active"
                              }`}
                            onClick={() => setSelectedPlan(item)}
                          >
                            <span className="ct_pricing_badge">
                              Most Popular
                            </span>
                            <div>
                              <p className="mb-0 ct_fs_20 text-center mb-3 ct_fw_600">
                                {item?.name ?? ""}
                              </p>
                              <div className="ct_pricing_title">
                                <h2 className="ct_fs_35 text-center mb-0 ct_fw_600">
                                  Rs {item?.amount ?? 0}
                                </h2>
                                <p className="mb-0 text-center">
                                  One time payment
                                </p>
                              </div>
                              <ul className="ct_mt_30 mb-4">
                                {item?.description &&
                                  item?.description
                                    ?.split(",")
                                    ?.map((item) => (
                                      <li>
                                        <i className="fa-solid fa-check"></i>
                                        {item}
                                      </li>
                                    ))}
                              </ul>
                            </div>
                            <div className="mt-auto text-center pt-4">
                              <button
                                className="ct_yellow_btn w-100"
                                onClick={() => {
                                  handlePurchasePlan(item);
                                  setSelectedPlan(item);
                                }}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;