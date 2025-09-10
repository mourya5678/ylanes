import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { commentUserPost, createUserPost, getAllPost, getAllPostComment, getMyProfileData, getPostTopics, likeUserPost } from '../../redux/actions/authActions';
import { Formik } from 'formik';
import { CreatePostSchema } from '../../auth/Schema';
import ErrorMessage from '../../layout/ErrorMessage';
import Loader from '../../components/Loader';

// import OwlCarousel from "react-owl-carousel2";
// import "react-owl-carousel2/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IMAGE_URL } from '../../routes/BackendRoutes';
import CommentTime from '../../components/CommentTime';
import { pipGetAccessToken } from '../../auth/Pip';

const Home = ({ messageApi }) => {
    const { isLoading, postTopic, allPosts, allComments, profileData } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [postImages, setPostImages] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState();

    const [userData, setUserData] = useState({});
    const [addComment, setAddComment] = useState('');

    const initialState = {
        topic: "",
        title: ""
    };

    useEffect(() => {
        dispatch(getPostTopics({ messageApi }));
        dispatch(getAllPost({ messageApi }));
        const data = pipGetAccessToken("user_data");
        dispatch(getMyProfileData({ payload: data?.id, messageApi }))
    }, []);

    useEffect(() => {
        const data = pipGetAccessToken("user_data");
        setUserData(data);
    }, [profileData]);

    const handleSubmitDetails = (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            dispatch(getAllPost({ messageApi }))
        };
        const formData = new FormData();
        formData.append("body", values?.title?.trim())
        formData.append("catalogue_tag_id", values?.topic)
        formData.append("catalogue_tag_ids[]", values?.topic)
        if (postImages?.length != 0) {
            postImages?.map((item) =>
                formData.append("docs[]", item)
            );
        };
        dispatch(createUserPost({ payload: formData, callback, messageApi }))
    };

    const handleImageChanges = (e) => {
        const files = Array.from(e.target.files);
        setPostImages((prevImages) => [...prevImages, ...files]);
    };

    const handleLikeUserPost = (id, isLike) => {
        var raw = {
            data: {
                attributes: {
                    likeable_id: id,
                    likeable_type: "BxBlockPosts::Post",
                    liked: !isLike,
                },
            },
        };
        const callback = (response) => {
            dispatch(getAllPost({ messageApi }))
        };
        dispatch(likeUserPost({ payload: raw, callback, messageApi }));
    };

    const handleCommentUserPost = (id) => {
        const callback = (response) => {
            dispatch(getAllPost({ messageApi }))
            setAddComment()
        };
        const regex = /^(?!\s*$)[^\s]+$/;
        if (regex.test(addComment)) {
            var raw = {
                data: {
                    attributes: {
                        likeable_id: id,
                        likeable_type: "BxBlockPosts::Post",
                        body: addComment.trim()
                    },
                },
            };
            dispatch(commentUserPost({ payload: raw, callback, messageApi }));
        } else {
            messageApi.error("Invalid comment: cannot be empty or contain spaces")
        }
    };

    const handleGetCommentData = (id) => {
        setSelectedPostId(id)
        dispatch(getAllPostComment({ payload: id, messageApi }));
    };

    const handleDeleteImage = (index) => {
        setPostImages((prev) => prev.filter((item, i) => i !== index));
    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between align-items-center mb-4 ct_flex_col_767 gap-3">
                                <div className="position-relative ct_w_100_767">
                                    <div className="ct_search_input ct_w_100_767">
                                        <input type="search" className="form-control ct_input ct_border_radius_100" placeholder="Search" />
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <div className="ct_searchable_list d-none">
                                        <ul className="ct_custom_scroll">
                                            <li>
                                                <p className="mb-0 ct_fw_600">Topics</p>
                                                <p className="mb-0 ct_fw_600"><i className="fa-solid fa-angle-right"></i></p>
                                            </li>
                                            <li>
                                                <p className="mb-0 ct_fw_600">Profiles</p>
                                                <p className="mb-0 ct_fw_600"><i className="fa-solid fa-angle-right"></i></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex  align-items-center gap-2 ct_w_100_767">
                                    <button className="ct_outline_border ct_w_100_767" onClick={() => navigate(pageRoutes.userWallet)}><img src="assets/img/wallet_icon.png" alt=""
                                        width="20px" />{userData?.attributes?.ycoins ?? 0}</button>
                                    <a className="ct_yellow_btn ct_w_100_767 text-center" onClick={() => navigate(pageRoutes.createRoom)}>Create Room</a>
                                </div>
                            </div>
                            <div className="ct_upload_post_box">
                                <Formik
                                    initialValues={initialState}
                                    validationSchema={CreatePostSchema}
                                    onSubmit={(values, actions) =>
                                        handleSubmitDetails(values, actions)
                                    }
                                >
                                    {({
                                        values,
                                        touched,
                                        errors,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        setFieldValue,
                                        setFieldError,
                                        isSubmitting,
                                    }) => (
                                        <form>
                                            <div className="ct_outline_border d-block ct_border_radius_15">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <input
                                                        id="title"
                                                        value={values?.title}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        className="form-control ct_border_radius_10  ct_input border-0"
                                                        placeholder="what is happning?"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="title"
                                                />
                                                {postImages?.length != 0 &&
                                                    <div className="item">
                                                        <Swiper
                                                            modules={[Navigation]}
                                                            spaceBetween={30}
                                                            slidesPerView={3}
                                                            navigation
                                                            loop
                                                            autoplay={{ delay: 2000 }}
                                                        >
                                                            {postImages?.map((item, i) => (
                                                                <SwiperSlide>
                                                                    <div className="item">
                                                                        <div className="ct_post_img ct_single_uploaded_img">
                                                                            <img src={URL.createObjectURL(item)} alt="" />
                                                                            <i class="fa-solid fa-xmark" onClick={() => handleDeleteImage(i)}></i>
                                                                        </div>
                                                                    </div>
                                                                </SwiperSlide>
                                                            ))}
                                                        </Swiper>
                                                    </div>
                                                }
                                                <div className="d-flex align-items-center gap-3 justify-content-between ct_border_top_1 pt-3 mt-3">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div>
                                                            <select
                                                                className="form-control ct_input ct_border_radius_100 h-auto p-2 px-3 ct_w_fit_content"
                                                                id="topic"
                                                                value={values.topic}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Topic</option>
                                                                {postTopic?.length != 0 &&
                                                                    postTopic?.map((item) => (
                                                                        <option value={item?.attributes?.id}>{item?.attributes?.name ?? ""}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <input
                                                                    multiple
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="d-none"
                                                                    id="ct_upload_file"
                                                                    onChange={(e) => handleImageChanges(e)}
                                                                />
                                                                <i className="fa-solid fa-paperclip text-dark"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <button onClick={handleSubmit} className="ct_yellow_btn ct_white_nowrap">Post</button>
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="topic"
                                                />
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                            <div className="d-flex align-items-center gap-3 justify-content-between mt-4">
                                <select className="form-control ct_input border-0 ct_w_fit_content px-0 ct_fw_600">
                                    <option value="">All</option>
                                    {postTopic?.length != 0 &&
                                        postTopic?.map((item) => (
                                            <option value={item?.attributes?.name}>{item?.attributes?.name ?? ""}</option>
                                        ))
                                    }
                                </select>
                                <select className="form-control ct_input border-0 ct_w_fit_content px-0 ct_fw_600">
                                    <option value="">Latest</option>
                                    <option value="">Oldest</option>
                                    <option value="">Newest</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center gap-3 mt-2">
                                <label className="toggle-switch">
                                    <input type="checkbox" />
                                    <div className="toggle-switch-background">
                                        <div className="toggle-switch-handle"></div>
                                    </div>
                                </label>
                                <p className="mb-0">Conection Comments</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {allPosts?.length != 0 &&
                                allPosts?.map((item) => (
                                    <div className="ct_uploaded_post_main mb-3">
                                        <div className="d-flex align-items-center justify-content-between gap-2">
                                            <div className="ct_upload_user_name">
                                                <img src={IMAGE_URL + item?.attributes?.user?.profile_image} alt="" className="ct_img_40 ct_flex_shrink_0" />
                                                <p className="mb-0 ct_fw_600">{item?.attributes?.user?.name ?? ""}</p>
                                                <span className="ct_text_op_6 ct_fs_14">{item?.attributes?.created_at ?? ""}</span>
                                            </div>
                                            <div className="dropdown ct_post_setting_drop">
                                                <i className="fa-solid fa-ellipsis-vertical" type="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false"></i>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" data-bs-target="#ct_delete_modal"
                                                        data-bs-toggle="modal">Delete</a></li>
                                                    <li><a className="dropdown-item" data-bs-target="#ct_block_modal"
                                                        data-bs-toggle="modal">Block</a></li>
                                                    <li><a className="dropdown-item" data-bs-target="#ct_report_modal"
                                                        data-bs-toggle="modal">Report</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="ct_para_scroll ct_custom_scroll mt-3">
                                            {item?.attributes?.body ?? ""}
                                        </p>
                                        {item?.attributes?.docs?.length != 0 &&
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
                                                                    <img src={IMAGE_URL + item?.url} alt="" />
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        }
                                        <div className="ct_like_comment_div">
                                            <ul>
                                                <li>
                                                    <div className="ct_like_btn d-flex align-items-center gap-2">
                                                        <i className="fa-regular fa-thumbs-up" onClick={() => handleLikeUserPost(item?.attributes?.id, item?.attributes?.liked)}></i>
                                                        <p className="mb-0 ct_fw_500  ">{item?.attributes?.like_count ?? 0}</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="ct_comment_bnt  d-flex align-items-center gap-2" onClick={() => handleGetCommentData(item?.attributes?.id)}>
                                                        <i className="fa-regular fa-message" ></i>
                                                        <p className="mb-0 ct_fw_500 ">{item?.attributes?.comment_count ?? 0}</p>
                                                    </div>
                                                </li>
                                                <li className="ct_book_mark_icon  ">
                                                    <i className="fa-regular fa-share-from-square"></i>
                                                </li>
                                                <li className="ms-auto ct_text_op_6 ct_fs_14">
                                                    # {item?.attributes?.topics ?? ""}
                                                </li>
                                            </ul>
                                            <div className="ct_comment_area_main mt-4  ">
                                                <div className='position-relative'>
                                                    <input type="text" value={addComment} onChange={(e) => setAddComment(e.target.value)} className="form-control ct_input ct_custom_input w-100" placeholder="Write comment..." />
                                                    <button className='ct_send_msg_btn ct_yellow_btn' onClick={() => handleCommentUserPost(item?.attributes?.id, item?.attributes?.liked)}>Send</button>
                                                </div>
                                                <div className="ct_comment_area_scroll">
                                                    <div className="d-flex justify-content-between gap-2 mt-3">
                                                        <div>
                                                            <div>
                                                                {
                                                                    selectedPostId == item?.attributes?.id &&
                                                                    allComments?.length != 0 &&
                                                                    allComments?.map((item) => (
                                                                        <div className="d-flex  gap-3 mb-3">
                                                                            <img src={IMAGE_URL + item?.attributes?.user?.profile_image} alt="" className="ct_img_40 ct_bor ct_white_border_1" />
                                                                            <div style={{ flex: "1" }}>
                                                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                                    <h5 className="ct_fs_15  ct_fw_600 mb-0">{item?.attributes?.user?.name ?? ""}</h5>
                                                                                    <div className="d-flex align-items-center gap-3">
                                                                                        <p className="mb-0  ct_fs_12  ct_text_op_5">
                                                                                            <CommentTime timestamp={item?.attributes?.created_at} />
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="ct_fs_13 mb-0 mt-1  ct_ff_roboto ct_line_height_22 ct_commented_text "><span>{item?.attributes?.body ?? ""}</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0 ct_fw_500 ct_white_nowrap ct_yellow_text" data-bs-target="#ct_report_modal"
                                                                data-bs-toggle="modal">Report</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {/* <div className="ct_uploaded_post_main mb-3">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                    <div className="ct_upload_user_name">
                                        <img src="assets/img/user.png" alt="" className="ct_img_40 ct_flex_shrink_0" />
                                        <p className="mb-0 ct_fw_600">John Doe</p>
                                        <span className="ct_text_op_6 ct_fs_14">24 days ago</span>
                                    </div>
                                    <div className="dropdown ct_post_setting_drop">
                                        <i className="fa-solid fa-ellipsis-vertical" type="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        </i>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" data-bs-target="#ct_delete_modal"
                                                data-bs-toggle="modal">Delete</a></li>
                                            <li><a className="dropdown-item" data-bs-target="#ct_block_modal"
                                                data-bs-toggle="modal">Block</a></li>
                                            <li><a className="dropdown-item" data-bs-target="#ct_report_modal"
                                                data-bs-toggle="modal">Report</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="ct_para_scroll ct_custom_scroll mt-3">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, veniam non, ab nemo numquam
                                    obcaecati dolor quisquam nihil deserunt adipisci sit blanditiis reprehenderit deleniti ut saepe reiciendis
                                    praesentium dolorem voluptate.
                                </p>
                                <div className="ct_like_comment_div">
                                    <ul>
                                        <li>
                                            <div className="ct_like_btn d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-thumbs-up"></i>
                                                <p className="mb-0 ct_fw_500  ">0</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ct_comment_bnt  d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-message"></i>
                                                <p className="mb-0 ct_fw_500 ">0</p>
                                            </div>
                                        </li>
                                        <li className="ct_book_mark_icon  ">
                                            <i className="fa-regular fa-share-from-square"></i>
                                        </li>
                                        <li className="ms-auto ct_text_op_6 ct_fs_14">
                                            #Geo Politics
                                        </li>
                                    </ul>
                                    <div className="ct_comment_area_main mt-4  ">
                                        <input type="text" className="form-control ct_input ct_custom_input w-100" placeholder="Write comment..." />
                                        <div className="ct_comment_area_scroll">
                                            <div className="d-flex justify-content-between gap-2 mt-3">
                                                <div>
                                                    <div>
                                                        <div className="d-flex  gap-3 ">
                                                            <img src="assets/img/user.png" alt="" className="ct_img_40 ct_bor ct_white_border_1" />
                                                            <div style={{ flex: "1" }}>
                                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                    <h5 className="ct_fs_15  ct_fw_600 mb-0">Bradford Bogisich</h5>
                                                                    <div className="d-flex align-items-center gap-3">

                                                                        <p className="mb-0  ct_fs_12  ct_text_op_5">2 days ago</p>
                                                                    </div>
                                                                </div>
                                                                <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-3"><span>Design
                                                                    Shot is an invitation to ponder cn design as a living entity. capture of embodying and
                                                                    influencing the flow of thoughts and sensations in</span>
                                                                </p>
                                                                <div className="mt-2 ">
                                                                    <a className="text-dark ct_fw_600 ct_fs_14">Reply</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 d-none ">
                                                            <input type="text" className="form-control ct_input h-auto py-2" placeholder="Reply" />
                                                            <div className="d-flex  gap-3 ps-4 pt-3">
                                                                <img src="assets/img/user.png" alt="" className="ct_img_40 ct_bor ct_white_border_1" />
                                                                <div style={{ flex: "1" }}>
                                                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                        <h5 className="ct_fs_15  ct_fw_600 mb-0">Bradford Bogisich</h5>
                                                                        <div className="d-flex align-items-center gap-3">

                                                                            <p className="mb-0  ct_fs_12  ct_text_op_5">2 days ago</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-3">
                                                                        <span>Design Shot is an invitation to ponder cn design as a living entity. capture of
                                                                            embodying and
                                                                            influencing the flow of thoughts and sensations in</span>
                                                                    </p>
                                                                    <div className="mt-2 ">
                                                                        <a className="text-dark ct_fw_600 ct_fs_14">Reply</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="mb-0 ct_fw_500 ct_white_nowrap ct_yellow_text" data-bs-target="#ct_report_modal"
                                                        data-bs-toggle="modal">Report</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Home;