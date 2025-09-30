import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { pipGetAccessToken } from '../../auth/Pip';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfileSchema } from '../../auth/Schema';
import ErrorMessage from '../../layout/ErrorMessage';
import { updateUserProfileData } from '../../redux/actions/authActions';
import { pageRoutes } from '../../routes/PageRoutes';
import Loader from '../../components/Loader';

const UpdateProfile = ({ messageApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authReducer);


    const [userData, setUserData] = useState({});
    const [updateUserImage, setUpdateUserImage] = useState();

    const initialeState = {
        phone: userData?.attributes?.full_phone_number ?? '',
        profile_deleted: userData?.attributes?.profile_image ?? '',
        full_name: userData?.attributes?.full_name ?? '',
        userName: userData?.attributes?.user_name ?? '',
        onboarding: userData?.attributes?.onboarding_details ?? '',
        genderType: userData?.attributes?.gender ?? '',
        birthOfYear: userData?.attributes?.birth_year ?? '',
        email: userData?.attributes?.email ?? '',
        bio: userData?.attributes?.bio ?? "",
        about_us: userData?.attributes?.about_us ?? "",
    };


    useEffect(() => {
        const data = pipGetAccessToken("user_data");
        setUserData(data);
    }, []);

    const handleUpdateImage = (e) => {
        setUpdateUserImage(e?.target?.files[0]);
    };

    const handleUpdateProfileData = async (values) => {
        const callback = (response) => {
            if (response?.meta?.success) {
                messageApi?.success(response?.meta?.message);
            } else {
                messageApi?.error("Unable to update profile! Please try again after sometime.");
            };
            navigate(pageRoutes.profile);
        };
        const formData = new FormData();
        formData.append("type", "update_profile");
        if (updateUserImage) {
            formData.append("profile_img", updateUserImage);
            formData.append('profile_image_deleted', values.profile_deleted?.toString());
        };
        formData.append('full_name', values?.full_name);
        formData.append('user_name', values.userName);
        formData.append('onboarding_data', JSON.stringify(values.onboarding));
        formData.append('gender', values.genderType);
        formData.append('birth_year', values.birthOfYear);
        formData.append('preferred_sub_categories', `[]`);
        formData.append('email', values?.email);
        formData.append('full_phone_number', values?.phone);
        formData.append('bio', values?.bio);
        formData.append('personal_exp', "");
        formData.append('about_us', values.about_us);
        dispatch(updateUserProfileData({ payload: formData, data: userData?.id, callback, messageApi }))
    };

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
                                    Edit Profile
                                </h4>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 mx-auto">
                                        <Formik
                                            initialValues={initialeState}
                                            validationSchema={UpdateProfileSchema}
                                            enableReinitialize
                                            onSubmit={(values, actions) =>
                                                handleUpdateProfileData(values, actions)
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
                                                <form className="ct_white_bg">
                                                    <div className="ct_profile_img">
                                                        <img src={updateUserImage ? URL.createObjectURL(updateUserImage) : userData?.attributes?.profile_image} alt="" />
                                                        <label>
                                                            <input
                                                                type="file"
                                                                className="d-none"
                                                                onChange={(e) => handleUpdateImage(e)}
                                                                id="ct_profile_update"
                                                                accept='image/*'
                                                            />
                                                            <div className="ct_upload_icon">
                                                                <i className="fa-solid fa-pen"></i>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="row mt-5">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-4">
                                                                <label className="ct_fw_500 mb-2">Profile Name</label>
                                                                <input
                                                                    type="text"
                                                                    id="full_name"
                                                                    className="form-control ct_input"
                                                                    placeholder="Enter Profile Name"
                                                                    value={values.full_name}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                />
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="full_name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-4">
                                                                <label className="ct_fw_500 mb-2">Phone Number</label>
                                                                <input type="number" className="form-control ct_input" placeholder="Enter Phone Number" value={userData?.attributes?.full_phone_number} readOnly disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-4">
                                                                <label className="ct_fw_500 mb-2">Email</label>
                                                                <input
                                                                    id="email"
                                                                    type="email"
                                                                    className="form-control ct_input"
                                                                    placeholder="Enter Email"
                                                                    value={values.email}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                />
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-4">
                                                                <label className="ct_fw_500 mb-2">Year Of Birth</label>
                                                                <input type="number" className="form-control ct_input" placeholder="Enter Birth Year" value={values?.birthOfYear} readOnly disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-4">
                                                                <label className="ct_fw_500 mb-2">Gender</label>
                                                                <input type="text" className="form-control ct_input" placeholder="Enter Gender" value={values.genderType} readOnly disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-4">
                                                                <label className="ct_fw_500 mb-2">About</label>
                                                                <textarea
                                                                    id="about_us"
                                                                    className="form-control"
                                                                    placeholder="Enter About"
                                                                    value={values.about_us}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                />
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="about_us"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-4">
                                                                <label className="ct_fw_500 mb-2">Bio</label>
                                                                <textarea
                                                                    id="bio"
                                                                    className="form-control"
                                                                    placeholder="Enter Bio"
                                                                    value={values.bio}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                />
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    fieldName="bio"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-center d-flex align-items-center justify-content-end gap-3">
                                                        <button type="button" onClick={() => navigate(-1)} className="ct_yellow_btn ">Cancel</button>
                                                        <button onClick={handleSubmit} className="ct_yellow_btn">Save Changes</button>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default UpdateProfile;