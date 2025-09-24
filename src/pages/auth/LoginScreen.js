import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { Formik } from 'formik';
import { LoginSchema } from '../../auth/Schema';
import ErrorMessage from '../../layout/ErrorMessage';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import "react-phone-number-input/style.css";
import { requestOtp } from "../../auth/requestOtp";
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';


const LoginScreen = ({ messageApi }) => {
    const { isLoading } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false);

    const initialeState = {
        phone_number: '',
        isAgree: false
    };

    const handleSubmitDetails = async (values, { setSubmitting }) => {
        setSubmitting(false);
        setIsLoader(true)
        requestOtp({
            mobileNumber: values?.phone_number,
            isAgreed: values?.isAgreed,
            navigate,
            loaderValueChange: () => setIsLoader(false),
            messageApi
        })
    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div className="ct_login_center_main">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
                        <div className="ct_login_main">
                            <h2 className="text-center ct_fw_600 mb-4 ct_fs_24">Sign In / Sign Up</h2>
                            <div className="text-center  mt-4">
                                <img src="assets/img/login_vector.png" alt="" />
                            </div>
                            <p className="mb-0 mt-4 mb-3">We respect your privacy, Your number will not be shared anywhere</p>
                            <Formik
                                initialValues={initialeState}
                                validationSchema={LoginSchema}
                                onSubmit={(values, actions) =>
                                    handleSubmitDetails(values, actions)
                                }
                            >
                                {({
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                    setFieldError,
                                    isSubmitting,
                                }) => (
                                    <form>
                                        <div id="recaptcha-container"></div>
                                        <div className="mb-2">
                                            <label className="form-label">Enter Phone Number</label>
                                            <PhoneInput
                                                id="phone_number"
                                                className="form-control ct_input ct_input_grey_border_1 ct_border_radius_5 ct_h_44"
                                                defaultCountry="US"
                                                value={values?.phone_number}
                                                onChange={(val) => {
                                                    const safeVal = val ?? '';
                                                    if (
                                                        typeof safeVal === 'string' &&
                                                        safeVal.length > 2 &&
                                                        isValidPhoneNumber(safeVal)
                                                    ) {
                                                        setFieldValue('phone_number', safeVal);
                                                    } else if (!isValidPhoneNumber(safeVal)) {
                                                        setFieldError('phone_number', 'Please enter valid phone number');
                                                        setFieldValue('phone_number', safeVal);
                                                    }
                                                }}
                                                onBlur={handleBlur}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                touched={touched}
                                                fieldName="phone_number"
                                            />
                                        </div>
                                        <div className="d-flex  align-items-center mt-2">
                                            <div className="form-check ct_custom_check2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="isAgree"
                                                    value={values.isAgree}
                                                    checked={values.isAgree}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <label for=""><span className="ct_text_op_6">Please read and agree to our</span> <a href={pageRoutes?.termAndCondition} target='_blank' className="ct_link_under_line text-dark">Terms of Use</a> and <a href={pageRoutes?.privacyPolicy} target='_blank' className="ct_link_under_line text-dark"><span className="ct_text_op_6">Privacy Policy</span></a></label>
                                        </div>
                                        <ErrorMessage
                                            errors={errors}
                                            touched={touched}
                                            fieldName="isAgree"
                                        />
                                        <div className="text-center mt-5">
                                            <button disabled={isLoader} onClick={handleSubmit} type="submit" className="ct_yellow_btn mx-auto">Get Otp</button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginScreen;