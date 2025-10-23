import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const Settings = ({ messageApi }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header messageApi={messageApi} />
      <section className="ct_py_70">
        <div className="container">
          <div className="row ct_outline_bg">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between  gap-3 mb-4">
                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                  Settings
                </h4>
              </div>
              <div className="ct_wallet_list ct_seeting_list">
                <ul>
                  {/* <li>
                      <a className="d-flex align-items-center gap-2 justify-content-between text-dark">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src="assets/img/google-calendar.png"
                            alt=""
                            width="20px"
                          />
                          <p className="mb-0 ct_fw_600">
                            Sync Rooms to Google Calendar
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <div className="toggle-switch-background">
                            <div className="toggle-switch-handle"></div>
                          </div>
                        </label>
                      </a>
                    </li> */}
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.faq)}
                      className="d-flex align-items-center gap-2 justify-content-between text-dark"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="assets/img/information.png"
                          alt=""
                          width="20px"
                        />
                        <p className="mb-0 ct_fw_600">FAQS</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.refer)}
                      className="d-flex align-items-center gap-2 justify-content-between text-dark"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img src="assets/img/refer.png" alt="" width="20px" />
                        <div>
                          <p className="mb-0 ct_fw_600">Refer</p>
                          <small className="ct_text_op_6">
                            Get 100 YCoins per referral who signs up
                          </small>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.termAndCondition)}
                      className="d-flex align-items-center gap-2 justify-content-between text-dark"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="assets/img/terms-and-conditions.png"
                          alt=""
                          width="20px"
                        />
                        <p className="mb-0 ct_fw_600">Terms and Conditions</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.privacyPolicy)}
                      className="d-flex align-items-center gap-2 justify-content-between text-dark"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="assets/img/insurance.png"
                          alt=""
                          width="20px"
                        />
                        <p className="mb-0 ct_fw_600">Privacy Policy</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.feedback)}
                      className="d-flex align-items-center gap-2 justify-content-between text-dark"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="assets/img/feedback.png"
                          alt=""
                          width="20px"
                        />
                        <p className="mb-0 ct_fw_600">Provide feedback</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.blockUser)}
                      className="d-flex align-items-center gap-2 justify-content-between text-dark"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="assets/img/block-user.png"
                          alt=""
                          width="20px"
                        />
                        <p className="mb-0 ct_fw_600">Blocked User</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.friendRequests)}
                      className="d-flex align-items-center gap-2 justify-content-between text-dark"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="assets/img/ImageFriendRequest.png"
                          alt=""
                          width="20px"
                        />
                        <p className="mb-0 ct_fw_600">Friend Request</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(pageRoutes.deactiveAccount)}
                      className="d-flex align-items-center gap-2 justify-content-between text-danger"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="assets/img/delete.png"
                          alt=""
                          width="20px"
                        />
                        <p className="mb-0 ct_fw_600">Deactivate account</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-danger"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;