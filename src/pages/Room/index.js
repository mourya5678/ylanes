import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { pageRoutes } from '../../routes/PageRoutes';
import { getUpcommingRoomData } from '../../redux/actions/createRoom';

const MyRoom = ({ messageApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUpcommingRoomData({ messageApi }));
    }, []);

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
                                    <a onClick={() => navigate(pageRoutes.userWallet)} className="ct_outline_border ct_w_100_767 text-dark"><img src="assets/img/wallet_icon.png" alt="" width="20px" />1495</a>
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
                                            className="nav-link active"
                                            id="pills-public-info-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-public-info"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-public-info"
                                            aria-selected="true"
                                        >
                                            Public Info
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-persional_info-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-persional_info"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-persional_info"
                                            aria-selected="false"
                                            tabindex="-1"
                                        >
                                            Personal Info
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-resources-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-resources"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-resources"
                                            aria-selected="false"
                                            tabindex="-1"
                                        >
                                            Upcomming Video Call Rooms
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-past_rooms-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-past_rooms"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-past_rooms"
                                            aria-selected="false"
                                            tabindex="-1"
                                        >
                                            Past Rooms
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div
                                        className="tab-pane fade active show"
                                        id="pills-public-info"
                                        role="tabpanel"
                                        aria-labelledby="pills-public-info-tab"
                                    >
                                        <ul>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-persional_info"
                                        role="tabpanel"
                                        aria-labelledby="pills-persional_info-tab"
                                    >
                                        <ul>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-resources"
                                        role="tabpanel"
                                        aria-labelledby="pills-resources-tab"
                                    >
                                        <ul>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-past_rooms"
                                        role="tabpanel"
                                        aria-labelledby="pills-past_rooms-tab"
                                    >
                                        <ul>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="ct_white_bg">
                                                    <div>
                                                        <h4 className="ct_fs_20 ct_0fw_600">Finance & Economics</h4>
                                                        <small className="text-end d-block">Standard</small>
                                                    </div>
                                                    <div className="ct_border_top_1 pt-3 mt-3">
                                                        <p className="mb-0"> <i className="fa-regular fa-clock me-2"></i>Fri,8 Aug 06:30 PM</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default MyRoom;