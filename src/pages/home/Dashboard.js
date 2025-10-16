import React, { useEffect } from 'react';
import { getAllSubscriptionPlan, getDashboardAllSubscriptionPlan, getDashboardReview, getDashboardTopicAndDetails, getDashboardWhyYlanes } from '../../redux/actions/subscriptions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import LandingHeader from '../../components/LandingPageHeader';
import LandingPageFooter from '../../components/LandingPageFooter';

const Dashboard = ({ messageApi }) => {
    const { isSubscriptionLoader, allDashboardSubscription, whyYlanesData, buzzList, reviewList } = useSelector((state) => state.subscriptionReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDashboardAllSubscriptionPlan({ messageApi }));
        dispatch(getDashboardWhyYlanes({ messageApi }));
        dispatch(getDashboardTopicAndDetails({ messageApi }));
        dispatch(getDashboardReview({ messageApi }));
    }, []);

    if (isSubscriptionLoader) {
        return <Loader />;
    };
    return (
        <div>
            <LandingHeader />
            <section className="ct_section_banner">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4">
                            <div className="ct_banner_title ct_header_px_50">
                                <h2 className="ct_fs_44 mb-4 ct_fw_700">YLanes - An EXCLUSIVE
                                    CLUB for Wise, Witty & Curious MEN</h2>
                                <p className="ct_fs_18 ct_text_op_6 mb-4">Where intelligent conversations meet unfiltered camaraderie. Engage
                                    with polls, posts, and video chats on Business, Wellness, Sports, and more.
                                </p>
                                <h6 className=" ct_fs_16">Join this exclusive club and let your ideas flow freely.</h6>
                                <div className="mt-4">
                                    <a className="ct_yellow_btn ct_border_radius_10" onClick={() => navigate(pageRoutes.login)}>Start Your Free Trial</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="ct_banner_right_img">
                                <img src="assets/img/banner_right_img.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ct_why_bg py-5 text-white">
                <div className="container-fluid text-center">
                    <h2 className="mb-5 fw-bold">Why YLanes?</h2>
                    <div className="row  g-4">
                        {whyYlanesData?.length != 0 &&
                            whyYlanesData?.map((item) => (
                                <div className="col-lg-4 col-md-6">
                                    <div className="ct_why_choose_card p-4 h-100 rounded">
                                        <h5 className="ct_fs_20 mb-4">{item?.heading}</h5>
                                        <div dangerouslySetInnerHTML={{ __html: item?.paragraph ?? "" }}></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container-fluid">
                    <h2 className="text-center fw-bold mb-5">What's the Buzz?</h2>
                    <div className="row g-4">
                        {buzzList?.length != 0 &&
                            buzzList?.map((item) => (
                                <div className="col-lg-4 col-md-6">
                                    <div className="ct_wbuzz_card p-4 pe-0 h-100" style={{ background: "#c6a3f7" }}>
                                        <h5 className="fw-bold pe-4">{item?.attributes?.name ?? ""}</h5>
                                        <p className='ct_para_scroll pe-4 ct_custom_scroll pe-0'>{item?.attributes?.description ?? ""}</p>
                                        <img src="assets/img/icon_1.png" alt="Business" className="img-fluid mt-3" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container-fluid">
                    <h2 className="text-center fw-bold mb-5">What YLanes Members Say</h2>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="ct_review_slider"
                    >
                        {reviewList?.length != 0 &&
                            reviewList?.map((item) => (
                                <SwiperSlide>
                                    {console.log({ item })}
                                    <div className="ct_review_card p-4 rounded d-flex align-items-center">
                                        <div className="me-4 flex-shrink-0" style={{ maxWidth: "165px" }}>
                                            <img src={item?.image_url ?? "assets/img/asset_3.png"} alt="User 1" className="img-fluid rounded-3" />
                                        </div>
                                        <div>
                                            <span className="fs-2 text-warning">“</span>
                                            <div dangerouslySetInnerHTML={{ __html: item?.review ?? "" }}></div>
                                            <hr className="ct_light_hr" />
                                            <h6 className="fw-bold mb-0">{item?.name ?? ""}</h6>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </section>
            <section className="ct_how_works_bg py-5 text-white">
                <div className="container-fluid">
                    <h2 className="text-center mb-5 fw-bold">How It Works</h2>
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-4">
                            <div className="ct_how_works_card p-4 text-center h-100 position-relative rounded-4">
                                <div
                                    className="position-absolute top-0  translate-middle bg-white text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "40px", height: "40px" }}>
                                    1
                                </div>
                                <div className="mb-3 ct_how_work_icon">
                                    <img src="assets/img/how_work_icon_1.png" alt="Login" className="img-fluid" />
                                </div>
                                <h5 className="fw-semibold">Login with Mobile Number & OTP</h5>
                                <p className="small mb-0">
                                    No social media needed. Just your mobile number, an OTP, and you’re in. Your privacy is our priority.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ct_how_works_card p-4 text-center h-100 position-relative rounded-4">
                                <div
                                    className="position-absolute top-0  translate-middle bg-white text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "40px", height: "40px"
                                    }}>
                                    2
                                </div>
                                <div className="mb-3 ct_how_work_icon">
                                    <img src="assets/img/how_work_icon_2.png" alt="Profile" className="img-fluid" />
                                </div>
                                <h5 className="fw-semibold">Create your Profile</h5>
                                <p className="small mb-0">
                                    Pick a name, share a few details (anonymity optional), it’s quick and easy. Craft a profile that
                                    represents you.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ct_how_works_card p-4 text-center h-100 position-relative rounded-4">
                                <div
                                    className="position-absolute top-0  translate-middle bg-white text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "40px", height: "40px" }}>
                                    3
                                </div>
                                <div className="mb-3 ct_how_work_icon">
                                    <img src="assets/img/how_work_icon_3.png" alt="Membership" className="img-fluid" />
                                </div>
                                <h5 className="fw-semibold">Select a Membership Model</h5>
                                <p className="small mb-0">
                                    Choose what works best for you. Explore with a free trial before committing to the membership that suits
                                    your vibe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className=" my-5 ct_pricing_main">
                <div className="container-fluid">
                    <h2 className="text-center fw-bold mb-5">Membership Pricing</h2>
                    <div className="row g-4">
                        <div className="col-xl-3 col-lg-6 col-md-6 mb-4 mb-xl-0">
                            <div className="et_pricing_card position-relative ">
                                <Swiper
                                    modules={[Pagination, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    autoplay={{ delay: 3000 }}
                                    loop={true}
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        768: { slidesPerView: 1 },
                                        1024: { slidesPerView: 1 },
                                    }}
                                    className="ct_review_slider"
                                >
                                    {allDashboardSubscription?.length != 0 &&
                                        allDashboardSubscription?.map((item) => (
                                            <SwiperSlide>
                                                <div className="ct_border_bg_1">
                                                    <h5 className="text-center mb-4 ct_fs_24 mt-3 ">{item?.name ?? ""}</h5>
                                                    <div className="ct_border_bg_1">
                                                        <ul className="text-start">
                                                            {item?.description?.split(",")?.map((item) => (
                                                                <li>
                                                                    {item ?? ''}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>
                        {allDashboardSubscription?.length != 0 &&
                            allDashboardSubscription?.map((item) => (
                                <div className="col-xl-3 col-lg-6 col-md-6 mb-4 mb-xl-0">
                                    <div className="et_pricing_card text-center ct_border_bg_1 h-100 d-grid">
                                        <div className='mb-3'>
                                            <h5 className="text-center mb-4 ct_fs_24 mt-3 ">{item?.name ?? ""}</h5>
                                            <div className="price w-100 py-3">RS {item?.amount ?? 0}</div>
                                            <div className="ct_border_bg_1">
                                                <ul className="text-start">
                                                    {item?.description?.split(",")?.map((item) => (
                                                        <li>
                                                            {item ?? ''}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <button className="ct_black_btn mt-auto ct_transparent_btn">Get Started</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
            <section className="my-5">
                <div className="container ">
                    <div className="ct_newsletter_bg">
                        <h2 className="ct_fs_28 mb-4">Where Wise, Witty & Curious Men Belong</h2>
                        <p>
                            Join this private club where ideas flow freely, connections are authentic,
                            and conversations challenge the ordinary.
                        </p>
                        <p>
                            Explore topics that matter—business, wellness, sports, and more<br />
                            —with men as interesting as you.
                        </p>
                        <button className="newsletter-btn" onClick={() => navigate(pageRoutes.login)}>Join Now And Start Your Free Trial</button>
                    </div>
                </div>
            </section>
            <LandingPageFooter />
        </div>
    )
};

export default Dashboard;