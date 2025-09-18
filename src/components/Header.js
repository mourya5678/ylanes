import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../routes/PageRoutes';
import { pipGetAccessToken } from '../auth/Pip';
import { getMyProfileData } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_URL } from '../routes/BackendRoutes';

const Header = ({ messageApi }) => {
  const { profileData } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = pipGetAccessToken("user_data");
    setUserData(data);
  }, [profileData]);

  return (
    <header className="ct_header px-md-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="ct_navbr_main ct_dash_header_navbar_main">
              <div className="ct_logo">
                <a onClick={() => navigate(pageRoutes.dashboard)}>
                  <img src="assets/img/logo.png" alt="" />
                </a>
              </div>
              <div className="ct_navbar gap-3 ct_dash_header_navbar">
                <ul>
                  <div className="ct_close_menu">
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                  <li className="ct_flex_1">
                    <div className="ct_flex_1 d-flex align-items-center gap-2 ">
                      <div className=" position-relative ct_flex_1 ct_search_input ct_flex_1 ct_header_search_w_700 ">
                        <div className="position-relative">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="form-control ct_input pe-5"
                          />
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="ct_searchable_list d-none ">
                          <ul className="ct_custom_scroll">
                            <li>
                              <p className="mb-0 ct_fw_600">Topics</p>
                              <p className="mb-0 ct_fw_600">
                                <i className="fa-solid fa-angle-right"></i>
                              </p>
                            </li>
                            <li>
                              <p className="mb-0 ct_fw_600">Profiles</p>
                              <p className="mb-0 ct_fw_600">
                                <i className="fa-solid fa-angle-right"></i>
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <button className="ct_yellow_btn ct_border_radius_10" onClick={() => navigate(pageRoutes.createRoom)}>
                        Create Room
                      </button>
                    </div>
                  </li>
                  <li>
                    <button
                      className="ct_outline_border ct_w_100_767 ct_white_nowrap ct_border_radius_10"
                      onClick={() => navigate(pageRoutes.userWallet)}
                    >
                      <img
                        src="assets/img/wallet_icon.png"
                        alt=""
                        width="20px"
                      />
                      {userData?.attributes?.ycoins ?? 0}
                    </button>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center gap-2">
                <a
                  className="ct_header_icon"
                  onClick={() => navigate(pageRoutes.chat)}
                >
                  <img src="assets/img/message_icon.png" alt="" />
                </a>
                <a
                  className="ct_header_icon"
                  onClick={() => navigate(pageRoutes.notification)}
                >
                  <img src="assets/img/notifications_icon.png" alt="" />
                </a>
                <div className="ct_right_dropdown dropdown">
                  <button onClick={() => setIsShow(!isShow)}>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={IMAGE_URL + userData?.attributes?.profile_image}
                        alt=""
                        className="ct_img_30"
                      />
                      <div className="text-start">
                        <small className="ct_text_939393 ct_fw_600 ct_white_nowrap ct_overlay_text ct_res_w_50_name">
                          {userData?.attributes?.full_name ?? ""}
                        </small>
                      </div>
                    </div>
                    <i className="fa-solid fa-angle-down ms-auto"></i>
                  </button>
                  <ul className={`dropdown-menu ${isShow && "show"}`}>
                    <li onClick={() => navigate(pageRoutes.myRoom)}>
                      <a className="dropdown-item">
                        <img
                          src="../assets/img/dashbaord-images/profile_icon.svg"
                          alt=""
                        />
                        My Room
                      </a>
                    </li>
                    <li onClick={() => navigate(pageRoutes.profile)}>
                      <a className="dropdown-item">
                        <img
                          src="../assets/img/dashbaord-images/profile_icon.svg"
                          alt=""
                        />
                        My Profile
                      </a>
                    </li>
                    <li onClick={() => navigate(pageRoutes.setting)}>
                      <a className="dropdown-item">Settings</a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => navigate(pageRoutes.login)}
                      >
                        <img
                          src="../assets/img/dashbaord-images/logout.svg"
                          alt=""
                        />
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="ct_menu_bar">
                  <i className="fa-solid fa-bars-staggered"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;