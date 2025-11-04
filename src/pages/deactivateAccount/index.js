import React, { useState } from 'react';
import ErrorMessage from '../../layout/ErrorMessage';
import { Formik } from 'formik';
import { DeactivateAccountSchema } from '../../auth/Schema';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import "react-phone-number-input/style.css";
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { pageRoutes } from '../../routes/PageRoutes';
import { requestOtp } from "../../auth/requestOtp";
import { useNavigate } from 'react-router';


const DeactivateUserAccount = ({ messageApi }) => {
    const { isLoading } = useSelector((state) => state.authReducer);

    const [isLoader, setIsLoader] = useState(false);
    const navigate = useNavigate();

    const initialeState = {
        phone_number: '+91'
    };

    const handleSubmitDetails = async (values, { setSubmitting }) => {
        setSubmitting(false);
        setIsLoader(true)
        requestOtp({
            mobileNumber: values?.phone_number,
            route: pageRoutes.verify_phoneNumber,
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
                            <h2 className="text-center ct_fw_600 mb-4 ct_fs_24">Delete Account</h2>
                            <div className="text-center  mt-4">
                                <img src="assets/img/login_vector.png" alt="" />
                            </div>
                            <p className="mb-0 mt-4 mb-3">This will delete your entire account permanently including all of your data and history</p>
                            <Formik
                                initialValues={initialeState}
                                validationSchema={DeactivateAccountSchema}
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
                                                defaultCountry="IN"
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

export default DeactivateUserAccount;