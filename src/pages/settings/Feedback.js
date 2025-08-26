import React from 'react';
import Header from '../../components/Header';

const Feedback = () => {

    return (
        <div>
            <Header />
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
                                        <textarea className="form-control ct_input h-auto" rows="4" placeholder="Type in your feedback" />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <p className="mb-0 ct_text_op_6">If you still wish to connect with us, email us at </p>
                                        <h6 className="mb-0">support@YLanes.com</h6>
                                    </div>
                                    <div className="text-center mt-5">
                                        <button className="ct_yellow_btn px-5">Send</button>
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