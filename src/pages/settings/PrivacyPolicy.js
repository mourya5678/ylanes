import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { getPrivacyPolicyData } from '../../redux/actions/authActions';

const PrivacyPolicy = ({ messageApi }) => {
    const { isLoading, PrivacyPolicy } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrivacyPolicyData({ messageApi }));
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
                                    Privacy Policy
                                </h4>
                            </div>
                            <div className="terms-conditions" dangerouslySetInnerHTML={{ __html: PrivacyPolicy?.description }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default PrivacyPolicy;