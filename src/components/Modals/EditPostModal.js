import React, { useState } from 'react';
import { CreatePollSchema, CreatePostSchema } from '../../auth/Schema';
import { createPollData, getPollTypeData } from '../../redux/actions/createRoom';
import ErrorMessage from '../../layout/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { updatePostDetails } from '../../redux/actions/authActions';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";


const EditPostModal = ({ messageApi, onClose, postDetails, handleClose }) => {
    const dispatch = useDispatch();
    const [postImages, setPostImages] = useState([]);

    const [deleteImageID, setDeleteImageID] = useState([]);
    const [imagesList, setImagesList] = useState(postDetails?.attributes?.docs?.length != 0 ? postDetails?.attributes?.docs : []);

    const initialValues = {
        id: postDetails?.id,
        title: postDetails?.attributes?.body,
        topic: postDetails?.attributes?.topics
    };

    const handleUpdatePostData = (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            console.log({ response });
            messageApi.success(response?.meta?.message);
            handleClose();
        };
        const formData = new FormData();
        formData.append("body", values?.title);
        formData.append("catalogue_tag_id", "");
        formData.append("catalogue_tag_ids[]", "");
        if (deleteImageID?.length != 0) {
            formData.append("docs_ids", deleteImageID.join(','));
        };
        if (postImages?.length != 0) {
            postImages?.map((item) => formData.append("docs[]", item));
        };
        console.log({ formData });
        dispatch(updatePostDetails({ payload: formData, callback, messageApi, param: values?.id }));
    };

    const handleImageChanges = (e) => {
        const files = Array.from(e.target.files);
        setPostImages((prevImages) => [...prevImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        setPostImages((prev) => prev.filter((item, i) => i !== index));
    };

    const handleDeleteImage = (value) => {
        deleteImageID?.push(value?.id);
        setImagesList((pre) => pre?.filter((item) => item?.id != value?.id));
    };

    return (
        <div className="modal show d-block ct_congratulation_modal_fade" >
            <div className="modal-dialog ct_modal-dialog modal-dialog-centered" style={{ pointerEvents: "auto" }}>
                <div className="ct_upload_post_box" style={{ zIndex: "1" }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={CreatePostSchema}
                        onSubmit={(values, actions) =>
                            handleUpdatePostData(values, actions)
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
                            isSubmitting,
                            resetForm
                        }) => (
                            <form>
                                <div className="ct_outline_border d-block ct_border_radius_15">
                                    <div className=''>
                                        <div className="row">
                                            <div className="form-group mb-3">
                                                <div className='d-flex align-items-center gap-2 justify-content-between mb-2'>
                                                    <label className="ct_fw_600">What is happning?</label>
                                                    <div className='ct_cursor_pointer ct_fs_20 ct_text_op_6 ms-auto'>
                                                        <i className="fa-solid fa-circle-xmark" onClick={() => {
                                                            resetForm()
                                                            onClose()
                                                        }}></i>
                                                    </div>
                                                </div>
                                                <textarea
                                                    rows={4}
                                                    id="title"
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    value={values?.title}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="What is happning?"
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="title"
                                                />
                                            </div>
                                            <div>
                                                <label>
                                                    <input
                                                        multiple
                                                        type="file"
                                                        accept="image/*"
                                                        className="d-none"
                                                        id="ct_upload_file"
                                                        onChange={(e) => handleImageChanges(e)}
                                                    />
                                                    <i className="fa-solid fa-paperclip text-dark ct_cursor_pointer"></i>
                                                </label>
                                            </div>
                                            {imagesList?.length != 0 && (
                                                <div className="item">
                                                    <Swiper
                                                        modules={[Navigation]}
                                                        spaceBetween={30}
                                                        slidesPerView={3}
                                                        navigation
                                                        loop
                                                        autoplay={{ delay: 2000 }}
                                                    >
                                                        {imagesList?.map((item, i) => (
                                                            <SwiperSlide>
                                                                <div className="item">
                                                                    <div className="ct_post_img ct_single_uploaded_img">
                                                                        <img
                                                                            src={item?.url}
                                                                            alt=""
                                                                        />
                                                                        <i
                                                                            className="fa-solid fa-xmark"
                                                                            onClick={() =>
                                                                                handleDeleteImage(item)
                                                                            }
                                                                        ></i>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            )}
                                            {postImages?.length != 0 && (
                                                <div className="item mt-2">
                                                    <Swiper
                                                        modules={[Navigation]}
                                                        spaceBetween={30}
                                                        slidesPerView={3}
                                                        navigation
                                                        loop
                                                        autoplay={{ delay: 2000 }}
                                                    >
                                                        {postImages?.map((item, i) => (
                                                            <SwiperSlide>
                                                                <div className="item">
                                                                    <div className="ct_post_img ct_single_uploaded_img">
                                                                        <img
                                                                            src={URL.createObjectURL(item)}
                                                                            alt=""
                                                                        />
                                                                        <i
                                                                            className="fa-solid fa-xmark"
                                                                            onClick={() =>
                                                                                handleRemoveImage(i)
                                                                            }
                                                                        ></i>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="ct_yellow_btn ct_white_nowrap mt-2"
                                            >
                                                Update Post
                                            </button>
                                        </div>
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

export default EditPostModal;