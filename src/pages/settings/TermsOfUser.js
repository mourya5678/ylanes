import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getTermsConditionData } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';

const TermsOfUser = ({ messageApi }) => {
    const { isLoading, TermsAndConditions } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTermsConditionData({ messageApi }));
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
                                    Terms & Conditions
                                </h4>
                            </div>
                            <div className="terms-conditions" dangerouslySetInnerHTML={{ __html: TermsAndConditions?.description }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default TermsOfUser;