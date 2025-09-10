import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { pipGetAccessToken } from '../../auth/Pip';
import { getPostTopics } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { getRoomTypeData } from '../../redux/actions/createRoom';
import DateAndTimeModal from '../../components/Modals/DateAndTimeModal';
import { Formik } from 'formik';
import { CreateRoomSchema } from '../../auth/Schema';
import moment from 'moment';

const CreateRoom = ({ messageApi }) => {
    const { isLoading, postTopic } = useSelector((state) => state.authReducer);
    const { isCreateLoading, RoomType } = useSelector((state) => state.createRoomReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({});
    const [isModalShow, setIsModalShow] = useState(false);

    const [selectedDate, setSelectedDate] = useState();
    const [currentMonthYear, setCurrentMonthYear] = useState();

    const [currentWeekDays, setCurrentWeekDays] = useState([]);

    const [isAddResources, setIsAddResources] = useState(false);

    const initialState = {
        topic: "",
        room_type: "",
        date_time: "",
        your_take: "",
        screen_name: "",
        global_room: false,
        add_resources: false,
        join_anonymously: false
    };

    useEffect(() => {
        const data = pipGetAccessToken("user_data");
        setUserData(data);
        dispatch(getPostTopics({ messageApi }));
        dispatch(getRoomTypeData({ messageApi }));
        getDateAndTimeData();
    }, []);

    const getDateAndTimeData = () => {
        const date = new Date()
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        setCurrentMonthYear(`${month} , ${year}`);
        var currentDate = moment();
        var weekStart = currentDate;
        var days = [];
        for (var i = 0; i <= 6; i++) {
            let dateobj = moment(weekStart).add(i, 'days').format("MMMM-DD-ddd").split('-');
            let obj = {
                month: dateobj[0],
                date: dateobj[1],
                day: dateobj[2],
                fullDateObj: moment(weekStart).add(i, 'days').format("YYYY-MM-DD")
            };
            days.push(obj);
        };
        let todayDay = moment().format("DD");
        setSelectedDate(todayDay);
        setCurrentWeekDays(days);
    };

    const handleSubmitCreateRoom = (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            console.log(response);
        };
        const data = {
            "room[start_time]": "",
            "room[end_time]": "",
            "room[your_take]": "",
            "room[is_global]": "",
            "room[account_id]": "",
            "room[category_id]": "",
            "room[sub_category_id]": "",
            "room[topic_id]": "",
            "room[room_type_id]": "",
            "room[is_anonymously]": "",
            "room[anonymously_name]": "",
            "TZone": ""
        }
    }

    // if (isLoading || isCreateLoading) {
    //     return <Loader />
    // };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">Create Room</h4>
                                <button className="ct_outline_border ct_w_100_767" onClick={() => navigate(pageRoutes.userWallet)}>
                                    <img src="assets/img/wallet_icon.png" alt="" width="20px" />
                                    {userData?.attributes?.ycoins ?? 0}
                                </button>
                            </div>
                            <Formik
                                initialValues={initialState}
                                validationSchema={CreateRoomSchema}
                                onSubmit={(values, actions) =>
                                    handleSubmitCreateRoom(values, actions)
                                }
                                enableReinitialize
                            >

                            </Formik>
                            <form className="mt-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Select Topics</label>
                                            <select className="form-control ct_input">
                                                <option value="">Select topics</option>
                                                {postTopic?.map((item) => (
                                                    <option value={item?.attributes?.id}>{item?.attributes?.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Select Room Type</label>
                                            <select className="form-control ct_input">
                                                <option value="">Select Room Type</option>
                                                {RoomType?.map((item) => (
                                                    <option value={item?.id}>{item?.attributes?.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Date and Time</label>
                                            <input type="text" placeholder='Select Date and Time' onClick={() => setIsModalShow(true)} className="form-control ct_input" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Your Take</label>
                                            <textarea className="form-control ct_input h-auto" rows="5" placeholder='Please share what you will be bringing to this conversation a subtopic, experience, question, perspective, some ideas, etc. You can also share any relevant resources such as YouTube links, websites, Instagram / Pinterest pages, etc. using the link below' />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className='d-flex align-items-center gap-3 justify-content-between mb-2'>
                                            <div className="d-flex align-items-center gap-3 ">
                                                <label for="ct_upload_file">
                                                    <input type="file" className="d-none" id="ct_upload_file" />
                                                    <i className="fa-solid fa-paperclip text-dark"></i>
                                                </label>
                                                <p className="mb-0" onClick={() => setIsAddResources(true)}>Add Resources</p>
                                            </div>
                                            {isAddResources &&
                                                <div>
                                                    <i className='fa-solid fa-plus ct_cursor_pointer'></i>
                                                </div>
                                            }
                                        </div>
                                        {isAddResources &&
                                            <div className='position-relative mb-4'>
                                                <input type='text' className='form-control ct_input pe-5' placeholder='Enter your resource link' />
                                                <i className='fa-solid fa-trash-can ct_show_eye text-danger ct_cursor_pointer'></i>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex align-items-center gap-3 mt-2 mb-4">
                                            <label className="toggle-switch">
                                                <input type="checkbox" />
                                                <div className="toggle-switch-background">
                                                    <div className="toggle-switch-handle"></div>
                                                </div>
                                            </label>
                                            <p className="mb-0">Global Room</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center ">
                                        <div className="form-check ct_custom_check2">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                        <p className="mb-0">JOIN ANONYMOUSLY</p>
                                    </div>
                                </div>
                                <div className="form-group mt-4 mb-4">
                                    <label className="ct_fw_500 mb-2">Anonymous Screen Name</label>
                                    <input type="text" placeholder='Screen Name' onClick={() => setIsModalShow(true)} className="form-control ct_input" />
                                </div>
                                <div className="mt-4 text-center">
                                    <button type='button' className="ct_yellow_btn mx-auto">Create Room</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
            {isModalShow &&
                <DateAndTimeModal
                    onClick={() => setIsModalShow(false)}
                    currentMonthYear={currentMonthYear}
                    currentWeekDays={currentWeekDays}
                    selectedDate={selectedDate}
                    dateChange={(value) => setSelectedDate(value)}
                />
            }
        </div >
    )
};

export default CreateRoom;