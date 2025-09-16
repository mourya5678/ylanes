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
    <header className="ct_header">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="ct_navbr_main">
              <div className="ct_logo">
                <a onClick={() => navigate(pageRoutes.dashboard)}>
                  <img src="assets/img/logo.png" alt="" />
                </a>
              </div>
              <div className="ct_navbar">
                <ul>
                  <div className="ct_close_menu">
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                  {/* window.location?.pathname */}
                  <li onClick={() => navigate(pageRoutes.dashboard)}>
                    <a className={window.location?.pathname == pageRoutes.dashboard && 'active'}>Home</a>
                  </li>
                  <li onClick={() => navigate(pageRoutes.poll)}>
                    <a className={window.location?.pathname == pageRoutes.poll && 'active'}>Polls</a>
                  </li>
                  <li onClick={() => navigate(pageRoutes.myRoom)}>
                    <a className={window.location?.pathname == pageRoutes.myRoom && 'active'}>My Rooms</a>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center gap-2">
                <a
                  className="ct_header_icon"
                  onClick={() => navigate(pageRoutes.notification)}
                >
                  <img src="assets/img/notifications_icon.png" alt="" />
                </a>
                <a
                  className="ct_header_icon"
                  onClick={() => navigate(pageRoutes.chat)}
                >
                  <img src="assets/img/message_icon.png" alt="" />
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