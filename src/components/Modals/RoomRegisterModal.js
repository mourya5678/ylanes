import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { pageRoutes } from '../../routes/PageRoutes';
import { registerRoomData } from '../../redux/actions/createRoom';
import { useDispatch } from 'react-redux';


const RoomRegisterModal = ({ onClose, registerData, messageApi, onHandleClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [joinAnonymously, setJoinAnonymously] = useState(false);
    const [isAddResources, setIsAddResources] = useState(false);

    const [resources, setResources] = useState([]);
    const [fieldError, setFieldError] = useState({
        your_take_error: "",
        join_anonymously_error: "",
    });

    const [errors, setErrors] = useState([]);
    const [fieldValues, setFieldValues] = useState({
        anonymouslyName: "",
        yourTake: "",
    });

    const handleAddField = () => {
        setResources([...resources, { id: resources[resources?.length - 1]?.id + 1, values: "" }]);
    };

    const handleRemoveField = (id) => {
        setResources(resources?.filter((resource) => resource?.id !== id));
        if (resources?.length == 1) {
            setIsAddResources(false);
        };
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
            };
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

    const handleRegisterUser = async () => {
        const errors = validateAllFields();
        if (Object.keys(errors).length > 0) {
            messageApi.error("Please Fill all the required fields");
            return;
        };
        const callback = (response) => {
            onHandleClose();
            if (response) {
                messageApi.success("Room registered successfully.");
            }
            setFieldValues({
                anonymouslyName: "",
                yourTake: "",
            });
            setFieldError({
                your_take_error: "",
                join_anonymously_error: "",
            });
        };
        const formData = new FormData();
        formData.append("registered_room[your_take]", fieldValues.yourTake);
        formData.append('registered_room[room_id]', registerData?.id);
        formData.append('registered_room[anonymously_name]', fieldValues.anonymouslyName);
        if (resources?.length != 0) {
            resources?.map((item) => (
                formData.append('registered_room[resources_attributes][][url]', item)
            ))
        };
        dispatch(registerRoomData({ payload: formData, param: registerData?.id, callback, messageApi }));
    };

    return (
        <div className="modal  d-block ct_congratulation_modal_fade" tabIndex="-1">
            <div className="ct_modal-dialog modal-dialog-centered" style={{ maxWidth: "100%" }}>
                <div className="ct_room_ragister_modal ct_white_bg p-4 ">
                    <div className="d-flex align-items-center gap-2 justify-content-between mb-4 ">
                        <h4 className="ct_fs_20 mb-0 ct_fw_600">Register for Room</h4>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                        <h6 className="mb-0 ct_fw_600">
                            Price : <span className="ct_yellow_text">{registerData?.attributes?.room_price ?? 0} YCoins</span>
                        </h6>
                    </div>
                    <form>
                        <div className="form-group mb-3">
                            <lable className=" ct_fw_600 text-start mb-2 d-block">
                                Your Take
                            </lable>
                            <textarea
                                className="form-control ct_input h-auto"
                                rows="4"
                                onChange={(e) => handleChange("your take", e.target.value)}
                                placeholder="Please share what you will be bringing to this conversation a subtopic, experience, question, perspective, some ideas, etc. You can also share any relevant resources such as YouTube links, websites, Instagram / Pinterest pages, etc. using the link below"
                            ></textarea>
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
                            <p className="mb-2">JOIN ANONYMOUSLY</p>
                        </div>
                        {joinAnonymously &&
                            <div>
                                <div className="form-group mt-2 mb-2">
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
                        <p className="d-block mb-0 ct_fs_14  ct_text_op_6">
                            All calls are scheduled for 1 hour and extendable to 2 hours at
                            no extra cost.
                        </p>
                        <div className="text-center mt-4">
                            <button type="button" className="ct_yellow_btn px-5" onClick={handleRegisterUser}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RoomRegisterModal;