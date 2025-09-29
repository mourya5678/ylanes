import React, { useEffect, useState } from 'react';

const CalculatePollEndTime = ({ end_date_time }) => {
    const [showTime, setShowTime] = useState('Poll ends in');

    useEffect(() => {
        const data = timeRemaining();
        setShowTime(data);
    }, []);

    const timeRemaining = () => {
        const endTime = new Date(end_date_time)
        const now = new Date();
        const diffMs = endTime - now;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const label = 'Poll ends in '
        if (hours <= 0 && minutes <= 0) {
            return 'Poll Ended';
        } else if (hours === 0) {
            return `${label} ${minutes} minutes`;
        } else if (minutes === 0) {
            return `${label} ${hours} hours`;
        } else {
            return `${label} ${hours} hours ${minutes} minutes`;
        };
    };

    return (
        <div>
            <small className='ct_text_op_6 ct_fs_12 d-block mt-2'>
                <i class="fa-regular fa-clock me-1" />
                {showTime ?? ""}
            </small>
        </div>
    )
};

export default CalculatePollEndTime;