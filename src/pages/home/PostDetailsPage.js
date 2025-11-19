import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { commentUserPost, deleteUserPost, getAllPostComment, getAllPostCommentss, getLikeAllPost, getPostDataByID, likeUserPost } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from 'react-router';
import CommentTime from '../../components/CommentTime';

const PostDetailsPage = ({ messageApi }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, allComments, postDetails } = useSelector((state) => state.authReducer);
    const post_id = window.location?.hash?.split("#/post-details?");

    console.log({ post_id })

    const [selectedPostId, setSelectedPostId] = useState();
    const [addComment, setAddComment] = useState("");

    const [showShareModal, setShowShareModal] = useState(false);
    const [shareCode, setShareCode] = useState({});


    useEffect(() => {
        dispatch(getPostDataByID({ messageApi, payload: post_id }))
    }, []);

    const handleDeleteUserPost = (val, id) => {
        if (val == "current_user") {
            const callback = (response) => {
                if (response?.message) {
                    messageApi.success(response?.message);
                } else {
                    messageApi.error(response?.message);
                };
                navigate(-1);
            };
            dispatch(deleteUserPost({ payload: id?.id, callback, messageApi }));
        };
    };

    const handleLikeUserPost = async (id, isLike) => {
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
            dispatch(getLikeAllPost({ messageApi }));
        };
        dispatch(likeUserPost({ payload: raw, callback, messageApi }));
    };

    const handleCommentUserPost = async (value) => {
        const callback = (response) => {
            setAddComment('');
            if (response?.data?.attributes) {
                messageApi?.success('Comment added successFully');
            } else {
                messageApi.error("Enable to create comment please try again!");
            };
            dispatch(getLikeAllPost({ messageApi }));
            setSelectedPostId(value);
            dispatch(getAllPostCommentss({ payload: value, messageApi }));
        };
        const regex = /^(?!\s*$).+$/;
        if (regex.test(addComment)) {
            const formData = new FormData();
            formData.append("body", addComment.trim());
            dispatch(commentUserPost({ payload: formData, params: `${value}/comments`, callback, messageApi }));
        } else {
            messageApi.error("Invalid comment: cannot be empty or contain spaces");
        };
    };

    const handleGetCommentData = (id) => {
        setSelectedPostId(id);
        dispatch(getAllPostComment({ payload: id, messageApi }));
    };

    const handleEditUserPost = () => {

    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="py-4 pb-4 position-relative">
                <div className='d-flex align-items-center gap-4'>
                    <div className='ct_back_icon ct_fw_600 ct_bakc_bg' onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-arrow-left me-1"></i>
                    </div>
                    <h4 className='ct_fs_20 ct_fw_600 mb-0'> Post Details</h4>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 mt-4">
                            {postDetails != 0 &&
                                postDetails?.attributes?.id == post_id?.slice(1) &&
                                <div className="ct_uploaded_post_main mb-4 ">
                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                        <div className="ct_upload_user_name">
                                            <img
                                                src={postDetails?.attributes?.user?.profile_image ? postDetails?.attributes?.user?.profile_image : "assets/img/dummy_user_img.png"}
                                                alt=""
                                                className="ct_img_40 ct_flex_shrink_0"
                                            />
                                            <p className="mb-0 ct_fw_600">
                                                {postDetails?.attributes?.user?.name ?? ""}
                                            </p>
                                            <span className="ct_text_op_6 ct_fs_14">
                                                {postDetails?.attributes?.created_at ?? ""}
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
                                                <li onClick={() => handleDeleteUserPost(postDetails?.attributes?.user?.connection_status, postDetails)}>
                                                    <a className="dropdown-item">
                                                        {postDetails?.attributes?.user?.connection_status == "pending" ?
                                                            <i className="fa-solid fa--clock me-2"></i>
                                                            :
                                                            postDetails?.attributes?.user?.connection_status == "current_user" ?
                                                                <i className="fa-solid fa-trash me-2"></i>
                                                                :
                                                                <i className="fa-solid fa-user-plus me-2"></i>
                                                        }
                                                        {postDetails?.attributes?.user?.connection_status == "pending" ? 'Pending' : postDetails?.attributes?.user?.connection_status == "connected" ? "Disconnect" : postDetails?.attributes?.user?.connection_status == "not_connected" ? "Connect" : 'Delete'}
                                                    </a>
                                                </li>
                                                {
                                                    postDetails?.attributes?.user?.connection_status == "current_user" &&
                                                    <li onClick={() => handleEditUserPost(postDetails)}>
                                                        <a className="dropdown-item">
                                                            <i className="fa-solid fa-pencil me-2"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                }
                                                {
                                                    postDetails?.attributes?.user?.connection_status != "current_user" &&
                                                    <li>
                                                        <a className="dropdown-item">
                                                            <i className="fa-solid fa-ban me-2"></i>
                                                            Block
                                                        </a>
                                                    </li>
                                                }
                                                {
                                                    postDetails?.attributes?.user?.connection_status != "current_user" &&
                                                    <li>
                                                        <a className="dropdown-item">
                                                            <i className="fa-solid fa-flag me-2"></i>
                                                            Report
                                                        </a>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="ct_para_scroll ct_custom_scroll mt-3">
                                        {postDetails?.attributes?.body ?? ""}
                                    </p>
                                    {postDetails?.attributes?.docs?.length != 0 && (
                                        <div className="item">
                                            <Swiper
                                                modules={[Navigation]}
                                                spaceBetween={30}
                                                slidesPerView={3}
                                                navigation
                                                loop
                                                autoplay={{ delay: 2000 }}
                                            >
                                                {postDetails?.attributes?.docs?.map((item) => (
                                                    <SwiperSlide>
                                                        <div className="item">
                                                            <div className="ct_post_img">
                                                                <img
                                                                    src={item?.url ? item?.url : "assets/img/dummy_user_img.png"}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    )}
                                    <div className="ct_like_comment_div">
                                        <ul>
                                            <li>
                                                <div className="ct_like_btn d-flex align-items-center gap-2">
                                                    <i
                                                        className={`fa-${postDetails?.attributes?.liked ? 'solid' : 'regular'} fa-thumbs-up ct_cursor`}
                                                        onClick={() =>
                                                            handleLikeUserPost(
                                                                postDetails?.attributes?.id,
                                                                postDetails?.attributes?.liked
                                                            )
                                                        }
                                                    ></i>
                                                    <p className="mb-0 ct_fw_500  ">
                                                        {postDetails?.attributes?.like_count ?? 0}
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="ct_comment_bnt  d-flex align-items-center gap-2"
                                                    onClick={() =>
                                                        handleGetCommentData(postDetails?.attributes?.id)
                                                    }
                                                >
                                                    <i className="fa-regular fa-message"></i>
                                                    <p className="mb-0 ct_fw_500 ">
                                                        {postDetails?.attributes?.comment_count ?? 0}
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="ct_book_mark_icon">
                                                <i className="fa-regular fa-share-from-square ct_cursor" onClick={() => {
                                                    setShareCode(postDetails)
                                                    setShowShareModal(true)
                                                }}></i>
                                            </li>
                                            <li className="ms-auto ct_text_op_6 ct_fs_14">
                                                # {postDetails?.attributes?.topics ?? ""}
                                            </li>
                                        </ul>
                                        {selectedPostId == postDetails?.attributes?.id && (
                                            <div className="ct_comment_area_main mt-4  ">
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        value={addComment}
                                                        onChange={(e) =>
                                                            setAddComment(e.target.value)
                                                        }
                                                        className="form-control ct_input ct_custom_input w-100"
                                                        placeholder="Write comment..."
                                                    />
                                                    <button
                                                        className="ct_send_msg_btn ct_yellow_btn"
                                                        onClick={() =>
                                                            handleCommentUserPost(
                                                                postDetails?.attributes?.id,
                                                                postDetails?.attributes?.liked
                                                            )
                                                        }
                                                    >
                                                        Send
                                                    </button>
                                                </div>
                                                <div className="ct_comment_area_scroll">
                                                    <div className="d-flex justify-content-between gap-2 mt-3">
                                                        <div>
                                                            <div>
                                                                {selectedPostId ==
                                                                    postDetails?.attributes?.id &&
                                                                    allComments?.length != 0 &&
                                                                    allComments?.map((item) => (
                                                                        <div className="d-flex  gap-3 mb-3">
                                                                            <img
                                                                                src={item?.attributes?.user?.profile_image ?
                                                                                    item?.attributes?.user
                                                                                        ?.profile_image : "assets/img/dummy_user_img.png"
                                                                                }
                                                                                alt=""
                                                                                className="ct_img_40 ct_bor ct_white_border_1"
                                                                            />
                                                                            <div style={{ flex: "1" }}>
                                                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                                    <h5 className="ct_fs_15  ct_fw_600 mb-0">
                                                                                        {item?.attributes?.user
                                                                                            ?.name ?? ""}
                                                                                    </h5>
                                                                                    <div className="d-flex align-items-center gap-3">
                                                                                        <p className="mb-0  ct_fs_12  ct_text_op_5">
                                                                                            <CommentTime
                                                                                                timestamp={
                                                                                                    item?.attributes
                                                                                                        ?.created_at
                                                                                                }
                                                                                            />
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="ct_fs_13 mb-0 mt-1  ct_ff_roboto ct_line_height_22 ct_commented_text ">
                                                                                    <span>
                                                                                        {item?.attributes?.body ??
                                                                                            ""}
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default PostDetailsPage;