import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { blockUserData, commentUserPost, createUserPost, deleteUserPost, getAllPost, getAllPostComment, getAllPostCommentss, getLikeAllPost, getMyProfileData, getMyProfileDatass, getPostTopics, likeUserPost } from '../../redux/actions/authActions';
import { Formik } from 'formik';
import { CreatePostSchema } from '../../auth/Schema';
import ErrorMessage from '../../layout/ErrorMessage';
import Loader from '../../components/Loader';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CommentTime from '../../components/CommentTime';
import { pipGetAccessToken, pipViewDate2 } from '../../auth/Pip';
import { disconnectUserConnection, getMyConnectionsData, getMyRoomData, getPollTypeData, getUpcommingRoomData, sendInvitationToUser } from '../../redux/actions/createRoom';
import CreatePollModal from '../../components/Modals/CreatePollModal';
import SharePostModal from '../../components/Modals/SharePostModal';
import EditPostModal from '../../components/Modals/EditPostModal';
import ReferCode from '../../components/Modals/ReferCode';

const Home = ({ messageApi }) => {
  const { isLoading, postTopic, allPosts, AllPollsData, allComments, profileData } =
    useSelector((state) => state.authReducer);
  const { isCreateLoading, myRoomList } = useSelector((state) => state.createRoomReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postImages, setPostImages] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState();

  const [userData, setUserData] = useState({});
  const [addComment, setAddComment] = useState("");

  const [isCreatePoll, setIsCreatePoll] = useState(false);

  const [filterBytopic, setFilterByTopic] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);

  const [showShareModal, setShowShareModal] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);

  const [shareCode, setShareCode] = useState({});
  const [postDetails, setPostDetails] = useState({});

  const [isLatest, setIsLatest] = useState(true);
  const [isConnectionComments, setIsConnectionsComments] = useState(false);

  // const [showShareModal2, setShowShareModal2] = useState(false);
  const user_data = pipGetAccessToken("user_data");


  var localData = [];
  const initialState = {
    topic: "",
    title: "",
  };

  const getDisplayUsers = (allPosts, filterByTopic) => {
    if (!filterByTopic || filterByTopic.length === 0) {
      return allPosts?.filter(
        (item) => !item?.attributes?.user?.is_blocked
      );
    };
    return allPosts?.filter((item) => {
      if (item?.attributes?.user?.is_blocked) return false;
      const topics = item?.attributes?.topics;
      if (typeof topics === "string") {
        return filterByTopic.includes(topics);
      };
      if (Array.isArray(topics)) {
        return topics.some((topic) => filterByTopic.includes(topic));
      };
      return false;
    });
  };
  const displayUser = getDisplayUsers(allPosts, filterBytopic);

  const getDisplayUsers2 = (AllPollsData, filterByTopic) => {
    if (!filterByTopic || filterByTopic.length === 0) {
      return AllPollsData?.filter(
        (item) => !item?.attributes?.user?.is_blocked
      );
    };
    return AllPollsData?.filter((item) => {
      if (item?.attributes?.user?.is_blocked) return false;
      const topic = item?.attributes?.topic;
      if (typeof topic === "string") {
        return filterByTopic.includes(topic);
      };
      if (Array.isArray(topic)) {
        return topic.some((t) => filterByTopic.includes(t));
      };
      return false;
    });
  };
  // usage
  const displayUser2 = getDisplayUsers2(AllPollsData, filterBytopic);

  useEffect(() => {
    dispatch(getAllPost({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
    dispatch(getMyRoomData({ messageApi }));
    dispatch(getPostTopics({ messageApi }));
    dispatch(getPollTypeData({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
    const data = pipGetAccessToken("user_data");
    dispatch(getMyConnectionsData({ messageApi }));
    dispatch(getMyProfileData({ payload: data?.id, messageApi }));
  }, []);

  useEffect(() => {
    const data = pipGetAccessToken("user_data");
    setUserData(data);
  }, [profileData]);

  useEffect(() => {
    dispatch(getAllPost({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
    dispatch(getPollTypeData({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
  }, [isConnectionComments, isLatest]);

  const handleSubmitDetails = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    resetForm();
    const callback = (response) => {
      setPostImages([]);
      dispatch(getLikeAllPost({ messageApi }));
      dispatch(getMyProfileData({ payload: user_data?.id, messageApi }));
      if (response?.data) {
        messageApi.success("Post created successfully");
      } else {
        messageApi.error("Unable to create post please try after some time!");
      }
    };
    const formData = new FormData();
    formData.append("body", values?.title?.trim());
    formData.append("catalogue_tag_id", values?.topic);
    formData.append("catalogue_tag_ids[]", values?.topic);
    if (postImages?.length != 0) {
      postImages?.map((item) => formData.append("docs[]", item));
    }
    dispatch(createUserPost({ payload: formData, callback, messageApi }));
  };

  const handleImageChanges = (e) => {
    const files = Array.from(e.target.files);
    setPostImages((prevImages) => [...prevImages, ...files]);
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
      dispatch(getMyProfileDatass({ payload: user_data?.id, messageApi }));
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
      dispatch(getMyProfileDatass({ payload: user_data?.id, messageApi }));
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

  const handleDeleteImage = (index) => {
    setPostImages((prev) => prev.filter((item, i) => i !== index));
  };

  const handleDeleteUserPost = (val, id) => {
    if (val == "current_user") {
      const callback = (response) => {
        dispatch(getAllPost({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
        dispatch(getMyProfileDatass({ payload: user_data?.id, messageApi }));
        if (response?.message) {
          messageApi.success(response?.message);
        } else {
          messageApi.error(response?.message);
        };
      };
      dispatch(deleteUserPost({ payload: id?.id, callback, messageApi }));
    } else if (val == "not_connected") {
      const callback = (response) => {
        if (response?.message) {
          messageApi?.success(response?.message);
        } else {
          messageApi?.error(response?.message);
        };
        dispatch(getAllPost({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
        dispatch(getMyProfileDatass({ payload: user_data?.id, messageApi }));
      };
      const raw = {
        data: {
          account_id: id?.attributes?.user?.id
        },
      };
      if (id?.attributes?.user?.connection_status != "pending") {
        dispatch(sendInvitationToUser({ payload: raw, callback, messageApi }));
      } else {
        messageApi.error("Already a friend or previous request is pending to take action")
      }
    } else if (val == "connected") {
      const callback = (response) => {
        if (response?.message) {
          messageApi?.success(response?.message);
        } else {
          messageApi?.error(response?.message);
        };
        dispatch(getAllPost({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
        dispatch(getMyProfileDatass({ payload: user_data?.id, messageApi }));
      };
      dispatch(disconnectUserConnection({ payload: id?.attributes?.user?.id, callback, messageApi }))
    };
  };

  const handleBlockUser = (value) => {
    const callback = (response) => {
      dispatch(getAllPost({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
      dispatch(getMyProfileDatass({ payload: user_data?.id, messageApi }));
      if (response?.message) {
        messageApi?.success(response?.message);
      } else {
        messageApi?.error(response?.message);
      };
    };
    let formData = new FormData();
    formData.append("user_id", value?.user?.id);
    dispatch(blockUserData({ payload: formData, callback, messageApi }));
  };

  if (isLoading || isCreateLoading) {
    return <Loader />;
  };
  return (
    <div>
      <Header messageApi={messageApi} />
      <section className="py-4 pb-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 mt-0 mb-4 mb-xl-0">
              <div className="ct_side_bar_scrool_left ct_custom_scroll">
                <div className="ct_outline_bg d-flex align-items-center gap-2 justify-content-between p-3">
                  <p className="mb-0">Invite Friends,Earn YCoins</p>
                  <button className="ct_yellow_btn ct_small_yellow_btn ct_white_nowrap" onClick={() => navigate(pageRoutes.refer)}>
                    Invite Friends
                  </button>
                </div>
                <div className="ct_outline_bg mt-4 p-3">
                  <div className="d-flex align-items-center gap-2 justify-content-between">
                    <h4 className="ct_fs_20 ct_fw_600 mb-0">Poll</h4>
                    <a
                      className="ct_yellow_btn  ct_white_nowrap ct_small_yellow_btn"
                      onClick={() => setIsCreatePoll(true)}
                    >
                      Create Poll
                    </a>
                  </div>
                  {displayUser2?.length != 0 ? (
                    displayUser2?.slice(0, 1)?.map((item) => (
                      <div
                        className="ct_outline_border  ct_border_radius_10 mt-3 d-block"
                        style={{ borderColor: "#e6e6e6" }}
                      >
                        <h6 className="ct_fs_16">
                          {item?.attributes?.body ?? ""}
                        </h6>
                        <ul>
                          {item?.attributes?.options_attributes?.map((item) => (
                            <li>
                              <div className="form-check ct_custom_radio">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  disabled
                                />
                                <label
                                  className="form-check-label ct_fs_14 ct_fw_500 ct_text_op_6"
                                  for="flexRadioDefault1"
                                >
                                  {item?.body ?? ""}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="pb-2 pt-4">
                      <p className="mb-0 ct_fw_600 text-center">
                        No polls available at the moment
                      </p>
                    </div>
                  )}
                  {AllPollsData?.length != 0 && (
                    <div className="text-end mt-2">
                      <a
                        className="ct_yellow_text ct_fw_500 ct_cursor"
                        onClick={() => navigate(pageRoutes.poll)}
                      >
                        See More
                      </a>
                    </div>
                  )}
                </div>
                <div className="ct_outline_bg mt-4 p-3">
                  <h4 className="ct_fs_20 ct_fw_600 mb-4">My Rooms</h4>
                  {myRoomList?.length != 0 ? (
                    myRoomList?.slice(0, 1)?.map((item) => (
                      <div
                        className="ct_outline_border  ct_border_radius_10 mt-3 d-block"
                        style={{ borderColor: "#e6e6e6" }}
                      >
                        <div>
                          <h4 className="ct_fs_18 ct_0fw_600">
                            Finance &amp; Economics
                          </h4>
                          <small className="text-end d-block">Standard</small>
                        </div>
                        <div>
                          <small className="ct_fs_14 ct_fw_500">
                            {item?.attributes?.host?.data?.attributes
                              ?.full_name ?? ""}
                          </small>
                          <p className="mb-0 ct_fs_14">
                            {item?.attributes?.your_take ?? ""}
                          </p>
                        </div>
                        <small className="ct_text_op_6 d-block text-end mt-3">
                          {item?.attributes?.remaining_seats ?? 0} seat
                          available
                        </small>
                        <div className="ct_border_top_1 pt-3 mt-3 d-flex align-items-start gap-3 justify-content-between">
                          <div className="d-flex align-items-center gap-3 flex-wrap">
                            <p className="mb-0">
                              <i className="fa-regular fa-clock me-2"></i>
                              {pipViewDate2(item?.attributes?.start_time)}
                            </p>
                            <p className="mb-0">
                              <img
                                alt=""
                                width="20px"
                                className="me-1"
                                src="assets/img/wallet_icon.png"
                              />
                              {item?.attributes?.room_price ?? 0}
                            </p>
                            <p className="mb-0">
                              <i className="fa-solid fa-star me-1"></i>
                              {item?.attributes?.room_type_name ?? ""}
                            </p>
                          </div>
                          <div>
                            <i className="fa-solid fa-share-nodes"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p className="mb-0 ct_fw_600 text-center">
                        You haven’t created a room yet.
                      </p>
                    </div>
                  )}
                  {myRoomList?.length != 0 && (
                    <div className="text-end mt-2">
                      <a
                        className="ct_yellow_text ct_cursor ct_fw_500"
                        onClick={() => navigate(pageRoutes.myRoom)}
                      >
                        See More
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6  mb-4 mb-xl-0">
              <div className=" ct_side_bar_scrool_left ">
                <div className="row">
                  <div className="col-md-12">
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
                          resetForm
                        }) => (
                          <form>
                            <div className="ct_outline_border d-block ct_border_radius_15">
                              <div className="d-flex align-items-center gap-3 justify-content-between">
                                <div className="ct_flex_1">
                                  <div className="d-flex align-items-start gap-3">
                                    <img
                                      src={userData?.attributes?.profile_image ? userData?.attributes?.profile_image : "assets/img/dummy_user_img.png"}
                                      onClick={() => navigate(pageRoutes.profile)}
                                      className="ct_img_40"
                                    />
                                    <div className="w-100">
                                      <div className='position-relative'>
                                        <textarea type='text'
                                          id="title"
                                          onClick={() => setIsShowForm(true)}
                                          value={values?.title}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          className="form-control ct_border_radius_10 pe-5 ct_input border-0 h-auto" rows={2}
                                          placeholder="What is happening?"
                                        />
                                        {isShowForm &&
                                          <i className="fa-solid fa-xmark ct_show_eye" onClick={() => {
                                            resetForm()
                                            setPostImages([]);
                                            setIsShowForm(!isShowForm);
                                          }}></i>
                                        }
                                      </div>
                                      <ErrorMessage
                                        errors={errors}
                                        touched={touched}
                                        fieldName="title"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {!isShowForm &&
                                  <button
                                    onClick={() => {
                                      handleSubmit()
                                      setIsShowForm(true)
                                    }}
                                    className="ct_yellow_btn ct_white_nowrap ct_w_100_575"
                                  >
                                    Post
                                  </button>
                                }
                              </div>
                              {postImages?.length != 0 && (
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
                                            <img
                                              src={URL.createObjectURL(item)}
                                              alt=""
                                            />
                                            <i
                                              className="fa-solid fa-xmark"
                                              onClick={() =>
                                                handleDeleteImage(i)
                                              }
                                            ></i>
                                          </div>
                                        </div>
                                      </SwiperSlide>
                                    ))}
                                  </Swiper>
                                </div>
                              )}
                              <div className={`${isShowForm ? 'd-flex' : 'd-none'} align-items-center gap-3 justify-content-between ct_border_top_1 pt-3 mt-3 ct_flex_col_575`}>
                                <div className="d-flex align-items-center gap-3 ct_w_100_575">
                                  <div className="ct_w_100_575">
                                    <select
                                      className="form-control ct_input ct_border_radius_100 h-auto p-2 px-3 ct_w_fit_content ct_w_100_575"
                                      id="topic"
                                      value={values.topic}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    >
                                      <option value="">Select Topic</option>
                                      {postTopic?.length != 0 &&
                                        postTopic?.map((item) => (
                                          <option value={item?.attributes?.id}>
                                            {item?.attributes?.name ?? ""}
                                          </option>
                                        ))}
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
                                      <i className="fa-solid fa-paperclip text-dark ct_cursor_pointer"></i>
                                    </label>
                                  </div>
                                </div>
                                <button
                                  onClick={handleSubmit}
                                  className="ct_yellow_btn ct_white_nowrap ct_w_100_575"
                                >
                                  Post
                                </button>
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
                  </div>
                  <div className="col-md-12 mt-4">
                    {displayUser?.length != 0 &&
                      displayUser?.map((item) => (
                        <div className="ct_uploaded_post_main mb-4 ">
                          <div className="d-flex align-items-center justify-content-between gap-2">
                            <div className="ct_upload_user_name ct_cursor"
                              onClick={() => navigate(pageRoutes.userProfile, { state: { data: item?.attributes?.user?.id } })}
                            >
                              <img
                                src={item?.attributes?.user?.profile_image ? item?.attributes?.user?.profile_image : "assets/img/dummy_user_img.png"}
                                alt=""
                                className="ct_img_40 ct_flex_shrink_0"
                              />
                              {/* onClick={() => navigate(`${pageRoutes.postDetails}?${item?.id}`)} */}
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
                                <li onClick={() => handleDeleteUserPost(item?.attributes?.user?.connection_status, item)}>
                                  <a className="dropdown-item">
                                    {item?.attributes?.user?.connection_status == "pending" ?
                                      <i className="fa-solid fa-clock me-2"></i>
                                      :
                                      item?.attributes?.user?.connection_status == "current_user" ?
                                        <i className="fa-solid fa-trash me-2"></i>
                                        :
                                        <i className="fa-solid fa-user-plus me-2"></i>
                                    }
                                    {item?.attributes?.user?.connection_status == "pending" ? 'Pending' : item?.attributes?.user?.connection_status == "connected" ? "Disconnect" : item?.attributes?.user?.connection_status == "not_connected" ? "Connect" : 'Delete'}
                                  </a>
                                </li>
                                {
                                  item?.attributes?.user?.connection_status == "current_user" &&
                                  <li onClick={() => {
                                    setIsEditPost(true)
                                    setPostDetails(item)
                                  }}>
                                    <a className="dropdown-item">
                                      <i className="fa-solid fa-pencil me-2"></i>
                                      Edit
                                    </a>
                                  </li>
                                }
                                {
                                  item?.attributes?.user?.connection_status != "current_user" &&
                                  <li>
                                    <a className="dropdown-item" onClick={() => handleBlockUser(item?.attributes)}>
                                      <i className="fa-solid fa-ban me-2"></i>
                                      Block
                                    </a>
                                  </li>
                                }
                                {
                                  item?.attributes?.user?.connection_status != "current_user" &&
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
                          <p className="ct_para_scroll ct_cursor ct_custom_scroll mt-3" onClick={() => navigate(`${pageRoutes.postDetails}?${item?.id}`)}>
                            {item?.attributes?.body ?? ""}
                          </p>
                          {item?.attributes?.docs?.length != 0 && (
                            <div className="item ct_cursor" onClick={() => navigate(`${pageRoutes.postDetails}?${item?.id}`)}>
                              <Swiper
                                modules={[Navigation]}
                                spaceBetween={30}
                                slidesPerView={2}
                                navigation
                                loop={item?.attributes?.docs?.length > 2}
                                autoplay={{ delay: 2000 }}
                              >
                                {item?.attributes?.docs?.map((item) => (
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
                                    className={`fa-${item?.attributes?.liked ? 'solid' : 'regular'} fa-thumbs-up ct_cursor`}
                                    onClick={() =>
                                      handleLikeUserPost(
                                        item?.attributes?.id,
                                        item?.attributes?.liked
                                      )
                                    }
                                  ></i>
                                  <p className="mb-0 ct_fw_500  ">
                                    {item?.attributes?.like_count ?? 0}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div
                                  className="ct_comment_bnt  d-flex align-items-center gap-2"
                                  onClick={() =>
                                    handleGetCommentData(item?.attributes?.id)
                                  }
                                >
                                  <i className="fa-regular fa-message"></i>
                                  <p className="mb-0 ct_fw_500 ">
                                    {item?.attributes?.comment_count ?? 0}
                                  </p>
                                </div>
                              </li>
                              <li className="ct_book_mark_icon">
                                <i className="fa-regular fa-share-from-square ct_cursor" onClick={() => {
                                  setShareCode(item)
                                  setShowShareModal(true)
                                }}></i>
                              </li>
                              <li className="ms-auto ct_text_op_6 ct_fs_14">
                                # {item?.attributes?.topics ?? ""}
                              </li>
                            </ul>
                            {selectedPostId == item?.attributes?.id && (
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
                                    className="ct_send_msg_btn ct_yellow_btn ct_send_btn_postion"
                                    onClick={() =>
                                      handleCommentUserPost(
                                        item?.attributes?.id,
                                        item?.attributes?.liked
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
                                          item?.attributes?.id &&
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
                                    {/* <div>
                                      <p className="mb-0 ct_fw_500 ct_white_nowrap ct_yellow_text">
                                        Report
                                      </p>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* // sort */}
            <div className="col-xl-3 mb-4 mb-xl-0">
              <div className=" ct_side_bar_scrool_left ct_custom_scroll">
                <div className="ct_outline_bg mb-4">
                  <h4 className="ct_fs_20 ct_fw_600 mb-0">Sort By</h4>
                  <ul className="mt-3">
                    <li>
                      <div className="d-flex align-items-center gap-1">
                        <div className="form-check ct_custom_check2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            onClick={() => setIsLatest(true)}
                            checked={isLatest}
                          />
                        </div>
                        <p className="mb-0" style={{ marginTop: "-5px" }}>
                          Latest
                        </p>
                      </div>
                    </li>
                    <li className="mt-2">
                      <div className="d-flex align-items-center gap-1">
                        <div className="form-check ct_custom_check2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={() => setIsLatest(false)}
                            id="flexCheckDefault"
                            checked={!isLatest}
                          />
                        </div>
                        <p className="mb-0" style={{ marginTop: "-5px" }}>
                          Top
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="ct_outline_bg">
                  <h4 className="ct_fs_20 ct_fw_600 mb-0">Topic</h4>
                  <ul className="mt-3">
                    <li>
                      <div className="d-flex align-items-center gap-1">
                        <div className="form-check ct_custom_check2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={filterBytopic?.length == postTopic?.length}
                            onClick={() => {
                              filterBytopic?.length == postTopic?.length ? setFilterByTopic([]) :
                                localData = postTopic?.map((item) => {
                                  return item?.attributes?.name
                                })
                              setFilterByTopic(localData)
                            }}
                          />
                        </div>
                        <p className="mb-0" style={{ marginTop: "-5px" }}>
                          All
                        </p>
                      </div>
                    </li>
                    {postTopic?.map((item) => (
                      <li>
                        <div className="d-flex align-items-center gap-1 mt-2">
                          <div className="form-check ct_custom_check2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={filterBytopic?.includes(item?.attributes?.name) ? true : false}
                              onClick={() =>
                                setFilterByTopic((prev) =>
                                  prev.includes(item?.attributes?.name)
                                    ? prev.filter((name) => name != item?.attributes?.name)
                                    : [...prev, item?.attributes?.name]
                                )
                              }
                            />
                          </div>
                          <p className="mb-0" style={{ marginTop: "-5px" }}>
                            {item?.attributes?.name ?? ""}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      {isCreatePoll && (
        <CreatePollModal
          messageApi={messageApi}
          onClose={() => {
            setIsCreatePoll(false)
            dispatch(getPollTypeData({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
          }}
        />
      )}
      {showShareModal && shareCode?.id &&
        <SharePostModal
          messageApi={messageApi}
          shareCode={shareCode}
          onClose={() => setShowShareModal(false)}
        />
      }
      {isEditPost && postDetails &&
        <EditPostModal
          messageApi={messageApi}
          postDetails={postDetails}
          onClose={() => setIsEditPost(false)}
          handleClose={() => {
            setIsEditPost(false);
            dispatch(getAllPost({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
          }}
        />
      }
      {/* {showShareModal2 &&
        <ReferCode
          messageApi={messageApi}
          onClose={() => setShowShareModal2(false)}
        />
      } */}
    </div>
  );
};

export default Home;