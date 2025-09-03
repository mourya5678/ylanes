import React from 'react';
import Header from '../../components/Header';

const Notification = ({ messageApi }) => {
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="ct_fs_24 ct_fw_600 mb-4 ct_text_061F61">
                                Notifications
                            </h4>
                            <div
                                className="ct_light_black_bg d-flex align-items-center gap-3 mb-4 justify-content-between"
                            >
                                <p className="mb-0 ct_fw_600">All</p>
                                <p className="mb-0 ct_red_text">
                                    <i className="fa-solid fa-trash-can mw-2"></i> Delete All
                                </p>
                            </div>
                            <div className="">
                                <ul className="ct_notification_list ct_custom_scrollbar ct_pe_30">
                                    <li className='d-flex align-items-center gap-2 justify-content-between'>
                                        <div>
                                            <div>
                                                <h4 className="ct_fs_18 ct_text_061F61 ct_fw_600">
                                                    Someone wants to connect with you!
                                                </h4>
                                                <p className="mb-0 ct_text_4B5563 ct_fs_14">
                                                    jack invited you to connect 16 days ago
                                                </p>
                                            </div>
                                            <p className="mb-0 ct_text_4B5563 ct_fs_14"><i>16 days ago</i></p>
                                        </div>
                                        <div>
                                            <i class="fa-solid fa-trash-can mw-2 text-danger"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h4 className="ct_fs_18 ct_text_061F61 ct_fw_600">
                                                Someone wants to connect with you!
                                            </h4>
                                            <p className="mb-0 ct_text_4B5563 ct_fs_14">
                                                jack invited you to connect 16 days ago
                                            </p>
                                        </div>
                                        <p className="mb-0 ct_text_4B5563 ct_fs_14"><i>16 days ago</i></p>
                                    </li>
                                    <li>
                                        <div>
                                            <h4 className="ct_fs_18 ct_text_061F61 ct_fw_600">
                                                Someone wants to connect with you!
                                            </h4>
                                            <p className="mb-0 ct_text_4B5563 ct_fs_14">
                                                jack invited you to connect 16 days ago
                                            </p>
                                        </div>
                                        <p className="mb-0 ct_text_4B5563 ct_fs_14"><i>16 days ago</i></p>
                                    </li>
                                    <li>
                                        <div>
                                            <h4 className="ct_fs_18 ct_text_061F61 ct_fw_600">
                                                Someone wants to connect with you!
                                            </h4>
                                            <p className="mb-0 ct_text_4B5563 ct_fs_14">
                                                jack invited you to connect 16 days ago
                                            </p>
                                        </div>
                                        <p className="mb-0 ct_text_4B5563 ct_fs_14"><i>16 days ago</i></p>
                                    </li>
                                    <li>
                                        <div>
                                            <h4 className="ct_fs_18 ct_text_061F61 ct_fw_600">
                                                Someone wants to connect with you!
                                            </h4>
                                            <p className="mb-0 ct_text_4B5563 ct_fs_14">
                                                jack invited you to connect 16 days ago
                                            </p>
                                        </div>
                                        <p className="mb-0 ct_text_4B5563 ct_fs_14"><i>16 days ago</i></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Notification;