import React, { useEffect, useState } from 'react';
import { pipGetAccessToken } from '../../auth/Pip';
import { Rating } from "react-simple-star-rating";
import { useDispatch } from 'react-redux';
import { blockUserData, getReportReason, reportParticipants, submitRoomFeedBack, submitUserFeedBack } from '../../redux/actions/authActions';
import { message } from 'antd';
import ModalLoader from '../ModalLoader';

const SendFeedback = ({ onClose, pastCallData, messageApi, handleClose }) => {
    const dispatch = useDispatch();
    const [newArrayData, setNewArrayData] = useState([]);
    const userData = pipGetAccessToken("user_data");
    const [blockUser, setIsBlockuser] = useState({});
    const [reportUser, setIsReportuser] = useState({});
    const [isBlock, setIsBlock] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const [isLoader, setIsloader] = useState(false);
    const [isRefund, setIsRefund] = useState(false);
    const [isRoomFeedBack, setIsRoomFeedBack] = useState(false);
    const [roomFeedBack, setRoomFeedBack] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [selectReason, setSelectReason] = useState('');
    const [wantRefund, setWantRefund] = useState(false);

    const [reportList, setReportList] = useState([
        { id: 'violent-speech', label: 'Violent Speech' },
        { id: 'hateful-abusive-content', label: 'Hateful Or Abusive Content' },
        { id: 'harassment-bullying', label: 'Harassment Or Bullying' },
        { id: 'suicide-self-harm', label: 'Suicide Or Self Harm' },
        { id: 'child-abuse', label: 'Child Abuse' },
        { id: 'promotes-terrorism', label: 'Promotes Terrorism' },
        { id: 'spam-misleading-content', label: 'Spam Or Misleading Content' },
        { id: 'sensitive-disturbing-content', label: 'Sensitive Or Disturbing Content' },
    ]);

    const badFeedbackOptions = [
        "Fellow Participants",
        "Topic",
        "Technology",
        "Others"
    ];

    useEffect(() => {
        if (!pastCallData) return;
        const newData = [];
        const hostData = pastCallData?.attributes?.host?.data;
        if (hostData) {
            if (userData?.id != hostData?.id) {
                newData.push({
                    id: hostData?.id,
                    send_request_status: hostData?.attributes?.send_request_status,
                    age: hostData?.attributes?.age,
                    profile_image: hostData?.attributes?.profile_image || "assets/img/dummy_user_img.png",
                    full_name: pastCallData?.attributes?.is_anonymously ? pastCallData?.attributes?.anonymously_name : hostData?.attributes?.full_name,
                    hearts: hostData?.attributes?.hearts,
                    isHost: true,
                    given_rating: 0,
                    message: ""
                });
            }
        };
        const participants = pastCallData?.attributes?.participants?.data;
        if (participants?.length) {
            participants.forEach((item) => {
                const participant = item?.attributes?.participant?.data;
                if (userData?.id != participant?.id) {
                    newData.push({
                        id: participant?.id,
                        send_request_status: participant?.attributes?.send_request_status,
                        age: participant?.attributes?.age,
                        profile_image: participant?.attributes?.profile_image,
                        full_name: item?.attributes?.is_anonymously
                            ? item?.attributes?.anonymously_name
                            : participant?.attributes?.full_name,
                        hearts: participant?.attributes?.hearts,
                        isHost: false,
                        given_rating: 0,
                        message: ""
                    });
                }
            });
        };
        setNewArrayData(newData);
        dispatch(getReportReason({ messageApi }));
    }, [pastCallData]);

    const handleRating = (rate, value, index) => {
        setNewArrayData((prev) =>
            prev.map((u, i) =>
                i == index ? { ...u, given_rating: rate } : u
            )
        );
    };

    const handleUserMessage = (rate, index) => {
        setNewArrayData((prev) =>
            prev.map((u, i) =>
                i == index ? { ...u, message: rate } : u
            )
        );
    };

    const handleBlockUser = (value) => {
        setIsloader(true)
        const callback = (response) => {
            setIsloader(false)
            setIsBlock(false)
            if (response?.message) {
                messageApi?.success(response?.message);
            } else {
                messageApi?.error(response?.message);
            };
        };
        let formData = new FormData();
        formData.append("user_id", value);
        dispatch(blockUserData({ payload: formData, callback, messageApi }));
    };

    const handleReportUser = (value) => {
        setIsloader(true);
        const callback = (response) => {
            setIsloader(false);
            setIsReport(false)
            if (response) {
                messageApi.success("User reported successfully!")
            };
        };
        let roomID = pastCallData?.id;
        const formData = new FormData();
        formData.append('room_id', `${roomID}`);
        formData.append('user_id', `${reportUser?.id}`);
        formData.append('reason', value);
        dispatch(reportParticipants({ payload: formData, callback, messageApi }))
    };

    const handleSubmitFeedBack = () => {
        setIsloader(true);
        const hasZeroRating = newArrayData.some(
            (item) => !item?.given_rating || item?.given_rating === 0
        );
        if (hasZeroRating) {
            setIsloader(false);
            messageApi.error("Please rate all participants before submitting feedback.");
            return;
        };
        const callback = (response) => {
            setIsloader(false);
            setIsRoomFeedBack(true)
        };
        let roomID = pastCallData?.id;
        let modifiedParticipantsData = newArrayData?.map(
            (data) => {
                return {
                    room_id: roomID,
                    feedback_to_id: userData.id,
                    feedback_from_id: data.id,
                    hearts: data.given_rating,
                    feedback: data.message,
                };
            }
        );
        let participantsFeedbackData = {
            room_id: pastCallData?.id,
            data: modifiedParticipantsData,
        };
        dispatch(submitUserFeedBack({ payload: participantsFeedbackData, callback, messageApi }));
    };

    const handleSendRoomFeedBack = () => {
        setIsloader(true);
        if (roomFeedBack != "") {
            if (feedbackMessage?.trim() != "") {
                if (roomFeedBack == "sad") {
                    setIsRoomFeedBack(false);
                    setIsRefund(true);
                    setIsloader(false);
                } else {
                    const callback = (response) => {
                        setIsloader(false);
                        handleClose();
                        if (response) {
                            messageApi.success("Feedback send successfully");
                        };
                    };
                    let roomID = pastCallData?.id;
                    const formData = new FormData();
                    formData.append("room_id", roomID);
                    formData.append("reaction", roomFeedBack);
                    formData.append("reason", roomFeedBack);
                    formData.append("refund", wantRefund ? "yes" : "no");
                    formData.append("feedback", feedbackMessage);
                    dispatch(submitRoomFeedBack({ payload: formData, callback, messageApi }));
                };
            } else {
                setIsloader(false);
                messageApi.error("Please select an emoji rating before submitting your feedback.");
            };
        } else {
            setIsloader(false);
            messageApi.error("Please select an emoji rating before submitting your feedback.");
        };
    };

    const handleSubmitFinalReview = () => {
        setIsloader(true);
        if (selectReason != "") {
            const callback = (response) => {
                setIsloader(false);
                if (response) {
                    messageApi.success("Feedback send successfully");
                }
                handleClose()
            };
            let roomID = pastCallData?.id;
            const formData = new FormData();
            formData.append("room_id", roomID);
            formData.append("reaction", roomFeedBack);
            formData.append("reason", selectReason);
            formData.append("refund", wantRefund ? "yes" : "no");
            formData.append("feedback", feedbackMessage);
            dispatch(submitRoomFeedBack({ payload: formData, callback, messageApi }));
        } else {
            setIsloader(false);
            messageApi.error("Please select the reason");
        };
    };

    return (
        <div className="modal show d-block ct_congratulation_modal_fade ct_modal_w_700" tabIndex="-1">
            <div className="ct_modal-dialog  modal-dialog-centered  justify-content-center">
                <div className={`ct_copy_modal position-relative ct_custom_scroll ${isLoader && "ct_height_for_loader"}`} style={{ maxHeight: "calc(100vh - 50px)", overflowY: "auto" }}>
                    {isLoader ? <ModalLoader /> :
                        <>
                            {!isBlock && !isReport &&
                                <div className="modal-header border-0 pt-0 pb-2">
                                    <button onClick={onClose} type="button" className="btn-close ct_position_close"></button>
                                </div>
                            }
                            <div className={`mt-0 ${isBlock ? 'd-none' : isReport ? 'd-none' : isRoomFeedBack ? 'd-none' : isRefund ? "d-none" : ""}`}>
                                <div className="mb-4">
                                    <h4 className="ct_fw_600 ct_fs_20 mb-1">Room Ended</h4>
                                    <p className='mb-0 ct_text_op_6 ct_fs_14'>Gift hearts to your roommates</p>
                                </div>
                                {newArrayData?.length != 0 ? newArrayData?.map((item, i) => (
                                    <div className='form-group mb-3'>
                                        <div>
                                            <div className='d-flex align-items-center gap-2 justify-content-between mb-3'>
                                                <div>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <img src={item?.profile_image || "assets/img/dummy_user_img.png"} className='ct_img_30' />
                                                        <div>
                                                            <p className='mb-0 ct_fs_14'>{item?.full_name ?? ""}</p>
                                                            <div className='d-flex align-items-center gap-1'>
                                                                <i className="fa-solid fa-heart ct_yellow_text"></i>{item?.hearts ?? 0}
                                                                {item?.isHost && <span className='ct_host_badge '>{item?.isHost ? "HOST" : "GUEST"}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex align-items-center gap-2 mt-2'>
                                                        <Rating
                                                            onClick={(rate) => handleRating(rate, item, i)}
                                                            initialValue={item?.given_rating}
                                                            size={30}
                                                            transition
                                                            fillColor="gold"
                                                            emptyColor="gray"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center gap-3'>
                                                    {item?.send_request_status == "not_connected" &&
                                                        <i className="fa-solid fa-user-check"></i>
                                                    }
                                                    <div className="dropdown ct_right_dropdown ">
                                                        <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                                        </button>
                                                        <ul className="dropdown-menu ct_dropdown_left345" aria-labelledby="dropdownMenuButton1">
                                                            <li onClick={() => {
                                                                setIsReportuser(item)
                                                                setIsReport(true)
                                                                setIsBlock(false)
                                                            }}><a className="dropdown-item">Report User</a></li>
                                                            <li onClick={() => {
                                                                setIsBlockuser(item)
                                                                setIsReport(false)
                                                                setIsBlock(true)
                                                            }}><a className="dropdown-item">Block User</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label className="ct_fw_600  mb-2 d-block">Description</label>
                                                <textarea
                                                    className='form-control ct_input h-auto'
                                                    rows={3}
                                                    value={item?.message}
                                                    onChange={(e) => handleUserMessage(e.target.value, i)}
                                                    placeholder='Write some feedback'
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                    :
                                    <div className='py-3'>
                                        <p className='mb-0 ct_fs_16 ct_fw_600 text-center ct_text_op_6'>No Data Found</p>
                                    </div>
                                }
                                <div className='text-center mt-4'>
                                    {newArrayData?.length != 0 ?
                                        <button className='ct_yellow_btn px-5' onClick={!isLoader && handleSubmitFeedBack}>Submit</button>
                                        :
                                        <button className='ct_yellow_btn px-5' onClick={onClose}>Close</button>
                                    }
                                </div>
                            </div>
                            <div className={`mt-3 ${!isBlock && 'd-none'}`}>
                                <h4 className="ct_fw_600 ct_fs_20 mb-1 text-center">Are you sure you want to block this user?</h4>
                                <p className='mb-0 ct_text_op_6 ct_fs_14 text-center'>You and this user will no longer be able to join the same rooms, connect, or chat</p>
                                <div className='ct_outline_bg p-3 mx-auto ct_border_radius_10 text-center mt-3 ct_fit_content'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <img src={blockUser.profile_image ?? "assets/img/dummy_user_img.png"} className='ct_img_30' />
                                        <div>
                                            <p className='mb-0 ct_fs_14 text-start'>{blockUser?.full_name ?? ""}</p>
                                            <div className='d-flex align-items-center gap-1 justify-content-center'>
                                                <i className="fa-solid fa-heart ct_yellow_text"></i>
                                                <span className='ct_fs_12 ct_text_op_6 '>{blockUser?.hearts ?? 0} M ({blockUser?.age ?? 0} yrs)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center mt-4 d-flex align-items-center gap-3 justify-content-center'>
                                    <button className='ct_yellow_btn px-5' onClick={() => !isLoader && handleBlockUser(blockUser?.id)}>BLOCK USER</button>
                                    <button className='ct_outline_btn px-5' onClick={() => !isLoader && setIsBlock(false)}>Cancel</button>
                                </div>
                            </div>

                            <div className={`mt-0 ${!isReport && 'd-none'}`}>
                                <h4 className="ct_fw_600 ct_fs_20 mb-1 text-center">Report</h4>
                                <p className='mb-0 ct_text_op_6 ct_fs_14 text-center'>Describe why you want to report this user</p>
                                <ul className='mt-4 ct_report_list_1234'>
                                    {reportList?.map((item) => (
                                        <li className='d-flex align-items-center gap-2 justify-content-between py-2 ct_fs_14' onClick={() => handleReportUser(item?.id)
                                        }>
                                            <span>{item?.label ?? ""}</span>
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </li>
                                    ))}
                                </ul>
                                <div className='text-center mt-4 d-flex align-items-center gap-3 justify-content-center'>
                                    <button className='ct_outline_btn px-5' onClick={() => !isLoader && setIsReport(false)}>Cancel</button>
                                </div>
                            </div>
                            <div className={`mt-0 ${!isRoomFeedBack && "d-none"}`}>
                                <div className="mb-4 text-center">
                                    <h4 className="ct_fw_600 ct_fs_20 mb-1">Thank you for your feedback</h4>
                                    <p className='mb-0 ct_text_op_6 ct_fs_14'>How would you like to rate this conversation</p>
                                </div>
                                <div className='form-group mb-3'>
                                    <ul className='d-flex align-items-center gap-3 justify-content-center'>
                                        <li onClick={() => setRoomFeedBack('sad')} className='active'>
                                            <p className='mb-0 ct_smile_emoj_icon'> 😔</p>
                                        </li>
                                        <li onClick={() => setRoomFeedBack('ok')}>
                                            <p className='mb-0 ct_smile_emoj_icon'>😊</p>
                                        </li>
                                        <li onClick={() => setRoomFeedBack('happy')}>
                                            <p className='mb-0 ct_smile_emoj_icon'>🙂</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className='form-group mb-3'>
                                    <label className="ct_fw_600  mb-2 d-block">Feedback</label>
                                    <textarea
                                        className='form-control ct_input h-auto'
                                        rows={4}
                                        value={feedbackMessage}
                                        onChange={(e) => setFeedbackMessage(e.target.value)}
                                        placeholder='Please share  your feedback'
                                    ></textarea>
                                </div>
                                <div className='text-center mt-4'>
                                    <button type="button" className='ct_yellow_btn px-5' onClick={handleSendRoomFeedBack}>Submit</button>
                                </div>
                                <div className='mt-3 text-center' onClick={onClose}>
                                    <p className='mb-0'>Skip</p>
                                </div>
                            </div>
                            <div className={`${!isRefund && "d-none"}`}>
                                <div className={`mb-4`}>
                                    <h4 className='ct_fs_20 ct_fw_600 text-center'>
                                        Sorry to hear that
                                    </h4>
                                    <p className='mb-0 text-center ct_text_op_6'>Can you tell us what went wrong</p>
                                </div>
                                <form>
                                    <div className='form-group mb-3'>
                                        <label className='mb-2 d-block'>Feedback reason</label>
                                        <select className='form-control ct_input' value={selectReason} onChange={(e) => {
                                            setSelectReason(e.target.value)
                                        }}
                                        >
                                            <option>Select Options</option>
                                            {badFeedbackOptions?.map((item) => (
                                                <option value={item}>{item ?? ""}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className='mb-2 d-block'>Would you like to have a refund (50%)?</label>
                                        <div className='d-flex align-items-center gap-5'>
                                            <div className="form-check ct_custom_radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                    onClick={() => setWantRefund(true)}
                                                    checked={wantRefund}
                                                />
                                                <label
                                                    className="form-check-label ct_fs_14 ct_fw_500 ct_text_op_6"
                                                    for="flexRadioDefault1"
                                                >
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check ct_custom_radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    onClick={() => setWantRefund(false)}
                                                    id="flexRadioDefault1"
                                                    checked={!wantRefund}
                                                />
                                                <label
                                                    className="form-check-label ct_fs_14 ct_fw_500 ct_text_op_6"
                                                    for="flexRadioDefault1"
                                                >
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center gap-3 justify-content-center mt-4'>
                                        <button type="button" className='ct_outline_btn w-100' onClick={() => {
                                            setIsRefund(false)
                                            setIsRoomFeedBack(true);
                                        }}>Cancel</button>
                                        <button type="button" onClick={handleSubmitFinalReview} className='ct_yellow_btn w-100'>Confirm</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default SendFeedback;