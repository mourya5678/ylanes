import React from 'react';
import Header from '../../components/Header';
import AgoraRTM from 'agora-rtm-sdk';

const Chat = ({ messageApi }) => {


    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between gap-3  mb-3 ct_flex_col_575">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Message
                                </h4>
                                <ul
                                    className="nav nav-pills mb-3 ct_custom_tabs mt-0"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-public-info-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-public-info"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-public-info"
                                            aria-selected="true"
                                        >
                                            Connections
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-persional_info-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-persional_info"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-persional_info"
                                            aria-selected="false"
                                            tabindex="-1"
                                        >
                                            Discover
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="tab-content ct_chat_main_bg_1"
                                id="pills-tabContent"
                            >
                                <div
                                    className="tab-pane fade active show"
                                    id="pills-public-info"
                                    role="tabpanel"
                                    aria-labelledby="pills-public-info-tab"
                                >
                                    <div className="chat-area">
                                        <div className="chatlist ct_chatroom_chatlist">
                                            <div className="modal-dialog-scrollable ">
                                                <div className="modal-content ">
                                                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                                                        <h4 className="ct_fs_16 mb-0 ct_fw_600 ct_nunito_font">
                                                            Contacts
                                                        </h4>
                                                        <h4 className="ct_fs_16 mb-0 ct_fw_600 ct_nunito_font ct_text_op_05">
                                                            34
                                                        </h4>
                                                    </div>
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control ct_input ct_input_ps_40 ct_input_h_40 ct_border_op_10"
                                                            placeholder="Search"
                                                        />
                                                        <i className="fa-solid fa-search ct_input_icon_left"></i>
                                                    </div>
                                                    <div
                                                        className="modal-body mt-4 ct_custom_scrollbar"
                                                        style={{
                                                            height: "calc(100vh - 383px) !important",
                                                        }}
                                                    >
                                                        <div className="chat-lists">
                                                            <div className="chat-list">
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="d-flex active2"
                                                                >
                                                                    <div className="ct_chat_list_grid">
                                                                        <div className="position-relative">
                                                                            <img
                                                                                className="img-fluid ct_img_40"
                                                                                src="assets/img/user.png"
                                                                                data-bs-target="#full_view_img"
                                                                                data-bs-toggle="modal"
                                                                                alt="user img"
                                                                            />
                                                                            <span className="active"></span>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                                <h3 className="ct_fs_16 ct_fw_600">
                                                                                    Jane Doe
                                                                                </h3>
                                                                                <div className="ct_caht_msg_notify ">
                                                                                    <span className="ms-auto">1</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                                <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                    Hi, i want make enquiries about
                                                                                    yo...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="d-flex"
                                                                >
                                                                    <div className="position-relative">
                                                                        <img
                                                                            className="img-fluid ct_img_40"
                                                                            src="assets/img/user.png"
                                                                            data-bs-target="#full_view_img"
                                                                            data-bs-toggle="modal"
                                                                            alt="user img"
                                                                        />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <h3 className="ct_fs_16 ct_fw_600">
                                                                                Jane Doe
                                                                            </h3>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                Hi, i want make enquiries about yo...
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="d-flex"
                                                                >
                                                                    <div className="position-relative">
                                                                        <img
                                                                            className="img-fluid ct_img_40"
                                                                            src="assets/img/user.png"
                                                                            data-bs-target="#full_view_img"
                                                                            data-bs-toggle="modal"
                                                                            alt="user img"
                                                                        />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <h3 className="ct_fs_16 ct_fw_600">
                                                                                Jane Doe
                                                                            </h3>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                Hi, i want make enquiries about yo...
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="d-flex"
                                                                >
                                                                    <div className="position-relative">
                                                                        <img
                                                                            className="img-fluid ct_img_40"
                                                                            src="assets/img/user.png"
                                                                            data-bs-target="#full_view_img"
                                                                            data-bs-toggle="modal"
                                                                            alt="user img"
                                                                        />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <h3 className="ct_fs_16 ct_fw_600">
                                                                                Jane Doe
                                                                            </h3>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                Hi, i want make enquiries about yo...
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="d-flex"
                                                                >
                                                                    <div className="position-relative">
                                                                        <img
                                                                            className="img-fluid ct_img_40"
                                                                            src="assets/img/user.png"
                                                                            data-bs-target="#full_view_img"
                                                                            data-bs-toggle="modal"
                                                                            alt="user img"
                                                                        />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <h3 className="ct_fs_16 ct_fw_600">
                                                                                Jane Doe
                                                                            </h3>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                Hi, i want make enquiries about yo...
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="d-flex"
                                                                >
                                                                    <div className="position-relative">
                                                                        <img
                                                                            className="img-fluid ct_img_40"
                                                                            src="assets/img/user.png"
                                                                            data-bs-target="#full_view_img"
                                                                            data-bs-toggle="modal"
                                                                            alt="user img"
                                                                        />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <h3 className="ct_fs_16 ct_fw_600">
                                                                                Jane Doe
                                                                            </h3>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                Hi, i want make enquiries about yo...
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="d-flex"
                                                                >
                                                                    <div className="position-relative">
                                                                        <img
                                                                            className="img-fluid ct_img_40"
                                                                            src="assets/img/user.png"
                                                                            data-bs-target="#full_view_img"
                                                                            data-bs-toggle="modal"
                                                                            alt="user img"
                                                                        />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <h3 className="ct_fs_16 ct_fw_600">
                                                                                Jane Doe
                                                                            </h3>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2 justify-content-between">
                                                                            <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                Hi, i want make enquiries about yo...
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chatbox ">
                                                <div className="ct_white_bg ct_border_radius_10 ct_p_20 h-100">
                                                    <div className="modal-dialog-scrollable">
                                                        <div className="modal-content ct_chatroom_modal_content">
                                                            <div className="d-block">
                                                                <div className="msg-head d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                                                    <div className="d-flex align-items-center gap-2 ">
                                                                        <i className="fa-solid fa-chevron-left chat-icon"></i>
                                                                        <div className="ct_grid_50_auto">
                                                                            <img
                                                                                src="assets/img/user.png"
                                                                                alt=""
                                                                                data-bs-target="#full_view_img"
                                                                                data-bs-toggle="modal"
                                                                            />
                                                                            <div>
                                                                                <h4 className="ct_fs_18 ct_fw_600  mb-0">
                                                                                    John Smith
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <a
                                                                            href="javascript:void(0)"
                                                                            className="ct_yellow_btn px-3 py-2 h-auto"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#ct_view_user"
                                                                        >
                                                                            + Add New Chat
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="msg-body ct_custom_scrollbar">
                                                                        <ul>
                                                                            <li>
                                                                                <div>
                                                                                    <div className="sender">
                                                                                        <h5 className="ct_fs_16  mb-2 ">
                                                                                            Hey, I have a question about my
                                                                                            recent order #12345. When can I
                                                                                            expect it to be delivered?
                                                                                        </h5>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="repaly">
                                                                                    <p>
                                                                                        Hi John, your order is currently
                                                                                        in transit and should arrive
                                                                                        within 2-3 business days. You can
                                                                                        track it using the tracking number
                                                                                        sent to your email.
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="sender">
                                                                                    <h5 className="ct_fs_16  mb-2 ">
                                                                                        Hey, I have a question about my
                                                                                        recent order #12345. When can I
                                                                                        expect it to be delivered?
                                                                                    </h5>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="repaly">
                                                                                    <p>
                                                                                        Hi John, your order is currently
                                                                                        in transit and should arrive
                                                                                        within 2-3 business days. You can
                                                                                        track it using the tracking number
                                                                                        sent to your email.
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="sender">
                                                                                    <h5 className="ct_fs_16  mb-2 ">
                                                                                        Hey, I have a question about my
                                                                                        recent order #12345. When can I
                                                                                        expect it to be delivered?
                                                                                    </h5>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="repaly">
                                                                                    <p>
                                                                                        Hi John, your order is currently
                                                                                        in transit and should arrive
                                                                                        within 2-3 business days. You can
                                                                                        track it using the tracking number
                                                                                        sent to your email.
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="sender">
                                                                                    <h5 className="ct_fs_16  mb-2 ">
                                                                                        Hey, I have a question about my
                                                                                        recent order #12345. When can I
                                                                                        expect it to be delivered?
                                                                                    </h5>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="repaly">
                                                                                    <p>
                                                                                        Hi John, your order is currently
                                                                                        in transit and should arrive
                                                                                        within 2-3 business days. You can
                                                                                        track it using the tracking number
                                                                                        sent to your email.
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="sender">
                                                                                    <h5 className="ct_fs_16 ct_fw_600 mb-2  ">
                                                                                        Hey, I have a question about my
                                                                                        recent order #12345. When can I
                                                                                        expect it to be delivered?
                                                                                    </h5>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="repaly">
                                                                                    <p>
                                                                                        Hi John, your order is currently
                                                                                        in transit and should arrive
                                                                                        within 2-3 business days. You can
                                                                                        track it using the tracking number
                                                                                        sent to your email.
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="sender">
                                                                                    <h5 className="ct_fs_16 ct_fw_600 mb-2  ">
                                                                                        Hey, I have a question about my
                                                                                        recent order #12345. When can I
                                                                                        expect it to be delivered?
                                                                                    </h5>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="repaly">
                                                                                    <p>
                                                                                        Hi John, your order is currently
                                                                                        in transit and should arrive
                                                                                        within 2-3 business days. You can
                                                                                        track it using the tracking number
                                                                                        sent to your email.
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="send-box ">
                                                                    <form
                                                                        action=""
                                                                        className="position-relative"
                                                                    >
                                                                        <label
                                                                            for="upload_chat_img_2"
                                                                            className="ct_upload_paper_click_img"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                className="d-none"
                                                                                id="upload_chat_img_2"
                                                                            />
                                                                            <div>
                                                                                <i className="fa-solid fa-paperclip"></i>
                                                                            </div>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Your message"
                                                                        />

                                                                        <div className="ct_right_side_send_chat_btns">
                                                                            Send{" "}
                                                                            <i className="fa-solid fa-paper-plane"></i>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>

                                                            <div className="ct_empty_chat_box_content d-none">
                                                                <svg
                                                                    width="123"
                                                                    height="123"
                                                                    viewBox="0 0 123 123"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <rect
                                                                        x="0.956267"
                                                                        y="1.3696"
                                                                        width="120.87"
                                                                        height="120.87"
                                                                        rx="60.4348"
                                                                        fill="#F4F5FA"
                                                                    />
                                                                    <rect
                                                                        x="0.956267"
                                                                        y="1.3696"
                                                                        width="120.87"
                                                                        height="120.87"
                                                                        rx="60.4348"
                                                                        stroke="#E1E2E9"
                                                                        stroke-width="0.869565"
                                                                    />
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M76.764 77.1737C70.1202 83.8182 60.2823 85.2538 52.2315 81.5305C51.043 81.052 50.0686 80.6653 49.1423 80.6653C46.5621 80.6806 43.3505 83.1824 41.6814 81.5152C40.0122 79.8459 42.516 76.6318 42.516 74.036C42.516 73.1096 42.1446 72.1526 41.6661 70.9618C37.9411 62.9123 39.3787 53.0711 46.0225 46.4288C54.5036 37.9445 68.2828 37.9445 76.764 46.4266C85.2605 54.924 85.2452 68.6916 76.764 77.1737Z"
                                                                        fill="#BEC0CA"
                                                                        stroke="#8B8D97"
                                                                        stroke-width="1.30435"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M69.9541 62.7022H69.9737"
                                                                        stroke="#8B8D97"
                                                                        stroke-width="1.73913"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M61.2412 62.7022H61.2608"
                                                                        stroke="#8B8D97"
                                                                        stroke-width="1.73913"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M52.5244 62.7022H52.544"
                                                                        stroke="#8B8D97"
                                                                        stroke-width="1.73913"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                </svg>
                                                                <div>
                                                                    <h4 className="ct_fs_20 ct_fw_600">
                                                                        Messages
                                                                    </h4>
                                                                    <p>Click on a contact to view messages.</p>
                                                                    <div className="">
                                                                        <a
                                                                            href="#"
                                                                            className="ct_purple_btn d-flex align-items-center gap-2"
                                                                        >
                                                                            <svg
                                                                                width="20"
                                                                                height="20"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    fill-rule="evenodd"
                                                                                    clip-rule="evenodd"
                                                                                    d="M15.8447 16.039C13.1871 18.6968 9.25198 19.271 6.03167 17.7817C5.55627 17.5903 5.16651 17.4356 4.79598 17.4356C3.7639 17.4417 2.47927 18.4425 1.81162 17.7756C1.14396 17.1079 2.14545 15.8222 2.14545 14.7839C2.14545 14.4133 1.99688 14.0305 1.8055 13.5542C0.315505 10.3344 0.890529 6.39795 3.54805 3.74101C6.94052 0.347298 12.4522 0.347298 15.8447 3.74014C19.2432 7.1391 19.2371 12.6461 15.8447 16.039Z"
                                                                                    stroke="white"
                                                                                    stroke-width="1.30435"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                />
                                                                                <path
                                                                                    d="M13.1203 10.2505H13.1281"
                                                                                    stroke="white"
                                                                                    stroke-width="1.73913"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                />
                                                                                <path
                                                                                    d="M9.63595 10.2505H9.64377"
                                                                                    stroke="white"
                                                                                    stroke-width="1.73913"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                />
                                                                                <path
                                                                                    d="M6.14962 10.2505H6.15745"
                                                                                    stroke="white"
                                                                                    stroke-width="1.73913"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                />
                                                                            </svg>
                                                                            <span> New Message</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-persional_info"
                                        role="tabpanel"
                                        aria-labelledby="pills-persional_info-tab"
                                    >
                                        <div className="chat-list">
                                            <a
                                                href="javascript:void(0)"
                                                className="d-flex active2 align-items-center"
                                            >
                                                <div className="position-relative">
                                                    <img
                                                        className="img-fluid ct_img_40"
                                                        src="assets/img/user.png"
                                                        data-bs-target="#full_view_img"
                                                        data-bs-toggle="modal"
                                                        alt="user img"
                                                    />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <div className="d-flex align-items-center gap-2 justify-content-between">
                                                        <h3 className="ct_fs_16 ct_fw_600">Jane Doe</h3>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2 justify-content-between"></div>
                                                </div>
                                                <div className="">
                                                    <button className="ct_yellow_btn ct_white_nowrap">
                                                        + Invite
                                                    </button>
                                                </div>
                                            </a>
                                            <a
                                                href="javascript:void(0)"
                                                className="d-flex align-items-center"
                                            >
                                                <div className="position-relative">
                                                    <img
                                                        className="img-fluid ct_img_40"
                                                        src="assets/img/user.png"
                                                        data-bs-target="#full_view_img"
                                                        data-bs-toggle="modal"
                                                        alt="user img"
                                                    />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <div className="d-flex align-items-center gap-2 justify-content-between">
                                                        <h3 className="ct_fs_16 ct_fw_600">Jane Doe</h3>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2 justify-content-between"></div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Chat;