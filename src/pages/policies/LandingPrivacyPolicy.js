import React, { useEffect } from 'react';
import LandingHeader from '../../components/LandingPageHeader';
import LandingPageFooter from '../../components/LandingPageFooter';
import { useDispatch, useSelector } from 'react-redux';
import { getLandingPolicyDetails } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';

const LandingPrivacyPolicy = ({ messageApi }) => {
    const { isLoading, landingPolicy } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLandingPolicyDetails({ messageApi }));
    }, []);

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <LandingHeader />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between  gap-3 mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Privacy Policy
                                </h4>
                            </div>
                            <div className="terms-conditions" dangerouslySetInnerHTML={{ __html: landingPolicy?.description ?? "<p> </p>" }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LandingPageFooter />
        </div>
    )
};

export default LandingPrivacyPolicy;