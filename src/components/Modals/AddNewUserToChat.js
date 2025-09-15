import React from 'react';
import { IMAGE_URL } from '../../routes/BackendRoutes';

const AddNewUserToChat = ({ onClose, displayUser }) => {
    return (
        <div className="modal show d-block ct_congratulation_modal_fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content py-4">
                    <div className="modal-header border-0 pt-0 pb-2">
                        <h1 className="modal-title ct_fs_20 ct_fw_600" id="ct_view_userLabel">New Chat</h1>
                        <button onClick={onClose} type="button" className="btn-close"></button>
                    </div>
                    <p className="px-3">Select the connection to start a chat with</p>
                    <div className="modal-body">
                        <form>
                            <div className="ct_search_input">
                                <input type="search" className="form-control ct_input ct_border_radius_100"
                                    placeholder="Search" />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <ul className="ct_chat_new_member_list ct_custom_scroll">
                                {displayUser?.length != 0 &&
                                    displayUser?.map((item) => (
                                        <li>
                                            <div className="d-flex align-items-center gap-2">
                                                <img src={item?.attributes?.profile_image ? IMAGE_URL + item?.attributes?.profile_image : "assets/img/dummy_user_img.png"} alt="" className="ct_img_40" />
                                                <p className="mb-0">{item?.attributes?.full_name ?? ""}</p>
                                            </div>
                                            <button type="button" className="ct_yellow_btn">+ Invite</button>
                                        </li>
                                    ))}
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewUserToChat;