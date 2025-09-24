import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChange } from '../../redux/reducers/authReducers';
import { pageRoutes } from '../../routes/PageRoutes';
import { useNavigate } from 'react-router';
import { pipGetAccessToken } from '../../auth/Pip';
import { IMAGE_URL } from '../../routes/BackendRoutes';
import { getMyProfileData } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';
import emojiFlags from "emoji-flags";
import ReactCountryFlag from 'react-country-flag';
import { getMyConnectionsData } from '../../redux/actions/createRoom';


const Profile = ({ messageApi }) => {
    const { isToggle, profileData, isLoading } = useSelector((state) => state.authReducer);
    const { isCreateLoading, allConnections } = useSelector((state) => state.createRoomReducer);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const data = pipGetAccessToken("user_data");
        dispatch(getMyProfileData({ payload: data?.id, messageApi }));
        dispatch(getMyConnectionsData({ messageApi }));
    }, []);

    useEffect(() => {
        const data = pipGetAccessToken("user_data");
        setUserData(data);
    }, [profileData]);


    if (isLoading || isCreateLoading) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">Profile</h4>
                            </div>
                            <div className="ct_profile_bg">
                                <form>
                                    <a className="ct_edit_profile_icon" onClick={() => navigate(pageRoutes.updateProfile)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <div className="ct_profile_img">
                                        <img src={userData?.attributes?.profile_image ? IMAGE_URL + userData?.attributes?.profile_image : "assets/img/dummy_user_img.png"} alt="" />
                                    </div>
                                    <div className="text-center mt-3 text-white">
                                        <h5 className="mb-0 ct_fs_18 ct_fw_600 mb-1">{userData?.attributes?.full_name ?? ""}</h5>
                                        <p>{userData?.attributes?.gender} {userData?.attributes?.age_range[0] ?? 0} - {userData?.attributes?.age_range[1] ?? 0} Years</p>
                                    </div>
                                    <div className="ct_profile_info_list mt-5">
                                        <ul>
                                            <li className="text-center text-white">
                                                <i className="fa-regular fa-heart"></i>
                                                <p className="mb-1 ct_fs_14 ct_text_op_6">HEARTS</p>
                                                <h6 className="smb-0">{userData?.attributes?.hearts ?? 0}</h6>
                                            </li>
                                            <li className="text-center text-white">
                                                <a className="text-white">
                                                    <i className="fa-regular fa-user"></i>
                                                    <p className="mb-1 ct_fs_14 ct_text_op_6">TOUCH POINTS</p>
                                                    <h6 className="smb-0">{userData?.attributes?.touch_points ?? 1}</h6>
                                                </a>
                                            </li>
                                            <li className="text-center text-white">
                                                <a className="text-white" onClick={() => navigate(pageRoutes.userWallet)}>
                                                    <i className="fa-regular fa-credit-card"></i>
                                                    <p className="mb-1 ct_fs_14 ct_text_op_6">WALLET</p>
                                                    <h6 className="smb-0">{userData?.attributes?.ycoins ?? 0}</h6>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <ul
                                    className="nav nav-pills mb-3 ct_custom_tabs"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${isToggle == 1 && "active"}`}
                                            type="button"
                                            role="tab"
                                            onClick={() => dispatch(toggleChange("1"))}
                                        >
                                            Public Info
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${isToggle == 2 && "active"}`}
                                            type="button"
                                            role="tab"
                                            tabindex="-1"
                                            onClick={() => dispatch(toggleChange("2"))}
                                        >
                                            Personal Info
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${isToggle == 3 && "active"}`}
                                            type="button"
                                            role="tab"
                                            tabindex="-1"
                                            onClick={() => dispatch(toggleChange("3"))}
                                        >
                                            Resources
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${isToggle == 4 && "active"}`}
                                            type="button"
                                            role="tab"
                                            tabindex="-1"
                                            onClick={() => dispatch(toggleChange("4"))}
                                        >
                                            Connections
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div
                                        className={`tab-pane fade ${isToggle == 1 && "active show"}`}
                                        role="tabpanel"
                                    >
                                        <div className="ct_white_bg">
                                            <h4 className="ct_fw_600 ct_fs_20 mb-3">Country</h4>
                                            <div className="d-flex align-items-center gap-2">
                                                <ReactCountryFlag
                                                    countryCode={userData?.attributes?.country_details?.code}
                                                    svg
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                    }}
                                                    title={userData?.attributes?.country_details?.code}
                                                />
                                                <p className="mb-0 ct_text_op_6">{userData?.attributes?.country_details?.name ?? ""}</p>
                                            </div>
                                        </div>
                                        <div className="ct_white_bg mt-2">
                                            <h4 className="ct_fw_600 ct_fs_20 mb-3">Bio</h4>
                                            <p className='mb-0 ct_para_scroll ct_custom_scroll ct_text_op_6 ct_f_14'>
                                                {userData?.attributes?.bio ?? ""}
                                            </p>
                                        </div>
                                        <div className="ct_white_bg mt-2">
                                            <h4 className="ct_fw_600 ct_fs_20 mb-2">About You</h4>
                                            <p className='mb-0 ct_para_scroll ct_custom_scroll ct_text_op_6 ct_f_14'>
                                                {userData?.attributes?.about_us ?? ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${isToggle == 2 && "active show"}`}
                                        role="tabpanel"
                                    >
                                        <div className="ct_white_bg">
                                            <h4 className="ct_fw_600 ct_fs_24 mb-3">Basic Information</h4>
                                            <ul className="ct_persional_info_grid">
                                                <li>
                                                    <p className="mb-0 ct_fw_600">Phone Number</p>
                                                    <p className="mb-0">+{userData?.attributes?.full_phone_number ?? ""}</p>
                                                </li>
                                                <li>
                                                    <p className="mb-0 ct_fw_600">Email</p>
                                                    <p className="mb-0">{userData?.attributes?.email ?? ""}</p>
                                                </li>
                                                <li>
                                                    <p className="mb-0 ct_fw_600">Year Of Birth</p>
                                                    <p className="mb-0">{userData?.attributes?.birth_year ?? 0}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${isToggle == 3 && "active show"}`}
                                        role="tabpanel"
                                    >
                                        <div className="row">
                                            <div className="col-md-5 mx-auto">
                                                <div className="ct_white_bg text-center">
                                                    <h4 className="ct_fw_600 ct_fs_20 mb-3 ct_text_op_6">
                                                        No resources added yet.
                                                    </h4>
                                                    <p className="mb-0 ct_text_op_6">
                                                        Did you know you can add relevant resources (websites,
                                                        YouTube links, etc.) along with your YTake while
                                                        registering for a room? They will appear here.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${isToggle == 4 && "active show"}`}
                                        role="tabpanel"
                                        aria-labelledby="pills-contact-tab"
                                    >
                                        <div className="ct_white_bg">
                                            <div className="chat-list">
                                                {allConnections?.length != 0 &&
                                                    allConnections?.map((item, i) => (
                                                        <a
                                                            className="d-flex align-items-center"
                                                        >
                                                            <div className="position-relative">
                                                                <img
                                                                    className="img-fluid ct_img_40"
                                                                    src={item?.attributes?.profile_image ? IMAGE_URL + item?.attributes?.profile_image : "/assets/img/dummy_user_img.png"}
                                                                    alt="user img"
                                                                />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <div
                                                                    className="d-flex align-items-center gap-2 justify-content-between"
                                                                >
                                                                    <h3 className="ct_fs_16 ct_fw_600 mb-0">{item?.attributes?.full_name ?? ""}</h3>
                                                                </div>
                                                                <div
                                                                    className="d-flex align-items-center gap-2 justify-content-between"
                                                                ></div>
                                                            </div>
                                                            <div className="">
                                                                <button className="ct_yellow_btn ct_white_nowrap">
                                                                    Connected
                                                                </button>
                                                            </div>
                                                        </a>
                                                    ))}
                                                {/* <a
                                                    className="d-flex align-items-center"
                                                >
                                                    <div className="position-relative">
                                                        <img
                                                            className="img-fluid ct_img_40"
                                                            src="assets/img/user.png"
                                                            data-bs-target="#full_view_img"
                                                            data-bs-toggle="modal"
                                                            alt="user img"
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <div
                                                            className="d-flex align-items-center gap-2 justify-content-between"
                                                        >
                                                            <h3 className="ct_fs_16 ct_fw_600 mb-0">Jane Doe</h3>
                                                        </div>
                                                        <div
                                                            className="d-flex align-items-center gap-2 justify-content-between"
                                                        ></div>
                                                    </div>
                                                    <div className="">
                                                        <button className="ct_yellow_btn ct_white_nowrap">
                                                            Connected
                                                        </button>
                                                    </div>
                                                </a> */}
                                            </div>
                                            <div className="text-center">
                                                <button className="ct_yellow_btn mt-4">Descover More</button>
                                            </div>
                                        </div>
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

export default Profile