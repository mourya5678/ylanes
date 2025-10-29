import React, { useState } from 'react';
import { CreatePollSchema } from '../../auth/Schema';
import { createPollData, getPollTypeData } from '../../redux/actions/createRoom';
import ErrorMessage from '../../layout/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

const CreatePollModal = ({ messageApi, onClose }) => {
    const { postTopic } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const [checkBox, setCheckBox] = useState(false);

    const [hours, setHours] = useState(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]);
    const [minutes, setMinutes] = useState(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]);

    const initialValues = {
        question: "",
        option1: "",
        option2: "",
        topic: "",
        durationHours: "00",
        durationMinuts: "01",
    };

    const handleCreatePoll = (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            if (response?.data?.status == 200 || response?.data?.status == 201) {
                messageApi.success("Poll Created SucessFully");
            } else {
                messageApi.error(response?.data?.errors?.message);
            }
            setOptions([]);
            setCheckBox(false);
            onClose();
        };
        let data12 = [
            {
                id: 1,
                value: values.option1
            },
            {
                id: 2,
                value: values.option2
            }
        ];
        const mergedOptions = [...options, ...data12];
        const listData = mergedOptions
            ?.filter((data) => !!data.value)
            .map((data) => ({
                body: data.value,
            }));
        let now = new Date();
        const convertedHour = parseInt(values.durationHours ?? 0, 10);
        const convertedMinute = parseInt(values.durationMinuts ?? 0, 10);
        const newTimestamp = new Date().getTime() + (convertedHour * 60 + convertedMinute) * 60 * 1000;
        const data = {
            "catalogue_tag_ids[]": values?.topic,
            catalogue_tag_id: values?.topic,
            body: values?.question,
            options_attributes: listData,
            multiple_choice: checkBox,
            hours: values.durationHours,
            minutes: values.durationMinuts,
            start_date_time: now,
            end_date_time: new Date(newTimestamp),
            poll: {
                "catalogue_tag_ids[]":
                    values?.topic,
                catalogue_tag_id:
                    values?.topic,
                body: values?.question ?? "",
                options_attributes: listData,
                multiple_choice: checkBox,
                hours: values.durationHours,
                minutes: values.durationMinuts,
                start_date_time: now,
                end_date_time: new Date(newTimestamp),
            }
        };
        dispatch(createPollData({ payload: data, messageApi, callback }));
    };

    const handleRemoveOption = (id) => {
        setOptions((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="modal show d-block ct_congratulation_modal_fade" >
            <div className="modal-dialog ct_modal-dialog modal-dialog-centered" style={{ pointerEvents: "auto" }}>
                <div className="ct_upload_post_box" style={{ zIndex: "1" }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={CreatePollSchema}
                        onSubmit={(values, actions) =>
                            handleCreatePoll(values, actions)
                        }
                        enableReinitialize
                    >
                        {({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            setFieldError,
                            isSubmitting,
                            resetForm
                        }) => (
                            <form>
                                <div className="ct_outline_border d-block ct_border_radius_15">
                                    <div className=''>
                                        <div className="row">
                                            <div className="form-group mb-3">
                                                <div className='d-flex align-items-center gap-2 justify-content-between mb-2'>
                                                    <label className="ct_fw_600">Type Your Question</label>
                                                    <div className='ct_cursor_pointer ct_fs_20 ct_text_op_6 ms-auto'>
                                                        <i className="fa-solid fa-circle-xmark" onClick={() => {
                                                            resetForm()
                                                            onClose()
                                                        }}></i>
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    id="question"
                                                    value={values.question}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="form-control ct_input"
                                                    placeholder="Enter Your Question"
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="question"
                                                />
                                            </div>
                                            <div className='row ct_para_scroll' style={{ maxHeight: "170px" }}>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mb-2 ct_fw_600">Choose 1</label>
                                                        <input
                                                            type="text"
                                                            className="form-control ct_input"
                                                            placeholder="Enter option"
                                                            id="option1"
                                                            value={values?.option1}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            touched={touched}
                                                            fieldName="option1"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mb-2 ct_fw_600">Choose 2</label>
                                                        <input
                                                            type="text"
                                                            className="form-control ct_input"
                                                            placeholder="Enter option"
                                                            id="option2"
                                                            value={values?.option2}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            touched={touched}
                                                            fieldName="option2"
                                                        />
                                                    </div>
                                                </div>
                                                {options?.length != 0 &&
                                                    options?.map((item, i) => (
                                                        <div className="col-md-6 mb-3">
                                                            <div className="form-group">
                                                                <label className="mb-2 ct_fw_600">Choose {i + 3}</label>
                                                                <div className='position-relative'>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control ct_input ct_pe_40"
                                                                        placeholder="Enter option"
                                                                        value={item?.value}
                                                                        onChange={(e) =>
                                                                            setOptions((prev) =>
                                                                                prev.map((opt) =>
                                                                                    opt.id === item.id ? { ...opt, value: e.target.value } : opt
                                                                                )
                                                                            )
                                                                        }
                                                                    />
                                                                    <i className="fa-solid fa-square-xmark ct_show_eye ct_del_q" onClick={() => handleRemoveOption(item?.id)}></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                            </div>
                                            {options?.length != 13 &&
                                                <div className="col-md-12 mb-3 mt-2">
                                                    <div className='text-end'>
                                                        <a className='ct_yellow_text ct_fw_600' onClick={() =>
                                                            setOptions((prev) => [
                                                                ...prev,
                                                                {
                                                                    id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 3,
                                                                    value: ""
                                                                }
                                                            ])
                                                        }>+ Add Another Option</a>
                                                    </div>
                                                </div>
                                            }
                                            <div>
                                                <label className="mb-2 ct_fw_600">Duration</label>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-group">
                                                            <select
                                                                className="form-control ct_input"
                                                                value={values.durationHours}
                                                                id="durationHours"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            >
                                                                {hours?.map((item) => (
                                                                    <option value={item}>{item} Hours</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <ErrorMessage
                                                            errors={errors}
                                                            touched={touched}
                                                            fieldName="durationHours"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-group">
                                                            <select
                                                                className="form-control ct_input"
                                                                id="durationMinuts"
                                                                value={values?.durationMinuts}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            >
                                                                {minutes?.map((item) => (
                                                                    <option value={item}>{item} Minutes</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <ErrorMessage
                                                            errors={errors}
                                                            touched={touched}
                                                            fieldName="durationMinuts"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex  align-items-center mt-0">
                                                <div className="form-check ct_custom_check2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={checkBox}
                                                        onClick={() => setCheckBox(!checkBox)}
                                                    />
                                                </div>
                                                <label><span className="ct_text_op_6" es>Allow multiple reponses</span></label>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 justify-content-between ct_flex_col_575 ct_border_top_1 pt-3 mt-3 ">
                                            <div className="d-flex align-items-center gap-3 ct_w_100_575">
                                                <select
                                                    className="form-control ct_input ct_w_100_575 ct_border_radius_100 h-auto p-2 px-3 ct_w_fit_content"
                                                    id="topic"
                                                    value={values.topic}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Topic</option>
                                                    {postTopic?.length != 0 &&
                                                        postTopic?.map((item) => (
                                                            <option value={item?.attributes?.id}>{item?.attributes?.name ?? ""}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <button type="button" onClick={handleSubmit} className="ct_yellow_btn ct_white_nowrap ct_w_100_575">Create Poll</button>
                                        </div>
                                        <ErrorMessage
                                            errors={errors}
                                            touched={touched}
                                            fieldName="topic"
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
};

export default CreatePollModal;