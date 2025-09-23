import React from 'react';

const RoomRegisterModal = ({ onClose }) => {
    return (
        <div
            className="modal  d-block ct_congratulation_modal_fade"
            tabIndex="-1"
        >
            <div
                className="ct_modal-dialog modal-dialog-centered"
                style={{ maxWidth: "100%" }}
            >
                <div className="ct_room_ragister_modal ct_white_bg p-4 ">
                    <div className="d-flex align-items-center gap-2 justify-content-between mb-4 ">
                        <h4 className="ct_fs_20 mb-0 ct_fw_600">Register for Room</h4>

                        <button
                            type="button"
                            class="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                        <h6 className="mb-0 ct_fw_600">
                            Price : <span className="ct_yellow_text">300 YCoins</span>
                        </h6>
                        <a class="ct_outline_border ct_w_100_767 text-dark">
                            <img alt="" width="20px" src="assets/img/wallet_icon.png" />
                            205890
                        </a>
                    </div>
                    <form>
                        <div className="form-group mb-3">
                            <lable class=" ct_fw_600 text-start mb-2 d-block">
                                Your Take
                            </lable>
                            <textarea
                                className="form-control ct_input h-auto"
                                rows="4"
                                placeholder="Please share what you will be bringing to this conversation a subtopic, experience, question, perspective, some ideas, etc. You can also share any relevant resources such as YouTube links, websites, Instagram / Pinterest pages, etc. using the link below"
                            ></textarea>
                        </div>
                        <div class="d-flex align-items-center gap-3 ct_cursor mb-3">
                            <label for="ct_upload_file">
                                <i class="fa-solid fa-paperclip text-dark"></i>
                            </label>
                            <p class="mb-0">Add Resources</p>
                        </div>
                        <div class="d-flex align-items-center mb-3 ">
                            <div class="form-check ct_custom_check2">
                                <input
                                    class="form-check-input ct_cursor"
                                    id="flexCheckDefault"
                                    type="checkbox"
                                    value=""
                                />
                            </div>
                            <p class="mb-0">JOIN ANONYMOUSLY</p>
                        </div>
                        <p className="d-block mb-0 ct_fs_14  ct_text_op_6">
                            All calls are scheduled for 1 hour and extendable to 2 hours at
                            no extra cost.
                        </p>

                        <div className="text-center mt-4">
                            <button className="ct_yellow_btn px-5">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RoomRegisterModal;