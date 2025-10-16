import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotificationData, getNotificationData, markAsReadToAllNotificationsDate } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';
import { pipViewDate2 } from '../../auth/Pip';

const Notification = ({ messageApi }) => {
  const { notificationData, isLoading } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationData({ messageApi }));
  }, []);

  const deleteNotification = async (val) => {
    const callback = (response) => {
      messageApi.success(response?.message);
      dispatch(getNotificationData({ messageApi }));
    };
    dispatch(deleteNotificationData({ payload: val, callback, messageApi }));
  };

  const markAsReadNotification = async () => {
    dispatch(markAsReadToAllNotificationsDate({ messageApi }));
  };

  if (isLoading) {
    return <Loader />;
  };
  return (
    <div>
      <Header messageApi={messageApi} />
      <section className="ct_py_70">
        <div className="container">
          <div className="row ct_outline_bg">
            <div className="col-md-12">
              <h4 className="ct_fs_24 ct_fw_600 mb-4 ct_text_061F61">
                Notifications
              </h4>
              <div className="ct_light_black_bg d-flex align-items-center gap-3 mb-4 justify-content-between">
                <p className="mb-0 ct_fw_600">All</p>
                <p className="mb-0 ct_cursor" onClick={markAsReadNotification}>
                  <i className="fa-solid fa-check-double"></i>{" "}
                  Mark as read
                </p>
              </div>
              <div className="">
                <ul className="ct_notification_list ct_custom_scrollbar ct_pe_30">
                  {notificationData?.length != 0 &&
                    notificationData?.map((item) => (
                      <li className="d-flex align-items-center gap-2 justify-content-between">
                        <div>
                          <div>
                            <h4 className="ct_fs_18 ct_text_061F61 ct_fw_600">
                              {item?.attributes?.headings ?? ""}
                            </h4>
                            <p className="mb-0 ct_text_4B5563 ct_fs_14">
                              {item?.attributes?.contents ?? ""}
                            </p>
                          </div>
                          <p className="mb-0 ct_text_4B5563 ct_fs_14">
                            <i>{item?.attributes?.created_at ? pipViewDate2(item?.attributes?.created_at) : ""}</i>
                          </p>
                        </div>
                        <div>
                          <i className="fa-solid fa-trash-can mw-2 text-danger ct_cursor" onClick={() => deleteNotification(item?.attributes?.id)}></i>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notification;