import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import React, { useEffect, useState } from 'react';
import { pipGetAccessToken } from '../../auth/Pip';
import { CreatePollSchema } from '../../auth/Schema';
import { pageRoutes } from '../../routes/PageRoutes';
import ErrorMessage from '../../layout/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { blockUserData, deleteUserPoll, deleteUserPost, getPostTopics, likeUserPost } from '../../redux/actions/authActions';
import { answerPollData, commentUserPoll, createPollData, disconnectUserConnection, getPollCommentData, getPollCommentDatass, getPollTypeData, getPollTypeDatass, sendInvitationToUser } from '../../redux/actions/createRoom';
import CommentTime from '../../components/CommentTime';
import CalculatePollEndTime from '../../components/CalculatePollEndTime';


const Polls = ({ messageApi }) => {
  const { isLoading, postTopic, AllPollsData } = useSelector((state) => state.authReducer);
  const { pollComments } = useSelector((state) => state.createRoomReducer);
  const { isCreateLoading } = useSelector((state) => state.createRoomReducer);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [isShowForm, setIsShowForm] = useState(false);

  const [options, setOptions] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  const [addComment, setAddComment] = useState("");
  const [disable, setDisable] = useState(false);

  const [isEnd, setIsEnd] = useState(false);
  const [time, setTime] = useState('Poll ends in ');

  const [selectedPollId, setSelectedPollId] = useState();
  const [filterBytopic, setFilterByTopic] = useState([]);

  const [isLatest, setIsLatest] = useState(true);
  const [isConnectionComments, setIsConnectionsComments] = useState(false);

  var localData = [];

  const [hours, setHours] = useState(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]);
  const [minutes, setMinutes] = useState(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]);

  const initialValues = {
    question: "",
    option1: "",
    option2: "",
    topic: "",
    durationHours: "00",
    durationMinuts: "01",
  };

  const getDisplayUsers = (AllPollsData, filterByTopic) => {
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
  const displayUser = getDisplayUsers(AllPollsData, filterBytopic);

  useEffect(() => {
    dispatch(getPollTypeData({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
    dispatch(getPostTopics({ messageApi }));
    const data = pipGetAccessToken("user_data");
    setUserData(data);
  }, []);

  useEffect(() => {
    dispatch(getPollTypeData({ messageApi, typeDropDown: isLatest ? "Lastest" : "Top", connectionStatus: isConnectionComments }));
  }, [isLatest, isConnectionComments])

  const handleLikeUserPoll = (id, isLike) => {
    var raw = {
      data: {
        attributes: {
          likeable_id: id,
          likeable_type: "BxBlockTargetedfeed::Poll",
          liked: !isLike,
        },
      },
    };
    const callback = (response) => {
      dispatch(getPollTypeDatass({ messageApi }));
    };
    dispatch(likeUserPost({ payload: raw, callback, messageApi }));
  };

  const handleGetCommentData = (id) => {
    setSelectedPollId(id);
    dispatch(getPollCommentData({ payload: id, messageApi }));
  };

  const handleCreatePoll = async (values, { setSubmitting }) => {
    setSubmitting(false);
    const callback = (response) => {
      if (response?.data?.status == 200 || response?.data?.status == 201) {
        messageApi.success("Poll Created SucessFully");
      } else {
        messageApi.error(response?.data?.errors?.message);
      }
      setOptions([]);
      setCheckBox(false);
      setIsShowForm(false);
      dispatch(getPollTypeData({ messageApi }));
    };
    let data12 = [
      {
        id: 1,
        value: values.option1
      },
      {
        id: 2,
        value: values.option2
      }
    ];
    const mergedOptions = [...options, ...data12];
    const listData = mergedOptions
      ?.filter((data) => !!data.value)
      .map((data) => ({
        body: data.value,
      }));
    let now = new Date();
    const convertedHour = parseInt(values.durationHours ?? 0, 10);
    const convertedMinute = parseInt(values.durationMinuts ?? 0, 10);
    const newTimestamp = new Date().getTime() + (convertedHour * 60 + convertedMinute) * 60 * 1000;
    const data = {
      "catalogue_tag_ids[]": values?.topic,
      catalogue_tag_id: values?.topic,
      body: values?.question,
      options_attributes: listData,
      multiple_choice: checkBox,
      hours: values.durationHours,
      minutes: values.durationMinuts,
      start_date_time: now,
      end_date_time: new Date(newTimestamp),
      poll: {
        "catalogue_tag_ids[]":
          values?.topic,
        catalogue_tag_id:
          values?.topic,
        body: values?.question ?? "",
        options_attributes: listData,
        multiple_choice: checkBox,
        hours: values.durationHours,
        minutes: values.durationMinuts,
        start_date_time: now,
        end_date_time: new Date(newTimestamp),
      }
    };
    dispatch(createPollData({ payload: data, messageApi, callback }))
  };

  const handleRemoveOption = (id) => {
    setOptions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCommentUserPost = async (value) => {
    const callback = (response) => {
      setAddComment('');
      if (response?.data?.attributes) {
        messageApi?.success('Comment added successFully');
      } else {
        messageApi.error("Enable to create comment please try again!");
      };
      dispatch(getPollTypeDatass({ messageApi }));
      setSelectedPollId(value);
      setTimeout(() => {
        dispatch(getPollCommentDatass({ payload: value, messageApi }));
      }, 100);
    };
    const regex = /^(?!\s*$).+$/;
    if (regex.test(addComment)) {
      const formData = new FormData();
      formData.append("body", addComment.trim());
      dispatch(commentUserPoll({ payload: formData, params: `${value}/comments`, callback, messageApi }));
    } else {
      messageApi.error("Invalid comment: cannot be empty or contain spaces");
    };
  };

  const checkEnable = (end_date_time) => {
    const endTime = new Date(end_date_time)
    const now = new Date();
    const diffMs = endTime - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (hours <= 0 && minutes <= 0) return false;
    return true;
  };

  const timeRemaining = (end_date_time) => {
    const endTime = new Date(end_date_time)
    const now = new Date();
    const diffMs = endTime - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const label = 'Poll ends in '
    if (hours <= 0 && minutes <= 0) {
      setIsEnd(true)
      return 'Poll Ended';
    } else if (hours === 0) {
      return `${label} ${minutes} minutes`;
    } else if (minutes === 0) {
      return `${label} ${hours} hours`;
    } else {
      return `${label} ${hours} hours ${minutes} minutes`;
    };
  };

  const handleSubmitPoll = async (selectedAnswer, val) => {
    const isfailed = false;
    const isEnable = checkEnable(val?.attributes?.end_date_time);
    if (isEnable) {
      let body = selectedAnswer?.my_choice == false ? {
        my_choice: {
          id: selectedAnswer?.id,
          body: selectedAnswer?.body,
          my_choice: selectedAnswer?.my_choice,
          vote_count: selectedAnswer?.vote_count
        },
        option_id: selectedAnswer?.id
      }
        : {
          option_id: selectedAnswer?.id
        };
      const callback = (response) => {
        dispatch(getPollTypeDatass({ messageApi }));
      };
      if (val?.attributes?.multiple_choice) {
        dispatch(answerPollData({ payload: body, param: val?.id, messageApi, callback }));
      } else {
        val?.attributes?.options_attributes?.map((item) => console.log("item"));
        dispatch(answerPollData({ payload: body, param: val?.id, messageApi, callback }));
      };
    } else {
      messageApi.error("This poll is closed. You can’t submit your answer anymore.");
    };
    const data = timeRemaining(val?.attributes?.end_date_time);
    setTime(data);
  };

  const handleDeleteUserPost = (val, id) => {
    if (val == "current_user") {
      const callback = (response) => {
        if (response?.meta?.message) {
          messageApi.success(response?.meta?.message);
        } else {
          messageApi.error(response?.meta?.message);
        };
        dispatch(getPollTypeDatass({ messageApi }));
      };
      dispatch(deleteUserPoll({ payload: id?.id, callback, messageApi }));
    } else if (val == "not_connected") {
      const callback = (response) => {
        if (response?.message) {
          messageApi?.success(response?.message);
        } else {
          messageApi?.error(response?.message);
        };
        dispatch(getPollTypeDatass({ messageApi }));
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
        dispatch(getPollTypeDatass({ messageApi }));
      };
      dispatch(disconnectUserConnection({ payload: id?.attributes?.user?.id, callback, messageApi }))
    };
  };

  const handleBlockUser = (value) => {
    const callback = (response) => {
      if (response?.message) {
        messageApi?.success(response?.message);
      } else {
        messageApi?.error(response?.message);
      };
      dispatch(getPollTypeDatass({ messageApi }));
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
      <Header />
      <section className="py-4 pb-4">
        <div className="container">
          <div className='row'>
            <div className='col-xl-9 mb-4 mb-xl-0'>
              <div className="ct_full_poll_page_bg  ct_side_bar_scrool_left ">
                <h4 className="ct_fs_24 ct_fw_600 mb-4">Polls</h4>
                <div className="row pb-4">
                  <div className="col-md-12">
                    <div className="ct_upload_post_box">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={CreatePollSchema}
                        onSubmit={(values, actions) =>
                          handleCreatePoll(values, actions)
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
                              {!isShowForm && (
                                <div className="row">
                                  <div className="col-md-12 mb-0">
                                    <div className="d-flex align-items-center gap-3 justify-content-between">
                                      <>
                                        <input
                                          onClick={() => setIsShowForm(true)}
                                          className="form-control ct_border_radius_10  ct_input border-0"
                                          placeholder="create a poll"
                                          readOnly
                                        />
                                        <button
                                          onClick={() => setIsShowForm(true)}
                                          type="button"
                                          className="ct_yellow_btn ct_text_op_6 ct_white_nowrap"
                                        >
                                          Create Poll
                                        </button>
                                      </>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {isShowForm && (
                                <div className="">
                                  <div className="row">
                                    <div className="form-group mb-3">
                                      <div className="d-flex align-items-center gap-2 justify-content-between mb-2">
                                        <label className="ct_fw_600">
                                          Type Your Question
                                        </label>
                                        <div
                                          className="ct_cursor_pointer ct_fs_20 ct_text_op_6 ms-auto"
                                          onClick={() => setIsShowForm(false)}
                                        >
                                          <i className="fa-solid fa-circle-xmark"></i>
                                        </div>
                                      </div>
                                      <input
                                        type="text"
                                        id="question"
                                        value={values.question}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control ct_input"
                                        placeholder="Enter Your Question"
                                      />
                                      <ErrorMessage
                                        errors={errors}
                                        touched={touched}
                                        fieldName="question"
                                      />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                      <div className="form-group">
                                        <label className="mb-2 ct_fw_600">
                                          Choose 1
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control ct_input"
                                          placeholder="Enter option"
                                          id="option1"
                                          value={values?.option1}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />
                                        <ErrorMessage
                                          errors={errors}
                                          touched={touched}
                                          fieldName="option1"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                      <div className="form-group">
                                        <label className="mb-2 ct_fw_600">
                                          Choose 2
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control ct_input"
                                          placeholder="Enter option"
                                          id="option2"
                                          value={values?.option2}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />
                                        <ErrorMessage
                                          errors={errors}
                                          touched={touched}
                                          fieldName="option2"
                                        />
                                      </div>
                                    </div>
                                    {options?.length != 0 &&
                                      options?.map((item, i) => (
                                        <div className="col-md-6 mb-3">
                                          <div className="form-group">
                                            <label className="mb-2 ct_fw_600">
                                              Choose {i + 3}
                                            </label>
                                            <div className="position-relative">
                                              <input
                                                type="text"
                                                className="form-control ct_input ct_pe_40"
                                                placeholder="Enter option"
                                                value={item?.value}
                                                onChange={(e) =>
                                                  setOptions((prev) =>
                                                    prev.map((opt) =>
                                                      opt.id === item.id
                                                        ? {
                                                          ...opt,
                                                          value: e.target.value,
                                                        }
                                                        : opt
                                                    )
                                                  )
                                                }
                                              />
                                              <i
                                                className="fa-solid fa-square-xmark ct_show_eye ct_del_q"
                                                onClick={() =>
                                                  handleRemoveOption(item?.id)
                                                }
                                              ></i>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    {options?.length != 13 && (
                                      <div className="col-md-12 mb-3">
                                        <div className="text-end">
                                          <a
                                            className="ct_yellow_text ct_fw_600"
                                            onClick={() =>
                                              setOptions((prev) => [
                                                ...prev,
                                                {
                                                  id:
                                                    prev.length > 0
                                                      ? prev[prev.length - 1].id +
                                                      1
                                                      : 3,
                                                  value: "",
                                                },
                                              ])
                                            }
                                          >
                                            + Add Another Option
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                    <div>
                                      <label className="mb-2 ct_fw_600">
                                        Duration
                                      </label>
                                      <div className="row">
                                        <div className="col-md-6 mb-3">
                                          <div className="form-group">
                                            <select
                                              className="form-control ct_input"
                                              value={values.durationHours}
                                              id="durationHours"
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                            >
                                              {hours?.map((item) => (
                                                <option value={item}>
                                                  {item} Hours
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                          <ErrorMessage
                                            errors={errors}
                                            touched={touched}
                                            fieldName="durationHours"
                                          />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                          <div className="form-group">
                                            <select
                                              className="form-control ct_input"
                                              id="durationMinuts"
                                              value={values?.durationMinuts}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                            >
                                              {minutes?.map((item) => (
                                                <option value={item}>
                                                  {item} Minutes
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                          <ErrorMessage
                                            errors={errors}
                                            touched={touched}
                                            fieldName="durationMinuts"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex  align-items-center mt-2">
                                      <div className="form-check ct_custom_check2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={checkBox}
                                          onClick={() => setCheckBox(!checkBox)}
                                        />
                                      </div>
                                      <label>
                                        <span className="ct_text_op_6" es>
                                          Allow multiple reponses
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center gap-3 justify-content-between ct_flex_col_575 ct_border_top_1 pt-3 mt-3 ">
                                    <div className="d-flex align-items-center gap-3 ct_w_100_575">
                                      <select
                                        className="form-control ct_input ct_w_100_575 ct_border_radius_100 h-auto p-2 px-3 ct_w_fit_content"
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
                                    <button
                                      type="button"
                                      onClick={handleSubmit}
                                      className="ct_yellow_btn ct_white_nowrap ct_w_100_575"
                                    >
                                      Create Poll
                                    </button>
                                  </div>
                                  <ErrorMessage
                                    errors={errors}
                                    touched={touched}
                                    fieldName="topic"
                                  />
                                </div>
                              )}
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {displayUser?.length != 0 &&
                    displayUser?.map((item) => (
                      <div className="col-md-12">
                        <div className="ct_uploaded_post_main mb-3">
                          <div className="d-flex align-items-center justify-content-between gap-2">
                            <div className="ct_upload_user_name">
                              <img
                                src={item?.attributes?.user?.profile_image ?
                                  item?.attributes?.user?.profile_image : "assets/img/dummy_user_img.png"
                                }
                                alt=""
                                className="ct_img_40 ct_flex_shrink_0"
                                onClick={() => navigate(pageRoutes.userProfile, { state: { data: item?.attributes?.user?.id } })}
                              />
                              <p className="mb-0 ct_fw_600">
                                {item?.attributes?.user?.name ?? ""}
                              </p>
                              <span className="ct_text_op_6 ct_fs_14">
                                {item?.attributes?.created_at}
                              </span>
                            </div>
                            <div className="dropdown ct_post_setting_drop">
                              <i
                                className="fa-solid fa-ellipsis"
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
                                <li className={`${item?.attributes?.user?.connection_status == "current_user" && "d-none"}`} onClick={() => handleBlockUser(item?.attributes)}>
                                  <a className="dropdown-item"><i className="fa-solid fa-ban me-2"></i>Block</a>
                                </li>
                                <li className={`${item?.attributes?.user?.connection_status == "current_user" && "d-none"}`}>
                                  <a className="dropdown-item"><i className="fa-solid fa-flag me-2"></i>Report</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <p className="ct_para_scroll ct_custom_scroll mt-3">
                            {item?.attributes?.body ?? ""}
                          </p>
                          <div className="ct_poll_options">
                            <ul>
                              {item?.attributes?.options_attributes?.map(
                                (items) => (
                                  <li onClick={() => handleSubmitPoll(items, item)} className='progress position-relative'>
                                    <p style={{ width: "100%" }} className={`d-flex ct_cursor align-items-center justify-content-between ct_fill_active_bar gap-2 mb-0 progress-bar ${items?.my_choice && "active"}`} role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                      <span>{items?.body ?? ""}
                                        {items?.my_choice &&
                                          <small className='ct_text_op_6'>(Your vote)</small>
                                        }
                                      </span>
                                    </p>
                                    <div className='ct_show_eye'>
                                      {items?.my_choice &&
                                        <span>{items?.vote_count ?? 0}</span>
                                      }
                                    </div>
                                  </li>
                                ))}
                            </ul>
                            <CalculatePollEndTime
                              end_date_time={item?.attributes?.end_date_time}
                            />
                          </div>
                          <div className="ct_like_comment_div">
                            <ul>
                              <li>
                                <div className="ct_like_btn d-flex align-items-center gap-2">
                                  <i
                                    className={`fa-${item?.attributes?.liked ? 'solid' : 'regular'} fa-thumbs-up ct_cursor`}
                                    onClick={() => handleLikeUserPoll(
                                      item?.attributes?.id,
                                      item?.attributes?.liked
                                    )}>
                                  </i>
                                  <p className="mb-0 ct_fw_500">
                                    {item?.attributes?.like_count ?? 0}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="ct_comment_bnt  d-flex align-items-center gap-2">
                                  <i className="fa-regular fa-message ct_cursor" onClick={() => handleGetCommentData(item?.attributes?.id)}></i>
                                  <p className="mb-0 ct_fw_500 ">
                                    {item?.attributes?.comment_count ?? 0}
                                  </p>
                                </div>
                              </li>
                              <li className="ms-auto ct_text_op_6 ct_fs_14">
                                # {item?.attributes?.topic ?? ""}
                              </li>
                            </ul>
                            {selectedPollId == item?.attributes?.id &&
                              <div className="ct_comment_area_main mt-4  ">
                                <div className="position-relative">
                                  <input
                                    type="text"
                                    className="form-control ct_input ct_custom_input w-100"
                                    value={addComment}
                                    onChange={(e) =>
                                      setAddComment(e.target.value)
                                    }
                                    placeholder="Write comment..."
                                  />
                                  <button
                                    className="ct_send_msg_btn ct_yellow_btn"
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
                                        {pollComments?.langth != 0 &&
                                          pollComments?.map((item) => (
                                            <div className="d-flex gap-3 mb-2">
                                              <img
                                                src={item?.attributes?.user?.profile_image ? item?.attributes?.user?.profile_image : "assets/img/dummy_user_img.png"}
                                                alt=""
                                                className="ct_img_40 ct_bor ct_white_border_1"
                                              />
                                              <div style={{ flex: "1" }}>
                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                  <h5 className="ct_fs_15  ct_fw_600 mb-0">
                                                    {item?.attributes?.user?.name ?? ""}
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
                                                <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-0">
                                                  <span>
                                                    {item?.attributes?.body ?? ""}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        {/* <!-- reply Comment S --> */}
                                        {/* <div className="mt-3 d-none ">
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
                                                                            <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-3"><span>Design Shot is an invitation to ponder cn design as a living entity. capture of embodying and
                                                                                influencing the flow of thoughts and sensations in</span>
                                                                            </p>
                                                                            <div className="mt-2 ">
                                                                                <a href="javascript:void(0)" className="text-dark ct_fw_600 ct_fs_14">Reply</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                      </div>
                                    </div>
                                    {/* <div>
                                      <p
                                        className="mb-0 ct_fw_500 ct_white_nowrap ct_yellow_text"
                                        data-bs-target="#ct_report_modal"
                                        data-bs-toggle="modal"
                                      >
                                        Report
                                      </p>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
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
                            onClick={() => setIsLatest(true)}
                            checked={isLatest}
                            id="flexCheckDefault"
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
    </div >
  );
};

export default Polls;