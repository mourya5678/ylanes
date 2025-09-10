import React, { useState } from 'react';

const DateAndTimeModal = ({ onClick, currentMonthYear, currentWeekDays, selectedDate, dateChange }) => {
    const [roomTime, setRoomTime] = useState(() => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        // Round minutes up to the nearest 15
        const remainder = minutes % 15;
        if (remainder !== 0) {
            minutes += 15 - remainder;
        }
        // Handle overflow (e.g., 12:60 → 1:00)
        if (minutes === 60) {
            minutes = 0;
            hours += 1;
        }
        // Convert 24h → 12h format
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
                                    <p className="ct_fs_16 ct_fw_600 ">{currentMonthYear ?? ''}</p>
                                    <div className='ct_grid_7_days'>
                                        {currentWeekDays?.map((item) => (
                                            <div className={`ct_day ${item?.date == selectedDate && "active"}`} >
                                                <p className='mb-0 text-center'>{item?.day ?? ""}</p>
                                                <span className='ct_cursor' onClick={() => dateChange(item?.date)}>{item?.date ?? ""}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='form-group mt-4'>
                                        <label className='mb-2 ct_fw_600'>Time</label>
                                        <div className='ct_increase_decrease_btns'>
                                            <button><i class="fa-solid fa-minus"></i></button>
                                            <div className='position-relative ct_pe_40'>
                                                <input type='text' placeholder='' value={roomTime} readOnly />
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