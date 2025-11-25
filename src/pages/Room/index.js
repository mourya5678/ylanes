import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { pageRoutes } from '../../routes/PageRoutes';
import { getMyRoomData, getPastRoomData, getRecommendedRoomData, getUpcommingRoomData, roomCancelByHost, roomCancelByUser } from '../../redux/actions/createRoom';
import Loader from '../../components/Loader';
import { pipGetAccessToken, pipViewDate2 } from '../../auth/Pip';
import RoomRegisterModal from '../../components/Modals/RoomRegisterModal';
import CancelRoomModal from '../../components/Modals/CancelRoomModal';
import SendFeedback from '../../components/Modals/SendFeedback';
import { getMyProfileDatass } from '../../redux/actions/authActions';

const MyRoom = ({ messageApi }) => {
    const { isCreateLoading, pastRoomList, upcommingRoomList, recommendedList, myRoomList } = useSelector((state) => state.createRoomReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('1');
    const userData = pipGetAccessToken("user_data");
    const [isRegisterShow, setIsRegisterShow] = useState(false);
    const [isCancelModal, setIsCancelModal] = useState(false);
    const [isSendFeedBackModal, setIsSendFeedBackModal] = useState(false);
    const [registerData, setRegisterData] = useState({});
    const [pastCallData, setPastCallData] = useState({});


    useEffect(() => {
        getRoomData();
    }, []);

    const getRoomData = () => {
        dispatch(getMyRoomData({ messageApi }));
        dispatch(getPastRoomData({ messageApi }));
        dispatch(getUpcommingRoomData({ messageApi }));
        dispatch(getRecommendedRoomData({ messageApi }));
    };

    const handleShowRoomStatus = (item, val) => {
        let isHost = item?.attributes?.is_host;
        let isRegistered = item?.attributes?.is_registered;
        let roomId = item?.id;
        let remainingRoomCount = Number(item?.attributes?.remaining_seats);
        const currentTime = new Date().getTime() / 1000;
        const belowTime = new Date(item?.attributes?.start_time).getTime() / 1000;
        const finalTime = belowTime - currentTime;
        let isEnter = false;
        if (finalTime <= 300) {
            isEnter = true;
        };
        let name = "";
        if (val == true) {
            if (isHost || isRegistered) {
                if (isEnter) {
                    if (item?.attributes?.joined_uers?.toString()?.includes(userData?.attributes?.id)) {
                        name = "REJOIN";
                    } else {
                        name = "ENTER";
                    };
                } else {
                    name = "CANCEL";
                };
            } else if (!isHost && !isRegistered && remainingRoomCount > 0) {
                name = "REGISTER";
            } else if (remainingRoomCount == 0) {
                name = "FULL";
            };
        } else {
            if (item?.attributes?.joined_uers?.includes(userData?.id)) {
                name = "REJOIN";
            } else if (isEnter == true && roomId == item?.id) {
                name = "ENTER";
            } else {
                name = "CANCEL";
            };
        };
        return name;
    };

    const handleShowRoomStartTime = (value) => {
        const date = new Date(value);
        const now = new Date();
        const diffMs = date - now;
        const fiveMinutes = 5 * 60 * 1000;
        if (diffMs <= fiveMinutes) {
            return <span className='ct_live_badge'>LIVE</span>;
        } else {
            return pipViewDate2(value);
        }
    };

    const handleOpenModal = (val, item) => {
        setRegisterData(item);
        if (val == "CANCEL") {
            setIsCancelModal(true);
        } else if (val == "ENTER") {
            navigate(pageRoutes.videoCall, { state: { data: item } });
        } else {
            setIsRegisterShow(true)
        };
    };

    const handleCancelRoom = () => {
        setIsCancelModal(false);
        const callback = (response) => {
            if (response?.message) {
                messageApi.success(response?.message ?? "");
            };
            getRoomData();
            setActiveTab(activeTab);
        };
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const unixTime = Math.floor(Date.now() / 1000).toString();
        const headers = {
            "TZone": timeZone,
            "UTime": unixTime
        };
        if (registerData?.attributes?.host?.data?.id == userData?.id) {
            var formData = new FormData();
            formData.append("room_id", String(registerData?.id));
            dispatch(roomCancelByHost({ payload: formData, callback, messageApi, headers: headers }));
        } else {
            const data = registerData?.id
            dispatch(roomCancelByUser({ payload: data, callback, messageApi, headers: headers }));
        };
    };

    const handleManageFeedBackForm = (value, item) => {
        setPastCallData(item);
        if (value == "See your feedback") {
            setIsSendFeedBackModal(true);
        };
    };

    if (isCreateLoading) {
        return <Loader />
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
                                        <input
                                            type="search"
                                            className="form-control ct_input ct_border_radius_100"
                                            placeholder="Search"
                                        />
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <div className="ct_searchable_list d-none">
                                        <ul className="ct_custom_scroll">
                                            <li>
                                                <p className="mb-0 ct_fw_600">Topics</p>
                                                <p className="mb-0 ct_fw_600"><i className="fa-solid fa-angle-right"></i></p>
                                            </li>
                                            <li> <p className="mb-0 ct_fw_600">Profiles</p>
                                                <p className="mb-0 ct_fw_600"><i className="fa-solid fa-angle-right"></i></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex  align-items-center gap-2 ct_w_100_767">
                                    <a onClick={() => navigate(pageRoutes.userWallet)} className="ct_outline_border ct_w_100_767 text-dark"><img src="assets/img/wallet_icon.png" alt="" width="20px" />{userData?.attributes?.ycoins ?? 0}</a>
                                </div>
                            </div>
                            <div>
                                <ul
                                    className="nav nav-pills mb-3 ct_custom_tabs"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link ${activeTab == 1 && 'active'}`}
                                            onClick={() => setActiveTab('1')}
                                        >
                                            My Video Call Rooms
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link ${activeTab == 2 && 'active'}`}
                                            onClick={() => setActiveTab('2')}
                                        >
                                            Recommended
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link ${activeTab == 3 && 'active'}`}
                                            onClick={() => setActiveTab('3')}
                                        >
                                            Upcoming Video Call Rooms
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link ${activeTab == 4 && 'active'}`}
                                            onClick={() => setActiveTab('4')}
                                        >
                                            Past Rooms
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div
                                        className={`tab-pane fade ${activeTab == 1 && 'active show'}`}
                                    >
                                        <ul>
                                            {myRoomList?.length != 0 ?
                                                myRoomList?.map((item) => (
                                                    <li className="mb-3">
                                                        <div className="ct_white_bg">
                                                            <div>
                                                                <div className='d-flex align-items-center justify-content-between gap-2 mb-3'>
                                                                    <h4 className="ct_fs_18 ct_fw_600 mb-0">{item?.attributes?.topic_name ?? ""}</h4>
                                                                    <button className='ct_yellow_btn py-1 px-3' onClick={() => {
                                                                        handleOpenModal(handleShowRoomStatus(item, false), item)
                                                                    }}>{handleShowRoomStatus(item, false)}</button>
                                                                </div>
                                                                <div className='ct_cursor d-flex align-items-start gap-1 mb-3' onClick={() => navigate(pageRoutes.roomDetails, { state: { data: item } })}>
                                                                    <img
                                                                        alt=""
                                                                        className="ct_img_40 ct_flex_shrink_0 me-2"
                                                                        src={item?.attributes?.host?.data?.attributes?.profile_image || "assets/img/dummy_user_img.png"}
                                                                    />
                                                                    <div>
                                                                        <small className='ct_fs_14 ct_fw_500'>{item?.attributes?.host?.data?.attributes?.full_name ?? ""}</small>
                                                                        <p className='mb-0 ct_fs_14 ct_para_scroll ct_custom_scroll'>{item?.attributes?.your_take ?? ""}</p>
                                                                    </div>
                                                                </div>
                                                                {item?.attributes?.participants?.data?.length == 0 &&
                                                                    <small className='ct_text_op_6 d-block text-end'>{item?.attributes?.remaining_seats ?? 0} seat available</small>
                                                                }
                                                            </div>
                                                            {item?.attributes?.participants?.data?.length != 0 &&
                                                                <div className='ct_border_top_1 pt-3 d-flex align-items-center justify-content-between mt-2'>
                                                                    <ul className='d-flex align-items-center gap-2'>
                                                                        {item?.attributes?.participants?.data?.length != 0 &&
                                                                            item?.attributes?.participants?.data?.map((items) => (
                                                                                <li className='d-flex align-items-center gap-0'>
                                                                                    <img
                                                                                        alt=""
                                                                                        className="ct_img_20 ct_flex_shrink_0 me-2"
                                                                                        src={items?.attributes?.participant?.data?.attributes?.profile_image || "assets/img/dummy_user_img.png"}
                                                                                    />
                                                                                    <div className='d-flex align-items-center gap-1'>
                                                                                        <i className='fa-solid fa-heart ct_yellow_text'></i>
                                                                                        <span className='ct_fs_12'>{items?.attributes?.participant?.data?.attributes?.hearts ?? 0}</span>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                    <small className='ct_text_op_6 d-block text-end'>{item?.attributes?.remaining_seats ?? 0} seat available</small>
                                                                </div>
                                                            }
                                                            <div className="ct_border_top_1 pt-3 mt-3 d-flex align-items-start gap-3 justify-content-between ct_cursor" onClick={() => navigate(pageRoutes.roomDetails, { state: { data: item } })}>
                                                                <div className='d-flex align-items-center gap-3 flex-wrap'>
                                                                    <p className="mb-0">
                                                                        <i className="fa-regular fa-clock me-2"></i>
                                                                        {handleShowRoomStartTime(item?.attributes?.start_time)}
                                                                        {/* {pipViewDate2(item?.attributes?.start_time)} */}
                                                                        {/* <span className='ct_live_badge'>LIVE</span> */}
                                                                    </p>
                                                                    <p className='mb-0'><img alt="" width="20px" className='me-1' src="assets/img/wallet_icon.png" />{item?.attributes?.room_price ?? 0}</p>
                                                                    <p className='mb-0'><i className="fa-solid fa-star me-1"></i>{item?.attributes?.room_type_name ?? ""}</p>
                                                                </div>
                                                                <div>
                                                                    <i className="fa-solid fa-share-nodes"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                                :
                                                <div className='et_empty_content_main mt-5'>
                                                    <div className='et_empty_logo'>
                                                        <img src='assets/img/fav_icon.png' />
                                                    </div>
                                                    <h6 className='ct_fs_16 ct_fw_600 mb-1 text-center'>No Rooms Available</h6>
                                                    <p className='mb-0 text-center ct_fs_14 ct_text_op_6'>Create a room and start having a conversation</p>
                                                    <div className='text-center mt-3'>
                                                        <button className='ct_yellow_btn' onClick={() => navigate(pageRoutes?.createRoom)}>Create Room</button>
                                                    </div>
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab == 2 && 'active show'}`}
                                    >
                                        <ul>
                                            {recommendedList?.length != 0 ?
                                                recommendedList?.map((item) => (
                                                    <li className="mb-3">
                                                        <div className="ct_white_bg">
                                                            <div>
                                                                <div className='d-flex align-items-center justify-content-between gap-2 mb-3'>
                                                                    <h4 className="ct_fs_18 ct_fw_600 mb-0">{item?.attributes?.topic_name ?? ""}</h4>
                                                                    <button className='ct_yellow_btn py-1 px-3' onClick={() => {
                                                                        setRegisterData(item)
                                                                        setIsRegisterShow(true)
                                                                    }}>{handleShowRoomStatus(item, true)}</button>
                                                                </div>
                                                                <div className='ct_cursor' onClick={() => navigate(pageRoutes.roomDetails, { state: { data: item } })}>
                                                                    <small className='ct_fs_14 ct_fw_500'>{item?.attributes?.host?.data?.attributes?.full_name ?? ""}</small>
                                                                    <p className='mb-0 ct_fs_14'>{item?.attributes?.your_take ?? ""}</p>
                                                                </div>
                                                                <small className='ct_text_op_6 d-block text-end mt-3'>{item?.attributes?.remaining_seats ?? 0} seat available</small>

                                                            </div>
                                                            <div className="ct_border_top_1 pt-3 mt-3 d-flex align-items-start gap-3 justify-content-between ct_cursor" onClick={() => navigate(pageRoutes.roomDetails, { state: { data: item } })}>
                                                                <div className='d-flex align-items-center gap-3 flex-wrap'>
                                                                    <p className="mb-0">
                                                                        <i className="fa-regular fa-clock me-2"></i>
                                                                        {pipViewDate2(item?.attributes?.start_time)}
                                                                    </p>
                                                                    <p className='mb-0'><img alt="" width="20px" className='me-1' src="assets/img/wallet_icon.png" />{item?.attributes?.room_price ?? 0}</p>
                                                                    <p className='mb-0'><i className="fa-solid fa-star me-1"></i>{item?.attributes?.room_type_name ?? ""}</p>
                                                                </div>
                                                                <div>
                                                                    <i className="fa-solid fa-share-nodes"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                                :
                                                <div className='et_empty_content_main mt-5'>
                                                    <div className='et_empty_logo'>
                                                        <img src='assets/img/fav_icon.png' />
                                                    </div>
                                                    <h6 className='ct_fs_16 ct_fw_600 mb-1 text-center'>No Rooms Available</h6>
                                                    <p className='mb-0 text-center ct_fs_14 ct_text_op_6'>Create a room and start having a conversation</p>
                                                    <div className='text-center mt-3'>
                                                        <button className='ct_yellow_btn' onClick={() => navigate(pageRoutes?.createRoom)}>Create Room</button>
                                                    </div>
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab == 3 && 'active show'}`}
                                    >
                                        <ul>
                                            {upcommingRoomList?.length != 0 ?
                                                upcommingRoomList?.map((item) => (
                                                    <li className="mb-3">
                                                        <div className="ct_white_bg">
                                                            <div>
                                                                <div className='d-flex align-items-center justify-content-between gap-2 mb-3'>
                                                                    <h4 className="ct_fs_18 ct_fw_600 mb-0">{item?.attributes?.topic_name ?? ""}</h4>
                                                                    <button className='ct_yellow_btn py-1 px-3' onClick={() => {
                                                                        handleOpenModal(handleShowRoomStatus(item, true), item)
                                                                    }}>{handleShowRoomStatus(item, true)}</button>
                                                                </div>
                                                                <div className='ct_cursor' onClick={() => navigate(pageRoutes.roomDetails, { state: { data: item } })}>
                                                                    <small className='ct_fs_14 ct_fw_500'>{item?.attributes?.host?.data?.attributes?.full_name ?? ""}</small>
                                                                    <p className='mb-0 ct_fs_14'>{item?.attributes?.your_take ?? ""}</p>
                                                                </div>
                                                                <small className='ct_text_op_6 d-block text-end mt-3'>{item?.attributes?.remaining_seats ?? 0} seat available</small>
                                                            </div>
                                                            <div className="ct_cursor ct_border_top_1 pt-3 mt-3 d-flex align-items-start gap-3 justify-content-between" onClick={() => navigate(pageRoutes.roomDetails, { state: { data: item } })}>
                                                                <div className='d-flex align-items-center gap-3 flex-wrap'>
                                                                    <p className="mb-0">
                                                                        <i className="fa-regular fa-clock me-2"></i>
                                                                        {pipViewDate2(item?.attributes?.start_time)}
                                                                    </p>
                                                                    <p className='mb-0'><img alt="" width="20px" className='me-1' src="assets/img/wallet_icon.png" />{item?.attributes?.room_price ?? 0}</p>
                                                                    <p className='mb-0'><i className="fa-solid fa-star me-1"></i>{item?.attributes?.room_type_name ?? ""}</p>
                                                                </div>
                                                                <div>
                                                                    <i className="fa-solid fa-share-nodes"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                                :
                                                <div className='et_empty_content_main mt-5'>
                                                    <div className='et_empty_logo'>
                                                        <img src='assets/img/fav_icon.png' />
                                                    </div>
                                                    <h6 className='ct_fs_16 ct_fw_600 mb-1 text-center'>No Rooms Available</h6>
                                                    <p className='mb-0 text-center ct_fs_14 ct_text_op_6'>Create a room and start having a conversation</p>
                                                    <div className='text-center mt-3'>
                                                        <button className='ct_yellow_btn' onClick={() => navigate(pageRoutes?.createRoom)}>Create Room</button>
                                                    </div>
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                    <div className={`tab-pane fade ${activeTab == 4 && 'active show'}`}>
                                        <ul>
                                            {pastRoomList?.length != 0 ?
                                                pastRoomList?.map((item) => (
                                                    <li className="mb-3">
                                                        <div className="ct_white_bg">
                                                            <div>
                                                                <div className='d-flex align-items-center justify-content-between gap-2 mb-3'>
                                                                    <h4 className="ct_fs_18 ct_fw_600 mb-0">{item?.attributes?.topic_name ?? ""}</h4>
                                                                </div>
                                                                <div>
                                                                    <img
                                                                        alt=""
                                                                        className="ct_img_40 ct_flex_shrink_0 me-2"
                                                                        src={item?.attributes?.host?.data?.attributes?.profile_image || "assets/img/dummy_user_img.png"}
                                                                    />
                                                                    <small className='ct_fs_14 ct_fw_500'>{item?.attributes?.host?.data?.attributes?.full_name ?? ""}</small>
                                                                </div>
                                                            </div>
                                                            <div className="ct_border_top_1 pt-3 mt-3 d-flex align-items-start gap-3 justify-content-between">
                                                                <div className='d-flex align-items-center gap-3 flex-wrap'>
                                                                    <p className="mb-0">
                                                                        <i className="fa-regular fa-clock me-2"></i>
                                                                        {pipViewDate2(item?.attributes?.start_time)}
                                                                    </p>
                                                                    <p className='mb-0'><i className="fa-solid fa-star me-1"></i>{item?.attributes?.room_type_name ?? ""}</p>
                                                                </div>
                                                                {
                                                                    item?.attributes?.feedback_received?.meta?.total_hearts ?
                                                                        <>
                                                                        </>
                                                                        :
                                                                        <a className='ct_fs_14 text-dark' onClick={() => handleManageFeedBackForm(item?.attributes?.feedback_received, item)}>{item?.attributes?.feedback_received ?? ""}</a>
                                                                }
                                                            </div>
                                                            <div className=''>
                                                                {item?.attributes?.feedback_received?.meta?.total_hearts &&
                                                                    <p className="mb-0 ct_fs_14 mt-3 d-flex align-items-center gap-2">
                                                                        Your Feedback {" "}<i className="fa-solid fa-heart ct_yellow_text"></i>
                                                                        <span className="">
                                                                            {item?.attributes?.feedback_received?.meta?.total_hearts ?? "0"}
                                                                        </span>
                                                                    </p>
                                                                }
                                                                {item?.attributes?.feedback_received?.data?.length != 0 &&
                                                                    <ul className='ct_para_scroll ct_custom_scroll pe-3 mt-3' style={{ maxHeight: "147px" }}>
                                                                        {item?.attributes?.feedback_received?.data?.map((val) => (
                                                                            val?.attributes?.feedback != "" &&
                                                                            <li className='mb-2 ct_outline_bg p-2 ct_border_radius_10'>
                                                                                <p className='ct_para_scroll mb-0 ct_custom_scroll' style={{ maxHeight: "147px" }}>
                                                                                    {val?.attributes?.feedback ?? ""}
                                                                                </p>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                                :
                                                <div className='et_empty_content_main mt-5'>
                                                    <div className='et_empty_logo'>
                                                        <img src='assets/img/fav_icon.png' />
                                                    </div>
                                                    <h6 className='ct_fs_16 ct_fw_600 mb-1 text-center'>No Rooms Available</h6>
                                                    <p className='mb-0 text-center ct_fs_14 ct_text_op_6'>Create a room and start having a conversation</p>
                                                    <div className='text-center mt-3'>
                                                        <button className='ct_yellow_btn' onClick={() => navigate(pageRoutes?.createRoom)}>Create Room</button>
                                                    </div>
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {isRegisterShow && registerData &&
                <RoomRegisterModal
                    onClose={() => setIsRegisterShow(false)}
                    onHandleClose={() => {
                        setIsRegisterShow(false);
                        setActiveTab(activeTab);
                        dispatch(getMyProfileDatass({ payload: userData?.id, messageApi }));
                        dispatch(getMyRoomData({ messageApi }));
                        dispatch(getPastRoomData({ messageApi }));
                        dispatch(getUpcommingRoomData({ messageApi }));
                        dispatch(getRecommendedRoomData({ messageApi }));
                    }}
                    registerData={registerData}
                    messageApi={messageApi}
                />
            }
            {isCancelModal &&
                <CancelRoomModal
                    onClose={() => setIsCancelModal(false)}
                    handleRoomCancel={handleCancelRoom}
                />
            }
            {isSendFeedBackModal &&
                <SendFeedback
                    onClose={() => setIsSendFeedBackModal(false)}
                    pastCallData={pastCallData}
                    messageApi={messageApi}
                    handleClose={() => {
                        setIsSendFeedBackModal(false)
                        getRoomData()
                        dispatch(getMyProfileDatass({ payload: userData?.id, messageApi }));
                    }}
                />
            }
        </div >
    )
};

export default MyRoom;