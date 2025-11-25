import React, { useState } from 'react';
import Header from '../../components/Header';
import { useLocation, useNavigate } from 'react-router';
import { pipGetAccessToken, pipViewDate2 } from '../../auth/Pip';
import AboutTopicDetails from '../../components/Modals/AboutTopicDetails';

const RoomDetails = ({ messageApi }) => {
  const { state } = useLocation();
  const userData = pipGetAccessToken("user_data");

  const [isShow, setIsShow] = useState(false);
  const [tabManage, setTabManage] = useState('1');

  const navigate = useNavigate();

  return (
    <div>
      <Header messageApi={messageApi} />
      <div className="container mt-5">
        <div className='d-flex align-items-center gap-2 mb-4'>
          <a className='ct_cursor text-dark' onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left "></i>
          </a>
          <h4 className="ct_fs_24 ct_fw_600 mb-0">Room Details</h4>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="ct_white_bg mb-4">
              <div>
                <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                  <h4 className="ct_fs_18 ct_fw_600 mb-0">{state?.data?.attributes?.topic_name ?? ""}</h4>
                  <a className="text-dark ct_share_icon">
                    <i className="fa-solid fa-share-nodes"></i>
                  </a>
                </div>
                <div className="ct_cursor">
                  <a className="mb-0 ct_fs_14 ct_text_underline text-dark ct_text_op_6" onClick={() => setIsShow(true)}>
                    About this topic
                  </a>
                </div>
                <div className="  mt-3 d-flex align-items-start gap-3 justify-content-between ct_cursor">
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <p className="mb-0">
                      <i className="fa-regular fa-clock me-2"></i>{state?.data?.attributes?.start_time ? pipViewDate2(state?.data?.attributes?.start_time) : ""}
                    </p>
                    <p className="mb-0 ct_text_op_6">{state?.data?.attributes?.remaining_seats ?? 0} Seats remaining</p>
                  </div>
                </div>
              </div>
              <div className="ct_border_top_1 pt-3 mt-3 ct_cursor">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <button className="ct_room_btn_outline active">
                    <i className="fa-solid fa-star"></i>{state?.data?.attributes?.room_type_name ?? ""}
                  </button>
                  <button className="ct_room_btn_outline">
                    <i className="fa-solid fa-earth-americas"></i>Global
                  </button>
                  <button className="ct_room_btn_outline">
                    <i className="fa-solid fa-users"></i>Seats: {state?.data?.attributes?.registered_room_count ?? 0}{" "}
                    <span className="ct_text_op_6">/{state?.data?.attributes?.max_participants ?? 0}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 ">
              <div className="d-flex align-items-center gap-3 justify-content-between mb-3 ct_flex_col_575">
                <ul
                  className="nav nav-pills mb-0 ct_custom_tabs mt-0"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${tabManage == '1' ? 'active' : ''}`}
                      type="button"
                      role="tab"
                      onClick={() => setTabManage('1')}
                    >
                      Participants
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${tabManage == '2' ? 'active' : ''}`}
                      type="button"
                      role="tab"
                      tabindex="-1"
                      onClick={() => setTabManage('2')}
                    >
                      Resources
                    </button>
                  </li>
                </ul>
                {/* <button className="ct_yellow_btn py-2 px-4 ct_w_100_575">
                  Register
                </button> */}
              </div>
              <div className="tab-content">
                <div className={`tab-pane fade ${tabManage == "1" ? "active show" : ""}`} role="tabpanel">
                  {state?.data?.attributes?.host?.data?.attributes?.full_name &&
                    <div className="ct_white_bg p-3 mb-3">
                      <div className="d-flex align-items-center gap-3 mb-2 justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div className="ct_upload_user_name">
                            <img
                              alt=""
                              className="ct_img_40 ct_flex_shrink_0"
                              src={state?.data?.attributes?.host?.data?.attributes?.profile_image || "assets/img/dummy_user_img.png"}
                            />
                            <p className="mb-0 ct_fw_600">{state?.data?.attributes?.host?.data?.attributes?.full_name ?? ""}</p>
                          </div>
                          <p className="mb-0">
                            <i className="fa-solid fa-heart ct_yellow_text"></i>{" "}
                            <span className="ct_text_op_6">{state?.data?.attributes?.host?.data?.attributes?.hearts ?? 0} M ({state?.data?.attributes?.host?.data?.attributes?.age ?? 0} yrs)</span>
                          </p>
                        </div>
                        <button className="ct_yellow_btn py-1 px-3">
                          Host
                        </button>
                      </div>
                      <p className="mb-0 ct_para_scroll">
                        {state?.data?.attributes?.your_take ?? ""}
                      </p>
                    </div>
                  }
                  {state?.data?.attributes?.participants?.data?.length != 0 &&
                    state?.data?.attributes?.participants?.data?.map((item) => (
                      <div className="ct_white_bg p-3 mb-3">
                        <div className="d-flex align-items-center gap-3 mb-2 justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <div className="ct_upload_user_name">
                              <img
                                alt=""
                                className="ct_img_40 ct_flex_shrink_0"
                                src={item?.attributes?.participant?.data?.attributes?.profile_image || "assets/img/dummy_user_img.png"}
                              />
                              <p className="mb-0 ct_fw_600">{item?.attributes?.participant?.data?.attributes?.full_name ?? ""}</p>
                            </div>
                            <p className="mb-0">
                              <i className="fa-solid fa-heart ct_yellow_text"></i>{" "}
                              <span className="ct_text_op_6">{item?.attributes?.participant?.data?.attributes?.hearts ?? 0} M ({item?.attributes?.participant?.data?.attributes?.age ?? 0} yrs)</span>
                            </p>
                          </div>
                          <button className="ct_yellow_btn py-1 px-3">
                            Guest
                          </button>
                        </div>
                        <p className="mb-0 ct_para_scroll">
                          {item?.attributes?.your_take ?? ""}
                        </p>
                      </div>
                    ))}
                </div>
                <div className={`tab-pane fade ${tabManage == "2" ? "active show" : ""}`} role="tabpanel">
                  {state?.data?.attributes?.room_resources?.length != 0 &&
                    state?.data?.attributes?.room_resources?.map((items) => (
                      <div className="ct_white_bg p-3 mb-2">
                        <div className="d-flex align-items-center gap-3 mb-2 justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <div className="ct_upload_user_name">
                              <img
                                alt=""
                                className="ct_img_40 ct_flex_shrink_0"
                                src={state?.data?.attributes?.host?.data?.attributes?.profile_image || "assets/img/dummy_user_img.png"}
                              />
                              <p className="mb-0 ct_fw_600">{state?.data?.attributes?.host?.data?.attributes?.full_name ?? ""}</p>
                            </div>
                            <p className="mb-0">
                              <i className="fa-solid fa-heart ct_yellow_text"></i>{" "}
                              <span className="ct_text_op_6">
                                0 M (25-29 yrs)
                              </span>
                            </p>
                          </div>
                          <a
                            className="text-dark ct_fw_600 ct_text_op_6"
                          >
                            Report
                          </a>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 mt-3">
                          <p className="mb-0 ct_text_op_6">
                            {items ?? ""}
                          </p>
                          <p className="mb-0">
                            <span className="ct_fw_500"> 0</span>{" "}
                            <i className="fa-regular fa-thumbs-up"></i>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShow &&
        <AboutTopicDetails
          onClose={() => setIsShow(false)}
          data={state?.data?.attributes}
        />
      }
    </div>
  );
};

export default RoomDetails;