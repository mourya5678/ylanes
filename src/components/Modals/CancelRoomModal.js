import React from 'react';

const CancelRoomModal = ({ onClose, handleRoomCancel }) => {
    return (
        <div className="modal d-block ct_congratulation_modal_fade" tabIndex="-1">
            <div className="ct_modal-dialog modal-dialog-centered pt-4" style={{ maxWidth: "100%" }}>
                <div className="ct_room_ragister_modal ct_white_bg p-4 pt-2 pe-2 " style={{ maxWidth: "500px" }}>
                    <div className="d-flex align-items-center gap-2 justify-content-end mb-0 ">

                        <button
                            type="button"
                            class="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <h4 className="ct_fs_20 mb-0 ct_fw_600 text-center mt-3">Are you sure are you want to cancel room</h4>
                    <div className="text-center mt-4 d-flex align-items-center gap-2 justify-content-center">
                        <button type="button" onClick={onClose} className=" px-5 ct_outline_btn  mb-2">No</button>
                        <button type="button" onClick={handleRoomCancel} className="ct_yellow_btn px-5">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CancelRoomModal;