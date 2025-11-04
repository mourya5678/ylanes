import React from 'react';
import { pipGetAccessToken } from '../../auth/Pip';

const ReferCode = ({ onClose, messageApi }) => {
    const userData = pipGetAccessToken("user_data");

    const handleCopy = () => {
        const text = `${userData?.attributes?.full_name ?? ""} has invited you to join YLanes an exclusive club for Wise, Witty & Curious MEN. use this Referral Code to earn extra welcome bonus.See you in the YLanes.
Click here to join: https://ylanes.com 
Referral Code: ${userData?.attributes?.referral_code ?? ""}`;
        if (text.trim() !== "") {
            navigator.clipboard.writeText(text);
            messageApi.success("Copied to clipboard!");
        } else {
            messageApi.error("Input is empty!");
        };
    };

    return (
        <div className="modal show d-block ct_congratulation_modal_fade ct_modal_w_700" tabIndex="-1">
            <div className="ct_modal-dialog  modal-dialog-centered  justify-content-center">
                <div className='ct_copy_modal position-relative'>
                    <div className="modal-header border-0 pt-0 pb-2">
                        <button onClick={onClose} type="button" className="btn-close ct_position_close"></button>
                    </div>
                    <div className='mt-0'>
                        <div className='form-group mb-3'>
                            <div className='d-flex align-items-center gap-2 justify-content-between mb-2'>
                                <label className="ct_fw_600">ReferCode</label>
                            </div>
                            <div className='position-relative'>
                                <input type='text' value={userData?.attributes?.referral_code ?? ''} className='form-control ct_input ps-5' style={{ paddingRight: "110px" }} readOnly />
                                <i className='ct_input_icon_left'><i className="fa-solid fa-link"></i></i>
                                <button className='ct_yellow_btn ct_show_eye mt-0 position-absolute right-0 ct_copy_btn' onClick={handleCopy}>Copy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ReferCode;