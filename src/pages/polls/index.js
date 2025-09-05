import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { pipGetAccessToken } from '../../auth/Pip';
import { createPollData } from '../../redux/actions/createRoom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { CreatePollSchema } from '../../auth/Schema';

const Polls = ({ messageApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({});
    const [isShowForm, setIsShowForm] = useState(false);

    const initialValues = {
        question: "",
        option1: "",
        option2: "",
        topic: "",
        duration: ""
    };

    useEffect(() => {
        const data = pipGetAccessToken("user_data");
        setUserData(data);
    }, []);

    const handleCreatePoll = (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            // dispatch();
        };
        let formData = new FormData();

        dispatch(createPollData({ payload: formData, messageApi, callback }))
    };

    return (
        <div>
            <Header />
            <section class="ct_py_70">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="d-flex justify-content-between align-items-center mb-4 ct_flex_col_767 gap-3">
                                <div class="position-relative ct_w_100_767">
                                    <div class="ct_search_input ct_w_100_767">
                                        <input type="search" class="form-control ct_input ct_border_radius_100" placeholder="Search" />
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <div class="ct_searchable_list d-none">
                                        <ul class="ct_custom_scroll">
                                            <li>
                                                <p class="mb-0 ct_fw_600">Topics</p>
                                                <p class="mb-0 ct_fw_600"><i class="fa-solid fa-angle-right"></i></p>
                                            </li>
                                            <li>
                                                <p class="mb-0 ct_fw_600">Profiles</p>
                                                <p class="mb-0 ct_fw_600"><i class="fa-solid fa-angle-right"></i></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="d-flex  align-items-center gap-2 ct_w_100_767">
                                    <a onClick={() => navigate(pageRoutes.userWallet)} class="ct_outline_border ct_w_100_767 text-dark"><img
                                        src="assets/img/wallet_icon.png" alt="" width="20px" />{userData?.attributes?.ycoins ?? 0}</a>
                                    <a onClick={() => navigate(pageRoutes.createRoom)} class="ct_yellow_btn ct_w_100_767 text-center">Create Room</a>
                                </div>
                            </div>

                            <div class="ct_upload_post_box">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={CreatePollSchema}
                                    onSubmit={(values, actions) =>
                                        handleCreatePoll(values, actions)
                                    }
                                >

                                </Formik>
                                <form>
                                    <div class="ct_outline_border d-block ct_border_radius_15">
                                        <div className='row'>
                                            <div class="col-md-12 mb-3">
                                                <div class="d-flex align-items-center gap-3 justify-content-between">
                                                    {
                                                        !isShowForm &&
                                                        <>
                                                            <input name="" onClick={() => setIsShowForm(true)} id="" class="form-control ct_border_radius_10  ct_input border-0" placeholder="create a poll" readOnly />
                                                            <button onClick={() => setIsShowForm(true)} type="button" class="ct_yellow_btn ct_text_op_6 ct_white_nowrap">Post</button>
                                                        </>
                                                    }
                                                    {/* {isShowForm &&
                                                        <div className='ct_cursor_pointer ct_fs_20 ct_text_op_6 ms-auto' onClick={() => setIsShowForm(false)}>
                                                            <i class="fa-solid fa-circle-xmark"></i>
                                                        </div>
                                                    } */}
                                                </div>
                                            </div>
                                        </div>
                                        {isShowForm &&
                                            <div className=''>
                                                <div class="row">
                                                    <div class="form-group">
                                                        <div className='d-flex align-items-center gap-2 justify-content-between mb-2'>
                                                            <label for="" class=" ct_fw_600">Type Your Question</label>
                                                            <div className='ct_cursor_pointer ct_fs_20 ct_text_op_6 ms-auto' onClick={() => setIsShowForm(false)}>
                                                                <i class="fa-solid fa-circle-xmark"></i>
                                                            </div>
                                                        </div>
                                                        <input type="text" class="form-control ct_input" placeholder="Enter Your Question" />
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <div class="form-group">
                                                            <label for="" class="mb-2 ct_fw_600">Choose 1</label>
                                                            <input type="text" class="form-control ct_input" placeholder="Enter option" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <div class="form-group">
                                                            <label for="" class="mb-2 ct_fw_600">Choose 2</label>
                                                            <input type="text" class="form-control ct_input" placeholder="Enter option" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 mb-3">
                                                        <div class="form-group">
                                                            <label for="" class="mb-2 ct_fw_600">Add Another Option</label>
                                                            <input type="text" class="form-control ct_input" placeholder="Enter another option" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label for="" class="mb-2 ct_fw_600">Duration</label>
                                                        <div class="row">
                                                            <div class="col-md-6 mb-3">
                                                                <div class="form-group">

                                                                    <select class="form-control ct_input">
                                                                        <option value="">1 Hours</option>
                                                                        <option value="">2 Hours</option>
                                                                        <option value="">3 Hours</option>
                                                                        <option value="">1 Hours</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 mb-3">
                                                                <div class="form-group">
                                                                    <select class="form-control ct_input">
                                                                        <option value="">1 Minutes</option>
                                                                        <option value="">2 Minutes</option>
                                                                        <option value="">3 Minutes</option>
                                                                        <option value="">1 Minutes</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex  align-items-center mt-2">
                                                        <div class="form-check ct_custom_check2">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        </div>
                                                        <label for=""><span class="ct_text_op_6">Allow multiple responses</span></label>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center gap-3 justify-content-between ct_flex_col_575 ct_border_top_1 pt-3 mt-3 ">
                                                    <div class="d-flex align-items-center gap-3 ct_w_100_575">
                                                        <select class="form-control ct_input ct_w_100_575 ct_border_radius_100 h-auto p-2 px-3 ct_w_fit_content">
                                                            <option value="">Select Topic</option>
                                                            <option value="">Business & startup</option>
                                                            <option value="">Finance & Economics</option>
                                                            <option value="">Geo - Politics</option>
                                                            <option value="">Family & Relationships</option>
                                                        </select>
                                                        <div>
                                                            <label for="ct_upload_file">
                                                                <input type="file" class="d-none" id="ct_upload_file" />
                                                                <i class="fa-solid fa-paperclip text-dark"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <button class="ct_yellow_btn ct_text_op_6 ct_white_nowrap ct_w_100_575">Create Poll</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </form>
                            </div>
                            <div class="d-flex align-items-center gap-3 justify-content-between mt-4">
                                <select class="form-control ct_input border-0 ct_w_fit_content px-0 ct_fw_600">
                                    <option value="">Topic</option>
                                    <option value="">Topic</option>
                                    <option value="">Topic</option>
                                </select>
                                <select class="form-control ct_input border-0 ct_w_fit_content px-0 ct_fw_600">
                                    <option value="">Latest</option>
                                    <option value="">Oldest</option>
                                    <option value="">Newest</option>
                                </select>
                            </div>
                            <div class="d-flex align-items-center gap-3 mt-2">
                                <label class="toggle-switch">
                                    <input type="checkbox" />
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                                <p class="mb-0">Conection Comments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Polls;