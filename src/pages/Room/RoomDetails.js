import React from 'react';
import Header from '../../components/Header';

const RoomDetails = ({ messageApi }) => {
    return (
      <div>
        <Header messageApi={messageApi} />
        <div className="container mt-5">
          <h4 className="ct_fs_24 ct_fw_600 mb-4">Room Details</h4>
          <div className="row">
            <div className="col-12">
              <div class="ct_white_bg mb-4">
                <div>
                  <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                    <h4 class="ct_fs_18 ct_fw_600 mb-0">Business & Startup</h4>
                    <a
                      href="javascript:void(0);"
                      className="text-dark ct_share_icon"
                    >
                      <i class="fa-solid fa-share-nodes"></i>
                    </a>
                  </div>
                  <div class="ct_cursor">
                    <a
                      href="javascript:void(0)"
                      class="mb-0 ct_fs_14 ct_text_underline text-dark ct_text_op_6"
                    >
                      About this topic
                    </a>
                  </div>
                  <div class="  mt-3 d-flex align-items-start gap-3 justify-content-between ct_cursor">
                    <div class="d-flex align-items-center gap-3 flex-wrap">
                      <p class="mb-0">
                        <i class="fa-regular fa-clock me-2"></i>Wed,24 Sep
                        13:39AM
                      </p>

                      <p class="mb-0 ct_text_op_6">5 Seats remaining</p>
                    </div>
                  </div>
                </div>
                <div class="ct_border_top_1 pt-3 mt-3 ct_cursor">
                  <div class="d-flex align-items-center gap-3 flex-wrap">
                    <button className="ct_room_btn_outline active">
                      <i class="fa-solid fa-star"></i>Premium
                    </button>
                    <button className="ct_room_btn_outline">
                      <i class="fa-solid fa-earth-americas"></i>Global
                    </button>
                    <button className="ct_room_btn_outline">
                      <i class="fa-solid fa-users"></i>Seats: 5{" "}
                      <span className="ct_text_op_6">/5</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 ">
                <div className="d-flex align-items-center gap-3 justify-content-between mb-3 ct_flex_col_575">
                  <ul
                    class="nav nav-pills mb-0 ct_custom_tabs mt-0"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="pills-Participants-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Participants"
                        type="button"
                        role="tab"
                        aria-controls="pills-Participants"
                        aria-selected="true"
                      >
                        Participants
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="pills-Resources-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Resources"
                        type="button"
                        role="tab"
                        aria-controls="pills-Resources"
                        aria-selected="false"
                        tabindex="-1"
                      >
                        Resources
                      </button>
                    </li>
                  </ul>
                  <button className="ct_yellow_btn py-2 px-4 ct_w_100_575">
                    Register
                  </button>
                </div>

                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade active show"
                    id="pills-Participants"
                    role="tabpanel"
                    aria-labelledby="pills-Participants-tab"
                  >
                    <div className="ct_white_bg p-3">
                      <div className="d-flex align-items-center gap-3 mb-2 justify-content-between">
                        <p className="mb-0">
                          <i class="fa-solid fa-heart ct_yellow_text"></i>{" "}
                          <span className="ct_text_op_6">0 M (25-29 yrs)</span>
                        </p>
                        <button className="ct_yellow_btn py-1 px-3">
                          Host
                        </button>
                      </div>
                      <p className="mb-0 ct_para_scroll">
                        Dr pepper is the kids and I have to do it for the kids
                        and I have to do it for the kids and I have to do it for
                        the kids and I have to do it for the kids and I have to
                        do it for the kids and I
                      </p>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-Resources"
                    role="tabpanel"
                    aria-labelledby="pills-Resources-tab"
                  >
                    <div className="ct_white_bg p-3">
                      <div className="d-flex align-items-center gap-3 mb-2 justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div class="ct_upload_user_name">
                            <img
                              alt=""
                              class="ct_img_40 ct_flex_shrink_0"
                              src="assets/img/user.png"
                            />
                            <p class="mb-0 ct_fw_600">Sam</p>
                          </div>
                          <p className="mb-0">
                            <i class="fa-solid fa-heart ct_yellow_text"></i>{" "}
                            <span className="ct_text_op_6">
                              0 M (25-29 yrs)
                            </span>
                          </p>
                        </div>
                        <a
                          href="javascript:void(0)"
                          className="text-dark ct_fw_600 ct_text_op_6"
                        >
                          Report
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-between gap-3 mt-3">
                        <p className="mb-0 ct_text_op_6">
                          https://ylanes.com:9000/create-room
                        </p>
                        <p className="mb-0">
                          <span className="ct_fw_500"> 0</span>{" "}
                          <i class="fa-regular fa-thumbs-up"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default RoomDetails;