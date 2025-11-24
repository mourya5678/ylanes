import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getFaqData } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';

const Faq = ({ messageApi }) => {
    const { isLoading, faqList } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState(0);

    useEffect(() => {
        dispatch(getFaqData({ messageApi }));
    }, []);


    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between  gap-3 mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    FAQ
                                </h4>
                            </div>
                            <div className="ct_how_works_collapse">
                                <div className="accordion" id="ct_how_works_accordion">
                                    {faqList?.map((item, i) => (
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id={`ct_works_one${i + 1}`}>
                                                <button className={`accordion-button ${isShow != i && "collapsed"}`} type="button" data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse_works_one${i + 1}`} aria-expanded="true"
                                                    aria-controls={`collapse_works_one${i + 1}`}>
                                                    {item?.question ?? ""}
                                                </button>
                                            </h2>
                                            <div id={`collapse_works_one${i + 1}`} className={`accordion-collapse collapse ${isShow == i && "show"}`}
                                                aria-labelledby={`ct_works_one${i + 1}`} data-bs-parent="#ct_how_works_accordion">
                                                <div className="accordion-body" dangerouslySetInnerHTML={{ __html: item?.answer }}>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
};

export default Faq;