import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between align-items-center mb-4 ct_flex_col_767 gap-3">
                                <div className="position-relative ct_w_100_767">
                                    <div className="ct_search_input ct_w_100_767">
                                        <input type="search" className="form-control ct_input ct_border_radius_100" placeholder="Search" />
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <div className="ct_searchable_list d-none">
                                        <ul className="ct_custom_scroll">
                                            <li>
                                                <p className="mb-0 ct_fw_600">Topics</p>
                                                <p className="mb-0 ct_fw_600"><i className="fa-solid fa-angle-right"></i></p>
                                            </li>
                                            <li>
                                                <p className="mb-0 ct_fw_600">Profiles</p>
                                                <p className="mb-0 ct_fw_600"><i className="fa-solid fa-angle-right"></i></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex  align-items-center gap-2 ct_w_100_767">
                                    <button className="ct_outline_border ct_w_100_767"><img src="assets/img/wallet_icon.png" alt=""
                                        width="20px" />1495</button>
                                    <a className="ct_yellow_btn ct_w_100_767 text-center" onClick={() => navigate(pageRoutes.createRoom)}>Create Room</a>
                                </div>
                            </div>
                            <div className="ct_upload_post_box">
                                <form>
                                    <div className="ct_outline_border d-block ct_border_radius_15">
                                        <div className="d-flex align-items-center gap-3 justify-content-between">
                                            <input name="" id="" className="form-control ct_border_radius_10  ct_input border-0"
                                                placeholder="what is happning?"></input>
                                            <button className="ct_yellow_btn ct_text_op_6 ct_white_nowrap">Post</button>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 justify-content-between ct_border_top_1 pt-3 mt-3 d-none">
                                            <div className="d-flex align-items-center gap-3">
                                                <select className="form-control ct_input ct_border_radius_100 h-auto p-2 px-3 ct_w_fit_content">
                                                    <option value="">Select Topic</option>
                                                    <option value="">Business & startup</option>
                                                    <option value="">Finance & Economics</option>
                                                    <option value="">Geo - Politics</option>
                                                    <option value="">Family & Relationships</option>
                                                </select>
                                                <div>
                                                    <label for="ct_upload_file">
                                                        <input type="file" className="d-none" id="ct_upload_file" />
                                                        <i className="fa-solid fa-paperclip text-dark"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <button className="ct_yellow_btn ct_text_op_6 ct_white_nowrap">Post</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex align-items-center gap-3 justify-content-between mt-4">
                                <select className="form-control ct_input border-0 ct_w_fit_content px-0 ct_fw_600">
                                    <option value="">Topic</option>
                                    <option value="">Topic</option>
                                    <option value="">Topic</option>
                                </select>
                                <select className="form-control ct_input border-0 ct_w_fit_content px-0 ct_fw_600">
                                    <option value="">Latest</option>
                                    <option value="">Oldest</option>
                                    <option value="">Newest</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center gap-3 mt-2">
                                <label className="toggle-switch">
                                    <input type="checkbox" />
                                    <div className="toggle-switch-background">
                                        <div className="toggle-switch-handle"></div>
                                    </div>
                                </label>
                                <p className="mb-0">Conection Comments</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ct_uploaded_post_main mb-3">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                    <div className="ct_upload_user_name">
                                        <img src="assets/img/user.png" alt="" className="ct_img_40 ct_flex_shrink_0" />
                                        <p className="mb-0 ct_fw_600">John Doe</p>
                                        <span className="ct_text_op_6 ct_fs_14">24 days ago</span>
                                    </div>
                                    <div className="dropdown ct_post_setting_drop">
                                        <i className="fa-solid fa-ellipsis-vertical" type="button" data-bs-toggle="dropdown"
                                            aria-expanded="false"></i>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" data-bs-target="#ct_delete_modal"
                                                data-bs-toggle="modal">Delete</a></li>
                                            <li><a className="dropdown-item" data-bs-target="#ct_block_modal"
                                                data-bs-toggle="modal">Block</a></li>
                                            <li><a className="dropdown-item" data-bs-target="#ct_report_modal"
                                                data-bs-toggle="modal">Report</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="ct_para_scroll ct_custom_scroll mt-3">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, veniam non, ab nemo numquam
                                    obcaecati dolor quisquam nihil deserunt adipisci sit blanditiis reprehenderit deleniti ut saepe reiciendis
                                    praesentium dolorem voluptate.
                                </p>
                                <div className="owl-carousel owl-theme ct_uploaded_post_images mt-3">
                                    <div className="item">
                                        <div className="ct_post_img">
                                            <img src="assets/img/post_img.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="ct_like_comment_div">
                                    <ul>
                                        <li>
                                            <div className="ct_like_btn d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-thumbs-up"></i>
                                                <p className="mb-0 ct_fw_500  ">0</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ct_comment_bnt  d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-message"></i>
                                                <p className="mb-0 ct_fw_500 ">0</p>
                                            </div>
                                        </li>
                                        <li className="ct_book_mark_icon  ">
                                            <i className="fa-regular fa-share-from-square"></i>
                                        </li>
                                        <li className="ms-auto ct_text_op_6 ct_fs_14">
                                            #Geo Politics
                                        </li>
                                    </ul>
                                    <div className="ct_comment_area_main mt-4  ">
                                        <input type="text" className="form-control ct_input ct_custom_input w-100" placeholder="Write comment..." />
                                        <div className="ct_comment_area_scroll">
                                            <div className="d-flex justify-content-between gap-2 mt-3">
                                                <div>
                                                    <div>
                                                        <div className="d-flex  gap-3 ">
                                                            <img src="assets/img/user.png" alt="" className="ct_img_40 ct_bor ct_white_border_1" />
                                                            <div style={{ flex: "1" }}>
                                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                    <h5 className="ct_fs_15  ct_fw_600 mb-0">Bradford Bogisich</h5>
                                                                    <div className="d-flex align-items-center gap-3">

                                                                        <p className="mb-0  ct_fs_12  ct_text_op_5">2 days ago</p>
                                                                    </div>
                                                                </div>
                                                                <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-3"><span>Design
                                                                    Shot is an invitation to ponder cn design as a living entity. capture of embodying and
                                                                    influencing the flow of thoughts and sensations in</span>
                                                                </p>
                                                                <div className="mt-2 ">
                                                                    <a className="text-dark ct_fw_600 ct_fs_14">Reply</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 d-none ">
                                                            <input type="text" className="form-control ct_input h-auto py-2" placeholder="Reply" />
                                                            <div className="d-flex  gap-3 ps-4 pt-3">
                                                                <img src="assets/img/user.png" alt="" className="ct_img_40 ct_bor ct_white_border_1" />
                                                                <div style={{ flex: "1" }}>
                                                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                        <h5 className="ct_fs_15  ct_fw_600 mb-0">Bradford Bogisich</h5>
                                                                        <div className="d-flex align-items-center gap-3">

                                                                            <p className="mb-0  ct_fs_12  ct_text_op_5">2 days ago</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-3">
                                                                        <span>Design Shot is an invitation to ponder cn design as a living entity. capture of
                                                                            embodying and
                                                                            influencing the flow of thoughts and sensations in</span>
                                                                    </p>
                                                                    <div className="mt-2 ">
                                                                        <a className="text-dark ct_fw_600 ct_fs_14">Reply</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="mb-0 ct_fw_500 ct_white_nowrap ct_yellow_text" data-bs-target="#ct_report_modal"
                                                        data-bs-toggle="modal">Report</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ct_uploaded_post_main mb-3">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                    <div className="ct_upload_user_name">
                                        <img src="assets/img/user.png" alt="" className="ct_img_40 ct_flex_shrink_0" />
                                        <p className="mb-0 ct_fw_600">John Doe</p>
                                        <span className="ct_text_op_6 ct_fs_14">24 days ago</span>
                                    </div>
                                    <div className="dropdown ct_post_setting_drop">
                                        <i className="fa-solid fa-ellipsis-vertical" type="button" data-bs-toggle="dropdown"
                                            aria-expanded="false"></i>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" data-bs-target="#ct_delete_modal"
                                                data-bs-toggle="modal">Delete</a></li>
                                            <li><a className="dropdown-item" data-bs-target="#ct_block_modal"
                                                data-bs-toggle="modal">Block</a></li>
                                            <li><a className="dropdown-item" data-bs-target="#ct_report_modal"
                                                data-bs-toggle="modal">Report</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="ct_para_scroll ct_custom_scroll mt-3">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, veniam non, ab nemo numquam
                                    obcaecati dolor quisquam nihil deserunt adipisci sit blanditiis reprehenderit deleniti ut saepe reiciendis
                                    praesentium dolorem voluptate.
                                </p>
                                <div className="ct_like_comment_div">
                                    <ul>
                                        <li>
                                            <div className="ct_like_btn d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-thumbs-up"></i>
                                                <p className="mb-0 ct_fw_500  ">0</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ct_comment_bnt  d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-message"></i>
                                                <p className="mb-0 ct_fw_500 ">0</p>
                                            </div>
                                        </li>
                                        <li className="ct_book_mark_icon  ">
                                            <i className="fa-regular fa-share-from-square"></i>
                                        </li>
                                        <li className="ms-auto ct_text_op_6 ct_fs_14">
                                            #Geo Politics
                                        </li>
                                    </ul>
                                    <div className="ct_comment_area_main mt-4  ">
                                        <input type="text" className="form-control ct_input ct_custom_input w-100" placeholder="Write comment..." />
                                        <div className="ct_comment_area_scroll">
                                            <div className="d-flex justify-content-between gap-2 mt-3">
                                                <div>
                                                    <div>
                                                        <div className="d-flex  gap-3 ">
                                                            <img src="assets/img/user.png" alt="" className="ct_img_40 ct_bor ct_white_border_1" />
                                                            <div style={{ flex: "1" }}>
                                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                    <h5 className="ct_fs_15  ct_fw_600 mb-0">Bradford Bogisich</h5>
                                                                    <div className="d-flex align-items-center gap-3">

                                                                        <p className="mb-0  ct_fs_12  ct_text_op_5">2 days ago</p>
                                                                    </div>
                                                                </div>
                                                                <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-3"><span>Design
                                                                    Shot is an invitation to ponder cn design as a living entity. capture of embodying and
                                                                    influencing the flow of thoughts and sensations in</span>
                                                                </p>
                                                                <div className="mt-2 ">
                                                                    <a className="text-dark ct_fw_600 ct_fs_14">Reply</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 d-none ">
                                                            <input type="text" className="form-control ct_input h-auto py-2" placeholder="Reply" />
                                                            <div className="d-flex  gap-3 ps-4 pt-3">
                                                                <img src="assets/img/user.png" alt="" className="ct_img_40 ct_bor ct_white_border_1" />
                                                                <div style={{ flex: "1" }}>
                                                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                        <h5 className="ct_fs_15  ct_fw_600 mb-0">Bradford Bogisich</h5>
                                                                        <div className="d-flex align-items-center gap-3">

                                                                            <p className="mb-0  ct_fs_12  ct_text_op_5">2 days ago</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="ct_fs_13 mb-0  ct_ff_roboto ct_line_height_22 ct_commented_text mt-3">
                                                                        <span>Design Shot is an invitation to ponder cn design as a living entity. capture of
                                                                            embodying and
                                                                            influencing the flow of thoughts and sensations in</span>
                                                                    </p>
                                                                    <div className="mt-2 ">
                                                                        <a className="text-dark ct_fw_600 ct_fs_14">Reply</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="mb-0 ct_fw_500 ct_white_nowrap ct_yellow_text" data-bs-target="#ct_report_modal"
                                                        data-bs-toggle="modal">Report</p>
                                                </div>
                                            </div>
                                        </div>
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

export default Home;