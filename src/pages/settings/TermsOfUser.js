import React from 'react';
import Header from '../../components/Header';

const TermsOfUser = () => {

    return (
        <div>
            <Header />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between  gap-3 mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Platform Terms Of Use
                                </h4>
                            </div>
                            <div className="terms-conditions">
                                <h4 className="ct_fs_20 ct_fw_600">1. Introduction</h4>
                                <p>
                                    These Terms and Conditions govern your use of our website, services, and content.
                                    By accessing or using our platform, you agree to comply with these terms.
                                    If you do not agree, you must discontinue using our services immediately.
                                </p>
                                <h4 className="ct_fs_20 ct_fw_600">2. Eligibility</h4>
                                <p>
                                    You must be at least 18 years old to use our services. By using this website,
                                    you represent and warrant that you meet all eligibility requirements.
                                </p>
                                <h4 className="ct_fs_20 ct_fw_600">3. User Responsibilities</h4>
                                <p>
                                    You agree to use the website only for lawful purposes and in accordance with
                                    applicable laws. You must not misuse, damage, or interfere with the security
                                    of our platform.
                                </p>
                                <h4 className="ct_fs_20 ct_fw_600">4. Intellectual Property</h4>
                                <p>
                                    All content, including text, images, graphics, and trademarks, are the property
                                    of the company or its licensors. Unauthorized use, reproduction, or distribution
                                    is strictly prohibited.
                                </p>
                                <h4 className="ct_fs_20 ct_fw_600">5. Limitation of Liability</h4>
                                <p>
                                    We are not liable for any damages arising out of the use or inability to use
                                    our services. Use of the website is at your own risk.
                                </p>
                                <h4 className="ct_fs_20 ct_fw_600">6. Changes to Terms</h4>
                                <p>
                                    We reserve the right to update or modify these Terms and Conditions at any time.
                                    Continued use of the platform after changes signifies your acceptance of the updated terms.
                                </p>
                                <h4 className="ct_fs_20 ct_fw_600">7. Governing Law</h4>
                                <p>
                                    These Terms and Conditions are governed by and construed in accordance with
                                    the laws of your jurisdiction. Any disputes will be subject to the exclusive
                                    jurisdiction of the courts in that region.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default TermsOfUser;