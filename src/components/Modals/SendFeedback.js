import React from 'react';

const SendFeedback = ({ onClose }) => {
    return (
        <div className="modal show d-block ct_congratulation_modal_fade ct_modal_w_700" tabIndex="-1">
            <div className="ct_modal-dialog  modal-dialog-centered  justify-content-center">
                <div className='ct_copy_modal position-relative'>
                    <div className="modal-header border-0 pt-0 pb-2">
                        <button onClick={onClose} type="button" className="btn-close ct_position_close"></button>
                    </div>
                    <div className='mt-0'>
                        <div className="mb-4">
                            <h4 className="ct_fw_600 ct_fs_20 mb-1">Room Ended</h4>
                            <p className='mb-0 ct_text_op_6 ct_fs_14'>Gift hearts to your roommates</p>
                        </div>
                        <div className='form-group mb-3'>
                            <div className='d-flex align-items-center gap-2 justify-content-between mb-2'>
                                <div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <img src='/assets/img/user.png' className='ct_img_30' />
                                        <div>
                                            <p className='mb-0 ct_fs_14'>Mark</p>
                                            <div className='d-flex align-items-center gap-1'>
                                                <i className="fa-solid fa-heart ct_yellow_text"></i>
                                                <span className='ct_host_badge '>HOST</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center gap-2 mt-2'>
                                        <i className="fa-solid fa-heart ct_yellow_text"></i>
                                        <i className="fa-solid fa-heart ct_yellow_text"></i>
                                        <i className="fa-solid fa-heart ct_yellow_text"></i>
                                        <i className="fa-solid fa-heart ct_yellow_text"></i>
                                        <i className="fa-solid fa-heart ct_yellow_text"></i>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-3'>
                                    <i className="fa-solid fa-user-check"></i>

                                    <div className="dropdown ct_right_dropdown ">
                                        <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu ct_dropdown_left345" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="#">Report User</a></li>
                                            <li><a className="dropdown-item" href="#">Block User</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='form-group mb-3'>
                            <label className="ct_fw_600  mb-2 d-block">Description</label>
                            <textarea className='form-control ct_input h-auto' rows={4} placeholder='Write some feedback'></textarea>
                        </div>

                        <div className='text-center mt-4'>
                            <button className='ct_yellow_btn px-5'>Submit</button>
                        </div>
                    </div>
                    {/* second screen */}
                    <div className='mt-3 d-none'>
                        <h4 className="ct_fw_600 ct_fs_20 mb-1 text-center">Are you sure you want to disconnect with this user?</h4>
                        <p className='mb-0 ct_text_op_6 ct_fs_14 text-center'>you will no longer be able to chat or see rooms they will attend, unless you  are also registered for that room.</p>

                        <div className='ct_outline_bg p-3 mx-auto ct_border_radius_10 text-center mt-3 ct_fit_content'>
                            <div className='d-flex align-items-center gap-2'>
                                <img src='/assets/img/user.png' className='ct_img_30' />
                                <div>
                                    <p className='mb-0 ct_fs_14 text-start'>Mark</p>
                                    <div className='d-flex align-items-center gap-1 justify-content-center'>
                                        <i className="fa-solid fa-heart ct_yellow_text"></i>
                                        <span className='ct_fs_12 ct_text_op_6 '>10 M (18-24 yrs)</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='text-center mt-4 d-flex align-items-center gap-3 justify-content-center'>
                            <button className='ct_yellow_btn px-5'>Disconnect</button>
                            <button className='ct_outline_btn px-5'>Cancel</button>
                        </div>
                    </div>

                    {/* third screen  */}
                    <div className='mt-0 d-none '>
                        <h4 className="ct_fw_600 ct_fs_20 mb-1 text-center">Report</h4>
                        <p className='mb-0 ct_text_op_6 ct_fs_14 text-center'>Describe why you want to report this user</p>

                        <ul className='mt-4 ct_report_list_1234'>
                            <li className='d-flex align-items-center gap-2 justify-content-between py-2 ct_fs_14'>
                                <span>Offensive language or gesture</span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                            <li className='d-flex align-items-center gap-2 justify-content-between py-2 ct_fs_14  '>
                                <span>Arguing / debating / ridiculing</span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                            <li className='d-flex align-items-center gap-2 justify-content-between py-2 ct_fs_14  '>
                                <span>harassing / bullying</span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                            <li className='d-flex align-items-center gap-2 justify-content-between py-2 ct_fs_14  '>
                                <span>Curious onlooker with no relevance to the topic</span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                        </ul>
                    </div>

                    {/* fourth screen  */}

                    <div className='mt-0 d-none'>
                        <div className="mb-4 text-center">
                            <h4 className="ct_fw_600 ct_fs_20 mb-1">Thank you for your feedback</h4>
                            <p className='mb-0 ct_text_op_6 ct_fs_14'>How would you like to rate this conversation</p>
                        </div>
                        <div className='form-group mb-3'>
                            <ul className='d-flex align-items-center gap-3 justify-content-center'>
                                <li>
                                    <p className='mb-0 ct_smile_emoj_icon'> 😔</p>
                                </li>
                                <li>
                                    <p className='mb-0 ct_smile_emoj_icon'>😊</p>
                                </li>
                                <li>
                                    <p className='mb-0 ct_smile_emoj_icon'>🙂</p>
                                </li>
                            </ul>

                        </div>
                        <div className='form-group mb-3'>
                            <label className="ct_fw_600  mb-2 d-block">Feedback</label>
                            <textarea className='form-control ct_input h-auto' rows={4} placeholder='Please share  your feedback'></textarea>
                        </div>

                        <div className='text-center mt-4'>
                            <button className='ct_yellow_btn px-5'>Submit</button>
                        </div>
                        <div className='mt-3 text-center'>
                            <p className='mb-0'>Skip</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SendFeedback;