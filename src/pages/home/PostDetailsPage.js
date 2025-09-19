import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';
import { IMAGE_URL } from '../../routes/BackendRoutes';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useParams } from 'react-router';

const PostDetailsPage = ({ messageApi }) => {
    const dispatch = useDispatch();
    const { isLoading, allPosts } =
        useSelector((state) => state.authReducer);
    const post_id = window.location?.search;

    useEffect(() => {
        dispatch(getAllPost({ messageApi }));
    }, []);

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="py-4 pb-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 mt-4">
                            {allPosts?.length != 0 &&
                                allPosts?.map((item) => (
                                    item?.attributes?.id == post_id?.slice(1) &&
                                    <div className="ct_uploaded_post_main mb-4 ">
                                        <div className="d-flex align-items-center justify-content-between gap-2">
                                            <div className="ct_upload_user_name">
                                                <img
                                                    src={item?.attributes?.user?.profile_image ? IMAGE_URL + item?.attributes?.user?.profile_image : "assets/img/dummy_user_img.png"}
                                                    alt=""
                                                    className="ct_img_40 ct_flex_shrink_0"
                                                />
                                                <p className="mb-0 ct_fw_600">
                                                    {item?.attributes?.user?.name ?? ""}
                                                </p>
                                                <span className="ct_text_op_6 ct_fs_14">
                                                    {item?.attributes?.created_at ?? ""}
                                                </span>
                                            </div>
                                            <div className="dropdown ct_post_setting_drop">
                                                <i
                                                    className="fa-solid fa-ellipsis-vertical"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                ></i>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                        // data-bs-target="#ct_delete_modal"
                                                        // data-bs-toggle="modal"
                                                        >
                                                            Delete
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                        // data-bs-target="#ct_block_modal"
                                                        // data-bs-toggle="modal"
                                                        >
                                                            Block
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                        // data-bs-target="#ct_report_modal"
                                                        // data-bs-toggle="modal"
                                                        >
                                                            Report
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="ct_para_scroll ct_custom_scroll mt-3">
                                            {item?.attributes?.body ?? ""}
                                        </p>
                                        {item?.attributes?.docs?.length != 0 && (
                                            <div className="item">
                                                <Swiper
                                                    modules={[Navigation]}
                                                    spaceBetween={30}
                                                    slidesPerView={3}
                                                    navigation
                                                    loop
                                                    autoplay={{ delay: 2000 }}
                                                >
                                                    {item?.attributes?.docs?.map((item) => (
                                                        <SwiperSlide>
                                                            <div className="item">
                                                                <div className="ct_post_img">
                                                                    <img
                                                                        src={item?.url ? IMAGE_URL + item?.url : "assets/img/dummy_user_img.png"}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default PostDetailsPage;