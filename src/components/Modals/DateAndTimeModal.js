import React, { useState } from 'react';

const DateAndTimeModal = ({ onClick }) => {
    const [roomTime, setRoomTime] = useState(() => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");
        return `${hours}:${formattedMinutes}`;
    });

    const [selectAmPm, setSelectAmPm] = useState(() => {
        const now = new Date();
        return now.getHours() >= 12 ? "PM" : "AM";
    });


    return (
        <div className="modal show d-block ct_congratulation_modal_fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header pb-0 border-0">
                        <button
                            type="button"
                            className="btn-close ct_close"
                            onClick={onClick}
                        >
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="ct_delete_modal_modal">
                            <figure>
                                <figcaption className="mt-0">
                                    <p className="ct_fs_16 ct_fw_600 ">September, 2025</p>
                                    <div className='ct_grid_7_days'>
                                        <div className='ct_day'>
                                            <p className='mb-0 text-center'>Fri</p>
                                            <span>01</span>
                                        </div>
                                        <div className='ct_day'>
                                            <p className='mb-0 text-center'>Sat</p>
                                            <span>02</span>
                                        </div>
                                        <div className='ct_day'>
                                            <p className='mb-0 text-center'>Sun</p>
                                            <span>03</span>
                                        </div>
                                        <div className='ct_day'>
                                            <p className='mb-0 text-center'>Mon</p>
                                            <span>04</span>
                                        </div>
                                        <div className='ct_day'>
                                            <p className='mb-0 text-center'>Tue</p>
                                            <span>05</span>
                                        </div>
                                        <div className='ct_day'>
                                            <p className='mb-0 text-center'>Wed</p>
                                            <span>06</span>
                                        </div>
                                        <div className='ct_day'>
                                            <p className='mb-0 text-center'>Thu</p>
                                            <span>07</span>
                                        </div>
                                    </div>
                                    <div className='form-group mt-4'>
                                        <label className='mb-2 ct_fw_600'>Time</label>
                                        <div className='ct_increase_decrease_btns'>
                                            <button><i class="fa-solid fa-minus"></i></button>
                                            <div className='position-relative ct_pe_40'>
                                                <input type='text' placeholder='' value={roomTime} disabled />
                                                <select className='ct_show_eye' value={selectAmPm} onChange={(e) => setSelectAmPm(e.target.value)}>
                                                    <option value="AM">AM</option>
                                                    <option value="PM">PM</option>
                                                </select>
                                            </div>
                                            <button><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <div className="modal-footer px-0 justify-content-center border-0 ct_modal_footer">
                                <button
                                    type="button"
                                    className="ct_outline_btn ct_border_radius_10 w-100 ct_fw_600"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="ct_yellow_btn ct_border_radius_10 w-100 ct_fw_600"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                {/* <button
                                    type="button"
                                    className={`${btnName == "Approve" ? "ct_green_btn" : "ct_red_btn"
                                        } w-100 ct_fw_600`}
                                    onClick={handleDelete}
                                    data-bs-dismiss="modal"
                                >
                                    {btnName}
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DateAndTimeModal;