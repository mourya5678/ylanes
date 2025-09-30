import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SHARE_BASE_URL } from '../../routes/BackendRoutes';
import { pipGetAccessToken } from '../../auth/Pip';
import { sendMessageToUser } from '../../redux/actions/createRoom';

const SharePostModal = ({ shareCode, messageApi, onClose }) => {
    const { allConnections } = useSelector((state) => state.createRoomReducer);
    const dispatch = useDispatch();

    const [isListShow, setIsListShow] = useState(false);
    const [isShowLoader, setIsShowLoader] = useState(false);

    const handleMessageSend = (val) => {
        setIsShowLoader(true);
        const userData = pipGetAccessToken("user_data");
        const body = {
            to: val?.attributes?.firebase_uid,
            message: `${SHARE_BASE_URL}post-details?${shareCode?.id}`,
            phone_number: userData?.attributes?.phone_number,
            unique_auth_id: userData?.attributes?.firebase_uid,
        };
        const callback = (response) => {
            setIsShowLoader(false);
            if (response?.status == 200) {
                messageApi?.success("Post share successFully!");
            } else {
                messageApi.error("Unable to share post! please try again.");
            };
        };
        dispatch(sendMessageToUser({ payload: body, messageApi, callback }));
    };

    const handleCopy = () => {
        const text = `${SHARE_BASE_URL}post-details?${shareCode?.id}`;
        if (text.trim() !== "") {
            navigator.clipboard.writeText(text);
            messageApi.success("Copied to clipboard!");
        } else {
            messageApi.error("Input is empty!");
        }
    };

    return (
        <div className="modal show d-block ct_congratulation_modal_fade ct_modal_w_700" tabIndex="-1">
            <div className="ct_modal-dialog  modal-dialog-centered  justify-content-center">
                <div className='ct_copy_modal'>
                    <div className="modal-header border-0 pt-0 pb-2">
                        <button onClick={onClose} type="button" className="btn-close"></button>
                    </div>
                    <div className={`${isListShow ? "d-none" : ""}`}>
                        <div className='form-group mb-3'>
                            <div className='position-relative'>
                                <input type='text' value={`${SHARE_BASE_URL}post-details?${shareCode?.id}`} className='form-control ct_input ps-5' style={{ paddingRight: "110px" }} readOnly />
                                <i className='ct_input_icon_left'><i class="fa-solid fa-link"></i></i>
                                <button className='ct_yellow_btn ct_show_eye mt-0 position-absolute right-0 ct_copy_btn' onClick={handleCopy}>Copy</button>
                            </div>
                        </div>
                        <p className='mb-0 text-center'>Or</p>
                        <div className='text-center mt-3'>
                            <button className='ct_yellow_btn px-5 mx-auto  mt-0' onClick={() => setIsListShow(true)}>Share By</button>
                        </div>
                    </div>
                    <div className={`${!isListShow ? "d-none" : ""}`}>
                        {isShowLoader ?
                            <div>
                                ...Loader
                            </div>
                            :
                            allConnections?.length != 0 ?
                                <ul className='ct_share_user_list ct_para_scroll ct_custom_scroll'>
                                    {allConnections?.map((item) => (
                                        <li>
                                            <div className='d-flex align-items-center gap-2 justify-content-between pe-3'>
                                                <div className='d-flex align-items-center gap-3 '>
                                                    <img src={item?.attributes?.profile_image ? item?.attributes?.profile_image : "/assets/img/dummy_user_img.png"} className='ct_img_30_small ct_flex_shrink_0' />
                                                    <h5 className='mb-0 ct_fs_16'>{item?.attributes?.full_name ?? ""}</h5></div>
                                                <button className='ct_yellow_btn py-1 px-3 ct_fs_14' onClick={() => handleMessageSend(item)}>Share</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                : "No connection found"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SharePostModal;