import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { pipGetAccessToken, pipViewDate, pipViewDate2, pipViewDate3 } from '../../auth/Pip';
import { getPostTopics } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { createRoomData, getRoomTypeData } from '../../redux/actions/createRoom';
import DateAndTimeModal from '../../components/Modals/DateAndTimeModal';
import moment from 'moment';
import * as Yup from 'yup';

const CreateRoom = ({ messageApi }) => {
    const { isLoading, postTopic } = useSelector((state) => state.authReducer);
    const { isCreateLoading, RoomType } = useSelector((state) => state.createRoomReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [userData, setUserData] = useState({});
    const [resources, setResources] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [isModalShow, setIsModalShow] = useState(false);
    const [currentMonthYear, setCurrentMonthYear] = useState();
    const [currentWeekDays, setCurrentWeekDays] = useState([]);
    const [isAddResources, setIsAddResources] = useState(false);
    const [joinAnonymously, setJoinAnonymously] = useState(false);
    const [fieldError, setFieldError] = useState({
        your_take_error: "",
        select_topic_error: "",
        date_and_time_error: "",
        select_room_type_error: "",
        join_anonymously_error: "",
    });
    const [fieldValues, setFieldValues] = useState({
        anonymouslyName: "",
        selectedTopic: "",
        yourTake: "",
        roomType: "",
        globalRoom: true,
        selectTime: ""
    });

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

    const handleAddField = () => {
        setResources([...resources, { id: resources[resources?.length - 1]?.id + 1, values: "" }]);
    };

    const handleRemoveField = (id) => {
        setResources(resources?.filter((resource) => resource?.id !== id));
        if (resources?.length == 1) {
            setIsAddResources(false);
        }
    };

    const handleChange = (id, value) => {
        const validation = Yup.string().trim().required("Field is required");
        const urlValidation = Yup.string()
            .trim()
            .required("Resource link is required")
            .matches(
                /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                "Enter a valid URL (e.g., google.com or https://google.com)"
            );
        const validation1 = Yup.string()
            .trim()
            .required("Your take is required")
            .min(50, "Your take must be at least 50 characters")
            .max(300, "Your take must be less than 300 characters");
        const isValid = validation.isValidSync(value);
        if (id == "anonymouse name") {
            setFieldValues((pre) => ({
                ...pre,
                anonymouslyName: value
            }));
            setFieldError((prev) => ({
                ...prev,
                join_anonymously_error: isValid ? "" : "Anonymouse screen name is required",
            }));
        } else if (id == "topic") {
            setFieldValues((pre) => ({
                ...pre,
                selectedTopic: value
            }));
            setFieldError((prev) => ({
                ...prev,
                select_topic_error: isValid ? "" : "Topic is required",
            }));
        } else if (id == "room type") {
            setFieldValues((pre) => ({
                ...pre,
                roomType: value
            }));
            setFieldError((prev) => ({
                ...prev,
                select_room_type_error: isValid ? "" : "Room type is required",
            }));
        } else if (id == "your take") {
            setFieldValues((pre) => ({
                ...pre,
                yourTake: value
            }));

            try {
                validation1.validateSync(value);
                setFieldError((prev) => ({
                    ...prev,
                    your_take_error: ""
                }));
            } catch (err) {
                setFieldError((prev) => ({
                    ...prev,
                    your_take_error: err.message
                }));
            }
            // setFieldValues((pre) => ({
            //     ...pre,
            //     yourTake: value
            // }));
            // setFieldError((prev) => ({
            //     ...prev,
            //     your_take_error: isValid1 ? "" : "Your take is required",
            // }));
        } else if (id == "global room") {
            setFieldValues((pre) => ({
                ...pre,
                globalRoom: value
            }));
        } else if (id == "Date Time") {
            setFieldValues((pre) => ({
                ...pre,
                selectTime: value
            }));
            const now = new Date();
            if (value <= now) {
                setFieldError((prev) => ({
                    ...prev,
                    date_and_time_error: "Selected date and time must be in the future.",
                }));
            } else {
                setFieldError((prev) => ({
                    ...prev,
                    date_and_time_error: "",
                }));
            };
            setFieldError((prev) => ({
                ...prev,
                date_and_time_error: isValid ? "" : "Date and time is required",
            }));
        } else {
            setResources(resources.map((resource) =>
                resource.id == id ? { ...resource, values: value } : resource
            ));
            urlValidation
                .validate(value)
                .then(() => {
                    setErrors((prev) => ({
                        ...prev,
                        [id]: "",
                    }));
                })
                .catch((err) => {
                    setErrors((prev) => ({
                        ...prev,
                        [id]: err.message,
                    }));
                });
        };
    };

    const validateAllFields = () => {
        let errors = {};
        const urlValidation = Yup.string()
            .trim()
            .required("Resource link is required")
            .matches(
                /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                "Enter a valid URL (e.g., google.com or https://google.com)"
            );
        if (joinAnonymously) {
            if (!fieldValues.anonymouslyName?.trim()) {
                setFieldError((prev) => ({
                    ...prev,
                    join_anonymously_error: "Anonymouse screen name is required",
                }));
                errors.anonymosly = "error";
            }
        };
        if (!fieldValues.selectedTopic?.trim()) {
            setFieldError((prev) => ({
                ...prev,
                select_topic_error: "Topic is required",
            }));
            errors.topic = "error";
        };
        if (!fieldValues.roomType?.trim()) {
            setFieldError((prev) => ({
                ...prev,
                select_room_type_error: "Room type is required",
            }));
            errors.room = "error";
        };
        if (!fieldValues.yourTake?.trim()) {
            setFieldError((prev) => ({
                ...prev,
                your_take_error: "Your take is required"
            }));
            errors.your_take = "Your take is required";
        } else if (fieldValues.yourTake.length < 50) {
            setFieldError((prev) => ({
                ...prev,
                your_take_error: "Your take must be at least 50 characters"
            }));
            errors.your_take = "Your take must be at least 50 characters";
        } else if (fieldValues.yourTake.length > 300) {
            setFieldError((prev) => ({
                ...prev,
                your_take_error: "Your take must be less than 300 characters"
            }));
            errors.your_take = "Your take must be less than 300 characters";
        }
        if (!fieldValues.selectTime) {
            setFieldError((prev) => ({
                ...prev,
                date_and_time_error: "Date and time is required"
            }));
            errors.selectTime = "error";
        } else {
            const now = new Date();
            if (new Date(fieldValues.selectTime) <= now) {
                setFieldError((prev) => ({
                    ...prev,
                    date_and_time_error: "Selected date and time must be in the future."
                }));
                errors.selectTime = "error";
            }
        };
        if (isAddResources) {
            if (resources && resources.length > 0) {
                const newResourceErrors = {};
                resources.forEach((resource) => {
                    if (!resource.values?.trim()) {
                        newResourceErrors[resource.id] = "Resource link is required";
                    } else {
                        try {
                            urlValidation.validateSync(resource.values);
                            newResourceErrors[resource.id] = "";
                        } catch (err) {
                            newResourceErrors[resource.id] = err.message;
                        }
                    }
                });
                setErrors((prev) => ({
                    ...prev,
                    ...newResourceErrors
                }));
                if (Object.values(newResourceErrors).some((msg) => msg)) {
                    errors.resource = "error";
                } else {
                    delete errors.resource;
                }
            }
        }
        return errors;
    };

    const handleSubmitCreateRoom = async () => {
        const errors = validateAllFields();
        if (Object.keys(errors).length > 0) {
            messageApi.error("Please Fill all the required fields");
            return;
        };
        const callback = (response) => {
            if (response?.meta?.message) {
                messageApi.success(response?.meta?.message);
                navigate(pageRoutes.myRoom);
            };
            setFieldValues({
                anonymouslyName: "",
                selectedTopic: "",
                yourTake: "",
                roomType: "",
                globalRoom: true,
                selectTime: ""
            });
            setFieldError({
                your_take_error: "",
                select_topic_error: "",
                date_and_time_error: "",
                select_room_type_error: "",
                join_anonymously_error: "",
            });
        };
        const startTime = new Date(fieldValues.selectTime);
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const formData = new FormData();
        formData.append("room[start_time]", startTime);
        formData.append("room[end_time]", endTime);
        formData.append("room[your_take]", fieldValues.yourTake);
        formData.append("room[is_global]", fieldValues.globalRoom);
        formData.append("room[account_id]", userData?.id);
        formData.append("room[category_id]", '');
        formData.append("room[sub_category_id]", '');
        formData.append("room[topic_id]", fieldValues.selectedTopic);
        formData.append("room[room_type_id]", fieldValues.roomType);
        formData.append("room[is_anonymously]", joinAnonymously);
        formData.append("room[anonymously_name]", fieldValues.anonymouslyName);
        formData.append("TZone", timeZone);
        // formData.append()
        formData.append(
            'registered_room[resources_attributes][][url]',
            this.state.oneLink,
        );
        dispatch(createRoomData({ payload: formData, callback, messageApi }))
    };


    if (isLoading || isCreateLoading) {
        return <Loader />
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Create Room
                                </h4>
                                <button
                                    className="ct_outline_border ct_w_100_767 ct_box_shadow_none"
                                    onClick={() => navigate(pageRoutes.userWallet)}
                                >
                                    <img src="assets/img/wallet_icon.png" alt="" width="20px" />
                                    {userData?.attributes?.ycoins ?? 0}
                                </button>
                            </div>
                            <form className="mt-4 ct_outline_bg">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label className="ct_fw_500 mb-2">Select Topics</label>
                                            <select className="form-control ct_input" value={fieldValues?.selectedTopic} onChange={(e) => handleChange("topic", e.target.value)}>
                                                <option value="">Select topics</option>
                                                {postTopic?.map((item) => (
                                                    <option value={item?.attributes?.id}>
                                                        {item?.attributes?.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {fieldError?.select_topic_error && (
                                            <p style={{ color: "red", whiteSpace: "normal", wordWrap: "break-word" }} className="text-red-500 text-xs">{fieldError?.select_topic_error}</p>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label className="ct_fw_500 mb-2">
                                                Select Room Type
                                            </label>
                                            <select className="form-control ct_input" value={fieldValues?.roomType} onChange={(e) => handleChange("room type", e.target.value)}>
                                                <option value="">Select Room Type</option>
                                                {RoomType?.map((item) => (
                                                    <option value={item?.id}>
                                                        {item?.attributes?.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {fieldError?.select_room_type_error && (
                                            <p style={{ color: "red", whiteSpace: "normal", wordWrap: "break-word" }} className="text-red-500 text-xs">{fieldError?.select_room_type_error}</p>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <label className="ct_fw_500 mb-2">Date and Time</label>
                                            <input
                                                type="text"
                                                placeholder="Select Date and Time"
                                                value={fieldValues?.selectTime ? pipViewDate3(fieldValues?.selectTime) : ''}
                                                onClick={() => setIsModalShow(true)}
                                                className="form-control ct_input"
                                            />
                                        </div>
                                        {fieldError?.date_and_time_error && (
                                            <p style={{ color: "red", whiteSpace: "normal", wordWrap: "break-word" }} className="text-red-500 text-xs">{fieldError?.date_and_time_error}</p>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <label className="ct_fw_500 mb-2">Your Take</label>
                                            <textarea
                                                className="form-control ct_input h-auto"
                                                rows="5"
                                                value={fieldValues?.yourTake}
                                                onChange={(e) => handleChange("your take", e.target.value)}
                                                placeholder="Please share what you will be bringing to this conversation a subtopic, experience, question, perspective, some ideas, etc. You can also share any relevant resources such as YouTube links, websites, Instagram / Pinterest pages, etc. using the link below"
                                            />
                                        </div>
                                        {fieldError?.your_take_error && (
                                            <p style={{ color: "red", whiteSpace: "normal", wordWrap: "break-word" }} className="text-red-500 text-xs">{fieldError?.your_take_error}</p>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex align-items-center gap-3 justify-content-between mb-2">
                                            <div className="d-flex align-items-center gap-3 ct_cursor" onClick={() => {
                                                setIsAddResources(true)
                                                resources?.length == 0 && setResources([{ id: 1, value: "" }])
                                            }}>
                                                <label for="ct_upload_file">
                                                    <i className="fa-solid fa-paperclip text-dark"></i>
                                                </label>
                                                <p
                                                    className="mb-0"
                                                >
                                                    Add Resources
                                                </p>
                                            </div>
                                            {isAddResources && resources?.length != 3 && (
                                                <div onClick={handleAddField}>
                                                    <i className="fa-solid fa-plus ct_cursor_pointer"></i>
                                                </div>
                                            )}
                                        </div>
                                        {isAddResources &&
                                            resources?.map((item) => (
                                                <div className='mb-4'>
                                                    <div className='position-relative mb-1'>
                                                        <input
                                                            type='text'
                                                            value={item?.values}
                                                            onChange={(e) => handleChange(item?.id, e.target.value)}
                                                            className='form-control ct_input pe-5'
                                                            placeholder='Enter your resource link'
                                                        />
                                                        <i className='fa-solid fa-trash-can ct_show_eye text-danger ct_cursor_pointer' onClick={() => handleRemoveField(item?.id)}></i>
                                                    </div>
                                                    {errors[item.id] && (
                                                        <p style={{ color: "red", whiteSpace: "normal", wordWrap: "break-word" }} className="text-red-500 text-xs">{errors[item.id]}</p>
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex align-items-center gap-3 mt-2 mb-4">
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={fieldValues?.globalRoom}
                                                    onClick={() => handleChange("global room", !fieldValues?.globalRoom)}
                                                />
                                                <div className="toggle-switch-background">
                                                    <div className="toggle-switch-handle"></div>
                                                </div>
                                            </label>
                                            <p className="mb-0">Global Room</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center ">
                                        <div className="form-check ct_custom_check2">
                                            <input
                                                className="form-check-input ct_cursor"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckDefault"
                                                checked={joinAnonymously}
                                                onClick={() => setJoinAnonymously(!joinAnonymously)}
                                            />
                                        </div>
                                        <p className="mb-0">JOIN ANONYMOUSLY</p>
                                    </div>
                                </div>
                                {joinAnonymously &&
                                    <div>
                                        <div className="form-group mt-4 mb-2">
                                            <label className="ct_fw_500 mb-2">
                                                Anonymous Screen Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Anonymous Screen Name"
                                                className="form-control ct_input"
                                                value={fieldValues?.anonymouslyName}
                                                onChange={(e) => handleChange("anonymouse name", e.target.value)}
                                            />
                                        </div>
                                        {fieldError?.join_anonymously_error && (
                                            <p style={{ color: "red", whiteSpace: "normal", wordWrap: "break-word" }} className="text-red-500 text-xs">{fieldError?.join_anonymously_error}</p>
                                        )}
                                    </div>
                                }
                                <div className="mt-4 text-center">
                                    <button type="button" onClick={handleSubmitCreateRoom} className="ct_yellow_btn mx-auto">
                                        Create Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {isModalShow && (
                <DateAndTimeModal
                    dateChange={(value) => setSelectedDate(value)}
                    onClick={() => setIsModalShow(false)}
                    currentMonthYear={currentMonthYear}
                    currentWeekDays={currentWeekDays}
                    setFieldValues={(value) => handleChange("Date Time", value)}
                    selectedDate={selectedDate}
                    messageApi={messageApi}
                />
            )}
        </div>
    );
};

export default CreateRoom;