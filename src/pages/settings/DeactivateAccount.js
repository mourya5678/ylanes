import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { deactivatedUserAccount } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { requestOtp } from '../../auth/requestOtp';
import { pipGetAccessToken } from '../../auth/Pip';

const DeactivateAccount = ({ messageApi }) => {
    const { isLoading } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectResonList, setSelectResonList] = useState("");
    const [enterResonList, setEnterResonList] = useState("");

    const [isLoader, setIsLoader] = useState(false);

    const reasonList = [
        'I am not enjoying YLanes anymore',
        'I do not appreciate the policies of YLanes',
        'I am not happy with the people I am interacting with',
        'Other (please specify)',
    ];

    const handleDeactivateAccount = () => {
        const callback = (response) => {
            if (response?.success[0]?.message) {
                messageApi.success(response?.success[0]?.message);
                navigate(pageRoutes.login);
            } else {
                messageApi.error("Unable to deactivate account please try again after some time!")
            }
        };
        if (selectResonList != "") {
            if (selectResonList == "Other (please specify)") {
                if (enterResonList?.trim() != "") {
                    var raw = enterResonList;
                    const formData = new FormData();
                    formData.append('deactivate_reason', raw);
                    dispatch(deactivatedUserAccount({ payload: formData, messageApi, callback }))
                } else {
                    messageApi.error("Please enter reason");
                };
            } else {
                var raw = selectResonList;
                const formData = new FormData();
                formData.append('deactivate_reason', raw);
                dispatch(deactivatedUserAccount({ payload: formData, messageApi, callback }))
            };
        } else {
            messageApi.error("Please select the reason");
        };
    };

    const handleDeleteAllData = () => {
        const user_data = pipGetAccessToken("user_data");
        setIsLoader(true);
        if (selectResonList != "") {
            if (selectResonList == "Other (please specify)") {
                if (enterResonList?.trim() != "") {
                    const metaObject = {
                        mobileNumber: '+' + user_data?.attributes?.full_phone_number,
                        isFromSettings: true,
                        reason: enterResonList
                    };
                    requestOtp({
                        mobileNumber: '+' + user_data?.attributes.full_phone_number,
                        navigate,
                        metaData: metaObject,
                        route: pageRoutes?.verifyDeactiveAccountOtp,
                        loaderValueChange: () => setIsLoader(false),
                        messageApi
                    })
                } else {
                    messageApi.error("Please enter reason");
                };
            } else {
                const metaObject = {
                    mobileNumber: '+' + user_data?.attributes.full_phone_number,
                    isFromSettings: true,
                    reason: selectResonList
                };
                requestOtp({
                    mobileNumber: '+' + user_data?.attributes.full_phone_number,
                    navigate,
                    metaData: metaObject,
                    route: pageRoutes?.verifyDeactiveAccountOtp,
                    loaderValueChange: () => setIsLoader(false),
                    messageApi
                })
            };
        } else {
            messageApi.error("Please select the reason");
        };
    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <div>
            <div id="recaptcha-container"></div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between  gap-3 mb-5">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Deactivate Account
                                </h4>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 ct_fw_500">Select Reason For Deactivation</label>
                                <select className="form-control ct_input" onChange={(e) => setSelectResonList(e.target.value)}>
                                    <option value="">Select reason</option>
                                    {reasonList?.map((item) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            {selectResonList == "Other (please specify)" &&
                                <div className="form-group mb-0 mt-3">
                                    <label className="mb-2 ct_fw_500">Reason</label>
                                    <textarea
                                        className="form-control ct_input"
                                        value={enterResonList}
                                        onChange={(e) => setEnterResonList(e.target.value)}
                                    />
                                </div>
                            }
                            <div className="pt-4">
                                <h4 className="ct_fs_20 ct_fw_600 mb-3">Deactivate</h4>
                                <p className="mb-0 ct_text_op_6">This will put your account in a hold status. You will not be searchable by other users nor appear in any lists (e.g. connects, room history). You can reactivate your account any time by logging in.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="ct_fs_20 ct_fw_600 mb-3">Delete All Data</h4>
                                <p className="mb-0 ct_text_op_6">This will delete your entire account permanently including all of your data and history (e.g. connects, touchpoints, hearts, etc.). This cannot be undone. Your wallet has 6480 YCoins in it, which you will lose if you delete your account.</p>
                            </div>
                            <div className="mt-5 d-flex align-items-center gap-3">
                                <button className="ct_yellow_btn" type="button" onClick={handleDeactivateAccount}>Deactivate</button>
                                <button className="ct_outline_btn ct_red_btn" type="button" onClick={handleDeleteAllData}>Delete All Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default DeactivateAccount;