import React, { useEffect } from 'react';
import LandingPageFooter from '../../components/LandingPageFooter';
import LandingHeader from '../../components/LandingPageHeader';
import { getLandingTermOfUseDetails } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const TermsOfUse = ({ messageApi }) => {
    const { isLoading, landingTerm } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLandingTermOfUseDetails({ messageApi }));
    }, []);

    console.log({ landingTerm })
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
                                    Terms & Conditions
                                </h4>
                            </div>
                            <div className="terms-conditions" dangerouslySetInnerHTML={{ __html: landingTerm?.content ?? "<p></p>" }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LandingPageFooter />
        </div>
    )
};

export default TermsOfUse;