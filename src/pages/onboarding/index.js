import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import { Formik } from 'formik';
import { onBoardingUserSchema } from '../../auth/Schema';
import ErrorMessage from '../../layout/ErrorMessage';
import { pipGetAccessToken } from '../../auth/Pip';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { userOnboarding } from '../../redux/actions/authActions';
import { pageRoutes } from '../../routes/PageRoutes';

const OnBoardingScreen = ({ messageApi }) => {
    const { isLoading } = useSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [yearsList, setyearsList] = useState([]);
    const [userProfile, setUserProfile] = useState();
    const [userProfileApi, setUserProfileApi] = useState();

    const [stepForm, setStepForm] = useState('1');

    const initialeState = {
        referral_code: "",
        profile_name: "",
        year_of_birth: "",
        gender: "",
        email: ""
    };

    useEffect(() => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const maxYear = currentYear - 18;
        const minYear = currentYear - 100;
        let data = [];
        for (let i = maxYear; i >= minYear; i--) {
            data?.push(i);
        };
        setyearsList(data);
    }, []);

    const handleNextButton = (val, setFieldError, setFieldTouched) => {
        let data = [];
        if (val?.gender == "") {
            data?.push("gender");
            setFieldTouched("gender", true);
            setFieldError('gender', "Please select gender");
        } else if (val?.gender != "Male") {
            data?.push("gender");
            setFieldTouched("gender", true);
            setFieldError('gender', "Sorry you cannot signup, this is a platform exclusively for men");
        };
        if (val?.year_of_birth == "") {
            data?.push("year_of_birth");
            setFieldTouched("year_of_birth", true);
            setFieldError("year_of_birth", "Please select year of birth");
        };
        if (val?.profile_name == "") {
            data?.push("profile_name");
            setFieldTouched("profile_name", true);
            setFieldError("profile_name", "Please enter profile name");
        };
        if (data?.length == 0) {
            setStepForm('2')
        };
    };

    const handleSubmitDetails = async (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            setUserProfile();
            setUserProfileApi();
            setStepForm('1');
            if (response?.data) {
                messageApi?.success("Profile set-up successfully");
                navigate(pageRoutes.dashboard);
            } else {
                messageApi?.errors("");
            };
        };
        const userData = pipGetAccessToken("user_data");
        const data = {
            type: 'sms_account',
            attributes: {
                full_phone_number: userData?.attributes?.phone_number,
                full_name: values?.profile_name,
                birth_year: values?.year_of_birth,
                gender: values?.gender,
                email: values?.email,
                referred_by: values?.referral_code,
            },
        };
        const formdata = new FormData();
        if (userProfileApi) {
            formdata.append('profile_img', userProfileApi);
        };
        formdata.append('data', JSON.stringify(data));
        dispatch(userOnboarding({ payload: formdata, callback, messageApi }));
    };

    const handleChangeProfile = (val) => {
        if (val) {
            setUserProfile(URL.createObjectURL(val));
            setUserProfileApi(val);
        };
    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div
                                className="ct_multistep_form_card pt-4 mt-3 mb-3 ct_host_process_bg"
                            >
                                <Formik
                                    initialValues={initialeState}
                                    validationSchema={onBoardingUserSchema}
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
                                        setFieldTouched,
                                        isSubmitting,
                                    }) => (
                                        <form id="msform">
                                            <ul id="ct_form_progressbar" className="ct_host_process_multi_form">
                                                <li className={`${stepForm == "1" && "active"} ct_flex_1`}>
                                                    <h5>Profile Setup</h5>
                                                </li>
                                                <li className={`${stepForm == "2" && "active"} ct_flex_1`} id="ct_pricing">
                                                    <h5>Completed</h5>
                                                </li>
                                            </ul>
                                            {stepForm == "1" ?
                                                <fieldset className="ct_mt_60 ct_white_bg">
                                                    <div className="ct_profile_img">
                                                        <img src={userProfile ?? "assets/img/dummy_user_img.png"} alt="" />
                                                        <label for="ct_profile_update">
                                                            <input
                                                                type="file"
                                                                className="d-none"
                                                                id="ct_profile_update"
                                                                accept="image/*"
                                                                onChange={(e) => handleChangeProfile(e.target.files[0])}
                                                            />
                                                            <div className="ct_upload_icon">
                                                                <i className="fa-solid fa-pen"></i>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="row mt-5">
                                                        <div className="col-md-12">
                                                            <div className="form-group text-start mb-4">
                                                                <label className="ct_fw_500 mb-2 text-start">Profile Name</label>
                                                                <input
                                                                    id="profile_name"
                                                                    type="text"
                                                                    className="form-control ct_input"
                                                                    placeholder="Enter profile name"
                                                                    value={values?.profile_name}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                />
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="profile_name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group text-start mb-4">
                                                                <label className="ct_fw_500 mb-2 text-start">Year Of Birth</label>
                                                                <select
                                                                    className="form-control ct_input"
                                                                    id="year_of_birth"
                                                                    value={values.year_of_birth}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value="">Select year of birth</option>
                                                                    {yearsList?.length != 0 && yearsList?.map((item) => (
                                                                        <option value={item ?? 0}>{item ?? 0}</option>
                                                                    ))}
                                                                </select>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="year_of_birth"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group text-start mb-4">
                                                                <label className="ct_fw_500 mb-2 text-start">Gender</label>
                                                                <select
                                                                    className="form-control ct_input"
                                                                    id="gender"
                                                                    value={values?.gender}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value="">Select gender</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                    <option value="Non - Binary">Non - Binary</option>
                                                                    <option value="Do not wish to disclose">Do not wish to disclose</option>
                                                                </select>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="gender"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="ct_yellow_btn ct_form_next float-end"
                                                        onClick={() => handleNextButton(values, setFieldError, setFieldTouched)}
                                                    >
                                                        Next
                                                    </button>
                                                </fieldset>
                                                :
                                                <fieldset className="ct_white_bg">
                                                    <div className="ct_profile_img">
                                                        <img src={userProfile ?? "assets/img/dummy_user_img.png"} alt="" />
                                                        <label for="ct_profile_update">
                                                            <input
                                                                type="file"
                                                                className="d-none"
                                                                id="ct_profile_update"
                                                                accept="image/*"
                                                                onChange={(e) => handleChangeProfile(e.target.files[0])}
                                                            />
                                                            <div className="ct_upload_icon">
                                                                <i className="fa-solid fa-pen"></i>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="row mt-5">
                                                        <div className="col-md-12">
                                                            <div className="form-group text-start mb-4">
                                                                <label className="ct_fw_500 mb-2 text-start">Email</label>
                                                                <input
                                                                    id="email"
                                                                    type="email"
                                                                    onBlur={handleBlur}
                                                                    value={values?.email}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter email"
                                                                    className="form-control ct_input"
                                                                />
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group text-start mb-4">
                                                                <label className="ct_fw_500 mb-2 text-start">Referral Code</label>
                                                                <input
                                                                    id="referral_code"
                                                                    type="text"
                                                                    onBlur={handleBlur}
                                                                    value={values?.referral_code}
                                                                    onChange={handleChange}
                                                                    className="form-control ct_input"
                                                                    placeholder="Enter referral code"
                                                                />
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="referral_code"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="ct_yellow_btn ct_form_next float-end"
                                                        onClick={handleSubmit}
                                                    >
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="ct_outline_btn previous float-end me-3"
                                                        onClick={() => setStepForm('1')}
                                                    >
                                                        Back
                                                    </button>
                                                </fieldset>
                                            }
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
};

export default OnBoardingScreen;