import React from 'react';

const AboutTopicDetails = ({ onClose, data }) => {
    console.log({ data });
    return (
        <div
            className="modal  d-block ct_congratulation_modal_fade"
            tabIndex="-1"
        >
            <div
                className="ct_modal-dialog modal-dialog-centered"
                style={{ maxWidth: "100%" }}
            >
                <div className="ct_room_ragister_modal ct_white_bg p-4 ">
                    <div className=" mb-4 ">
                        <div className="d-flex align-items-center gap-2 justify-content-between mb-4 ">
                            <h4 className="ct_fs_20 mb-0 ct_fw_600">About this topic</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className=''>
                            <h4 className="ct_fs_18 mb-0 ct_fw_600 mb-2">{data?.topic_name ?? ""}</h4>
                            <p className='mb-0 ct_para_scroll ct_custom_scroll'>
                                {data?.description ?? ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AboutTopicDetails;