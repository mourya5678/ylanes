import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import { initChat, loginChat, logoutChat, sendMessage, setMessageListener } from '../../components/AgoraChat';
import { useDispatch, useSelector } from 'react-redux';
import { descoverAllConnectionsData, getAllChatAfterReciveUsersData, getAllChatUsersData, getAllPreviousMessages, getAllUserPreviousMessages, getMyConnectionsData, getUserAgoraToken, sendInvitationToUser, sendMessageToUser } from '../../redux/actions/createRoom';
import Loader from '../../components/Loader';
import { IMAGE_URL } from '../../routes/BackendRoutes';
import { pipGetAccessToken } from '../../auth/Pip';
import AddNewUserToChat from '../../components/Modals/AddNewUserToChat';

const Chat = ({ messageApi }) => {
    const { isCreateLoading, discoverAllConnections, chatList, allConnections, previousMessages } = useSelector((state) => state?.createRoomReducer);

    const dispatch = useDispatch();
    const scrollRef = useRef(null);

    const [isAddUserModalShow, setIsAddUserModalShow] = useState(false)
    const [userChatMessages, setUserChatMessages] = useState(previousMessages ?? []);

    const [selectUserkey, setSelectUserKey] = useState();
    const [selectUserData, setSelectUserData] = useState({});

    const selectUserRef = useRef(selectUserData);

    const [textMessage, setTextMessage] = useState('');
    const [manageStep, setManageStep] = useState('1');

    const [filterUser, setFilterUser] = useState('');
    const userData = pipGetAccessToken("user_data");

    const filterUserList = chatList?.filter((item) => {
        return item?.name
            ?.toLowerCase()
            ?.includes(filterUser?.toLowerCase())
    });

    const displayUser = allConnections?.filter(
        (connection) =>
            !chatList?.some(
                (chat) => chat?.user?.account_id != connection?.attributes?.account_id
            )
    );

    useEffect(() => {
        selectUserRef.current = selectUserData;
    }, [selectUserData]);


    useEffect(() => {
        const data = {
            phone_number: userData?.attributes?.phone_number,
            unique_auth_id: userData?.attributes?.unique_auth_id,
        };
        dispatch(descoverAllConnectionsData({ messageApi }));
        dispatch(getAllChatUsersData({ payload: data, messageApi }));
        dispatch(getMyConnectionsData({ messageApi }));
    }, []);

    useEffect(() => {
        setUserChatMessages(previousMessages);
    }, [previousMessages]);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        };
    }, [userChatMessages]);

    useEffect(() => {
        initChat();
        setMessageListener((msg) => {
            handleReciveUserMessage(msg);
        });
        const callback = (response) => {
            loginChat(userData?.attributes?.unique_auth_id, response?.token);
        };
        const data = {
            phone_number: userData?.attributes?.phone_number,
            unique_auth_id: userData?.attributes?.unique_auth_id,
        }
        dispatch(getUserAgoraToken({ payload: data, messageApi, callback }));
        return () => {
            logoutChat();
        };
    }, []);

    const onHandleInviteUser = (val) => {
        const callback = (response) => {
            if (response?.message) {
                messageApi?.success(response?.message);
            };
            dispatch(descoverAllConnectionsData({ messageApi }));
        };
        const raw = {
            data: {
                account_id: val?.id
            }
        };
        if (val?.attributes?.connection_status != "pending") {
            dispatch(sendInvitationToUser({ payload: raw, callback, messageApi }));
        } else {
            messageApi.error("Already a friend or previous request is pending to take action")
        }
    };

    const handleGetOldMessages = (val, value) => {
        const callback = (response) => {
            setSelectUserKey(val);
            setSelectUserData(value)
        };
        const data = {
            phone_number: userData?.attributes?.phone_number,
            unique_auth_id: userData?.attributes?.unique_auth_id,
        };
        dispatch(getAllPreviousMessages({ payload: data, params: val, callback, messageApi }));
    };

    const handleGetReciveMessages = (val, value) => {
        const data = {
            phone_number: userData?.attributes?.phone_number,
            unique_auth_id: userData?.attributes?.unique_auth_id,
        };
        dispatch(getAllUserPreviousMessages({ payload: data, params: val, messageApi }));
    };

    const handleSendMessage = async (id, val, message) => {
        const body = {
            to: id,
            message: message,
            phone_number: userData?.attributes?.phone_number,
            unique_auth_id: userData?.attributes?.unique_auth_id,
        };
        const messageReturn = await sendMessage(val, message);
        const data12 = {
            id: messageReturn?.message_id,
            timestamp: messageReturn?.message?.time,
            text: messageReturn?.message?.msg,
            to_uid: messageReturn?.message?.to,
            from_uid: messageReturn?.message?.from,
            extra_metadata: messageReturn?.message_id?.ext
        };
        setUserChatMessages((pre) => [...pre, data12]);
        setTextMessage('');
        const callback = (response) => {
            const data = {
                phone_number: userData?.attributes?.phone_number,
                unique_auth_id: userData?.attributes?.unique_auth_id,
            };
            dispatch(getAllChatAfterReciveUsersData({ payload: data, messageApi }));
        };
        dispatch(sendMessageToUser({ payload: body, messageApi, callback }));
    };

    const handleReciveUserMessage = async (msg) => {
        const data = {
            phone_number: userData?.attributes?.phone_number,
            unique_auth_id: userData?.attributes?.unique_auth_id,
        };
        dispatch(getAllChatAfterReciveUsersData({ payload: data, messageApi }));
        handleGetReciveMessages(selectUserRef?.current?.conversation_key, selectUserRef?.current);
    };

    console.log({ userChatMessages });

    if (isCreateLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between gap-3  mb-3 ct_flex_col_575">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">Message</h4>
                                <ul className="nav nav-pills mb-0 ct_custom_tabs mt-0" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${manageStep == "1" && "active"}`} onClick={() => setManageStep('1')}
                                            type="button">Connections</button>
                                    </li>
                                    <li className="nav-item" role="presentation" onClick={() => setManageStep('2')}>
                                        <button className={`nav-link ${manageStep == "2" && "active"}`} id="pills-persional_info-tab" type="button">Discover</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content ct_white_bg p-0" style={{ overflow: "hidden" }} id="pills-tabContent">
                                {manageStep == "1" &&
                                    <div className={`tab-pane fade ${manageStep == "1" && "active show"}`} id="pills-public-info" role="tabpanel"
                                        aria-labelledby="pills-public-info-tab">
                                        <div className="chat-area">
                                            <div className="chatlist ct_chatroom_chatlist pt-3">
                                                <div className="modal-dialog-scrollable ">
                                                    <div className="modal-content ">
                                                        <div
                                                            className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                                                            <h4 className="ct_fs_16 mb-0 ct_fw_600 ct_nunito_font">Contacts ({chatList?.length})</h4>
                                                            {/* <h4 className="ct_fs_16 mb-0 ct_fw_600 ct_nunito_font ct_text_op_05">{chatList?.length}</h4> */}
                                                        </div>
                                                        <div className="position-relative">
                                                            <input
                                                                type="text"
                                                                value={filterUser}
                                                                onChange={(e) => setFilterUser(e.target.value)}
                                                                className="form-control ct_input ct_input_ps_40 ct_input_h_40 ct_border_op_10"
                                                                placeholder="Search"
                                                            />
                                                            <i className="fa-solid fa-search ct_input_icon_left"></i>
                                                        </div>
                                                        <div className="modal-body mt-4 ct_custom_scrollbar" style={{ height: "calc(100vh - 383px) !important" }}>
                                                            <div className="chat-lists ">
                                                                <div className="chat-list">
                                                                    {filterUserList?.length != 0 &&
                                                                        filterUserList?.map((item) => (
                                                                            <a className={`d-flex ${selectUserkey == item?.conversation_key && "active2"}`} onClick={() => handleGetOldMessages(item?.conversation_key, item)}>
                                                                                <div className="ct_chat_list_grid">
                                                                                    <div className="position-relative">
                                                                                        <img className="img-fluid ct_img_40"
                                                                                            src={item?.profile_image ? item?.profile_image : "assets/img/dummy_user_img.png"} alt="user img" />
                                                                                    </div>
                                                                                    <div className="flex-grow-1 ms-3">
                                                                                        <div
                                                                                            className="d-flex align-items-center gap-2 justify-content-between">
                                                                                            <h3 className="ct_fs_16 ct_fw_600">{item?.name ?? ""}
                                                                                            </h3>
                                                                                            <div className="ct_caht_msg_notify ">
                                                                                                <span className="ms-auto">1</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            className="d-flex align-items-center gap-2 justify-content-between">
                                                                                            <p
                                                                                                className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                                                                                {item?.body ?? ""}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`chatbox ${selectUserkey && "showbox"}`}>
                                                {!selectUserkey &&
                                                    <div className="ct_empty_chat_box_content">
                                                        <svg width="123" height="123" viewBox="0 0 123 123" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.956267" y="1.3696" width="120.87" height="120.87"
                                                                rx="60.4348" fill="#F4F5FA" />
                                                            <rect x="0.956267" y="1.3696" width="120.87" height="120.87"
                                                                rx="60.4348" stroke="#E1E2E9" stroke-width="0.869565" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M76.764 77.1737C70.1202 83.8182 60.2823 85.2538 52.2315 81.5305C51.043 81.052 50.0686 80.6653 49.1423 80.6653C46.5621 80.6806 43.3505 83.1824 41.6814 81.5152C40.0122 79.8459 42.516 76.6318 42.516 74.036C42.516 73.1096 42.1446 72.1526 41.6661 70.9618C37.9411 62.9123 39.3787 53.0711 46.0225 46.4288C54.5036 37.9445 68.2828 37.9445 76.764 46.4266C85.2605 54.924 85.2452 68.6916 76.764 77.1737Z"
                                                                fill="#BEC0CA" stroke="#8B8D97" stroke-width="1.30435"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M69.9541 62.7022H69.9737" stroke="#8B8D97"
                                                                stroke-width="1.73913" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                            <path d="M61.2412 62.7022H61.2608" stroke="#8B8D97"
                                                                stroke-width="1.73913" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                            <path d="M52.5244 62.7022H52.544" stroke="#8B8D97"
                                                                stroke-width="1.73913" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                        </svg>
                                                        <div>
                                                            <h4 className="ct_fs_20 ct_fw_600">Messages</h4>
                                                            <p>Click on a contact to view messages.</p>
                                                            <div className="">
                                                                <a className="ct_yellow_btn d-flex align-items-center justify-content-center gap-2">
                                                                    <span> New Message</span></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className=" ct_border_radius_10 ct_p_20 h-100 pb-0 pt-2">
                                                    <div className="modal-dialog-scrollable">
                                                        <div className="modal-content ct_chatroom_modal_content">
                                                            <div className="d-block">
                                                                <div
                                                                    className="msg-head d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                                                    <div className="d-flex align-items-center gap-2 ">
                                                                        <i className="fa-solid fa-chevron-left chat-icon" onClick={() => setSelectUserKey()}></i>
                                                                        <div className="ct_grid_50_auto">
                                                                            <img src={selectUserData?.profile_image ? selectUserData?.profile_image : "assets/img/dummy_user_img.png"} alt="" />
                                                                            <div>
                                                                                <h4 className="ct_fs_18 ct_fw_600  mb-0">
                                                                                    {selectUserData?.name ? selectUserData?.name : selectUserData?.full_name ? selectUserData?.full_name : ""}
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <a className="ct_yellow_btn px-3 py-2 h-auto" onClick={() => setIsAddUserModalShow(true)}>+ Add New Chat</a>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="msg-body ct_custom_scrollbar" ref={scrollRef}
                                                                        style={{
                                                                            scrollBehavior: "auto",
                                                                        }}>
                                                                        <ul>
                                                                            {userChatMessages?.length != 0 && userChatMessages?.map((item) => (
                                                                                item?.from_uid == userData?.attributes?.unique_auth_id ?
                                                                                    <li>
                                                                                        <div className="repaly">
                                                                                            <p className='mb-0'>{item?.text ?? ""}</p>
                                                                                        </div>
                                                                                    </li>
                                                                                    :
                                                                                    <li>
                                                                                        <div>
                                                                                            <div className="sender">
                                                                                                <h5 className="ct_fs_16 mb-0">
                                                                                                    {item?.text ?? ""}
                                                                                                </h5>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="send-box">
                                                                    <form
                                                                        onSubmit={(e) => {
                                                                            e.preventDefault();
                                                                            textMessage?.trim() != '' &&
                                                                                handleSendMessage(selectUserData?.agora_account_id, selectUserData?.peer?.unique_auth_id, textMessage)
                                                                        }}
                                                                        className="position-relative"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={textMessage}
                                                                            onChange={(e) => setTextMessage(e.target.value)}
                                                                            placeholder="Your message"
                                                                        />
                                                                        <div className="ct_right_side_send_chat_btns" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            textMessage?.trim() != '' &&
                                                                                handleSendMessage(selectUserData?.agora_account_id, selectUserData?.peer?.unique_auth_id, textMessage)
                                                                        }}>
                                                                            Send <i className="fa-solid fa-paper-plane"></i>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            {/* <div className="ct_empty_chat_box_content d-none">
                                                                    <svg width="123" height="123" viewBox="0 0 123 123" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <rect x="0.956267" y="1.3696" width="120.87" height="120.87"
                                                                            rx="60.4348" fill="#F4F5FA" />
                                                                        <rect x="0.956267" y="1.3696" width="120.87" height="120.87"
                                                                            rx="60.4348" stroke="#E1E2E9" stroke-width="0.869565" />
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                            d="M76.764 77.1737C70.1202 83.8182 60.2823 85.2538 52.2315 81.5305C51.043 81.052 50.0686 80.6653 49.1423 80.6653C46.5621 80.6806 43.3505 83.1824 41.6814 81.5152C40.0122 79.8459 42.516 76.6318 42.516 74.036C42.516 73.1096 42.1446 72.1526 41.6661 70.9618C37.9411 62.9123 39.3787 53.0711 46.0225 46.4288C54.5036 37.9445 68.2828 37.9445 76.764 46.4266C85.2605 54.924 85.2452 68.6916 76.764 77.1737Z"
                                                                            fill="#BEC0CA" stroke="#8B8D97" stroke-width="1.30435"
                                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M69.9541 62.7022H69.9737" stroke="#8B8D97"
                                                                            stroke-width="1.73913" stroke-linecap="round"
                                                                            stroke-linejoin="round" />
                                                                        <path d="M61.2412 62.7022H61.2608" stroke="#8B8D97"
                                                                            stroke-width="1.73913" stroke-linecap="round"
                                                                            stroke-linejoin="round" />
                                                                        <path d="M52.5244 62.7022H52.544" stroke="#8B8D97"
                                                                            stroke-width="1.73913" stroke-linecap="round"
                                                                            stroke-linejoin="round" />
                                                                    </svg>
                                                                    <div>
                                                                        <h4 className="ct_fs_20 ct_fw_600">Messages</h4>
                                                                        <p>Click on a contact to view messages.</p>
                                                                        <div className="">
                                                                            <a
                                                                                className="ct_purple_btn d-flex align-items-center gap-2">
                                                                                <svg
                                                                                    width="20" height="20" viewBox="0 0 20 20"
                                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                                                        d="M15.8447 16.039C13.1871 18.6968 9.25198 19.271 6.03167 17.7817C5.55627 17.5903 5.16651 17.4356 4.79598 17.4356C3.7639 17.4417 2.47927 18.4425 1.81162 17.7756C1.14396 17.1079 2.14545 15.8222 2.14545 14.7839C2.14545 14.4133 1.99688 14.0305 1.8055 13.5542C0.315505 10.3344 0.890529 6.39795 3.54805 3.74101C6.94052 0.347298 12.4522 0.347298 15.8447 3.74014C19.2432 7.1391 19.2371 12.6461 15.8447 16.039Z"
                                                                                        stroke="white" stroke-width="1.30435"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                    <path d="M13.1203 10.2505H13.1281" stroke="white"
                                                                                        stroke-width="1.73913" stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                    <path d="M9.63595 10.2505H9.64377" stroke="white"
                                                                                        stroke-width="1.73913" stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                    <path d="M6.14962 10.2505H6.15745" stroke="white"
                                                                                        stroke-width="1.73913" stroke-linecap="round"
                                                                                        stroke-linejoin="round" />
                                                                                </svg>
                                                                                <span> New Message</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {manageStep == "2" &&
                                    <div className={`tab-pane fade ${manageStep == "2" && "active show"}`}>
                                        <div className="chat-list">
                                            {discoverAllConnections?.length != 0 &&
                                                discoverAllConnections?.map((item) => (
                                                    <a className="d-flex active2 align-items-center">
                                                        <div className="position-relative">
                                                            <img
                                                                className="img-fluid ct_img_40"
                                                                src={item?.attributes?.profile_image ? item?.attributes?.profile_image : "/assets/img/dummy_user_img.png"}
                                                                alt="user img"
                                                            />
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <div
                                                                className="d-flex align-items-center gap-2 justify-content-between">
                                                                <h3 className="ct_fs_16 ct_fw_600">{item?.attributes?.full_name ?? ""}</h3>
                                                            </div>
                                                            <div
                                                                className="d-flex align-items-center gap-2 justify-content-between">
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <button className="ct_yellow_btn ct_white_nowrap" onClick={() => onHandleInviteUser(item)}>
                                                                {item?.attributes?.connection_status == "not_connected" ? "+ Invite" : item?.attributes?.connection_status == "pending" ? "Pending" : ""}
                                                            </button>
                                                        </div>
                                                    </a>
                                                ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {isAddUserModalShow &&
                <AddNewUserToChat
                    displayUser={displayUser}
                    onClose={() => setIsAddUserModalShow(false)}
                />
            }
        </div >
    );
};

export default Chat;