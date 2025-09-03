import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { pipGetAccessToken } from '../../auth/Pip';
import { IMAGE_URL } from '../../routes/BackendRoutes';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { UpdateProfileSchema } from '../../auth/Schema';

const UpdateProfile = ({ messageApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        email: userData?.attributes?.email ?? ''
    };


    useEffect(() => {
        const data = pipGetAccessToken("user_data");
        setUserData(data);
    }, []);

    const handleUpdateImage = (e) => {
        setUpdateUserImage(e?.target?.files[0]);
    };

    const handleUpdateProfileData = (values) => {
        console.log("values");
        const callback = (response) => {
            console.log(response);
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
        formData.append('bio', '');
        formData.append('personal_exp', '');
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
                                            onSubmit={(values, actions) =>
                                                handleUpdateProfileData(values, actions)
                                            }
                                        >

                                        </Formik>
                                        <form className="ct_white_bg">
                                            <div className="ct_profile_img">
                                                <img src={updateUserImage ? URL.createObjectURL(updateUserImage) : IMAGE_URL + userData?.attributes?.profile_image} alt="" />
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
                                                        <input type="text" className="form-control ct_input" placeholder="Enter Profile Name" value={userData?.attributes?.full_name} />
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
                                                        <input type="email" className="form-control ct_input" placeholder="Enter Email" value={userData?.attributes?.email} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-4">
                                                        <label className="ct_fw_500 mb-2">Year Of Birth</label>
                                                        <input type="number" className="form-control ct_input" placeholder="Enter Birth Year" value={userData?.attributes?.birth_year} readOnly disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group mb-4">
                                                        <label className="ct_fw_500 mb-2">Gender</label>
                                                        <input type="text" className="form-control ct_input" placeholder="Enter Gender" value={userData?.attributes?.gender} readOnly disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <button className="ct_yellow_btn mx-auto">Save Changes</button>
                                            </div>
                                        </form>
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