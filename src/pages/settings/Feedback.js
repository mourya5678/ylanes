import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { provideFeedBackData } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const Feedback = ({ messageApi }) => {
    const { isLoading } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [feedBackData, setFeedBackData] = useState();

    const handleSendFeedBack = () => {
        const callback = (response) => {
            console.log(response);
            messageApi.success("Feedback submitted successfully!")
            setFeedBackData();
            navigate(pageRoutes.setting);
        };
        const raw = {
            feedback: feedBackData?.trim()
        };
        if (feedBackData && feedBackData.trim() !== "") {
            dispatch(provideFeedBackData({ payload: raw, callback, messageApi }));
        } else {
            messageApi.error("Invalid feedback: cannot be empty or contain spaces");
        }
    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="ct_white_bg p-5">
                            <div className="col-md-12 mx-auto">
                                <div className="d-flex align-items-center justify-content-between  gap-3 mb-4">
                                    <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                        Provide Feedback
                                    </h4>
                                </div>
                                <form>
                                    <div className="form-group mb-4">
                                        <label className="mb-2">We would love to hear  from you</label>
                                        <textarea
                                            rows="4"
                                            value={feedBackData}
                                            onChange={(e) => setFeedBackData(e.target.value)}
                                            className="form-control ct_input h-auto"
                                            placeholder="Type in your feedback"
                                        />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <p className="mb-0 ct_text_op_6">If you still wish to connect with us, email us at </p>
                                        <h6 className="mb-0">support@YLanes.com</h6>
                                    </div>
                                    <div className="text-center mt-5">
                                        <button type='button' className="ct_yellow_btn px-5" onClick={handleSendFeedBack}>Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Feedback;