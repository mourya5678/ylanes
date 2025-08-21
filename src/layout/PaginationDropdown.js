import React from 'react';

const PaginationDropdown = ({ onChange }) => {
    return (
        <div className='d-flex align-items-center gap-2 '>
            <select className='ct_pagination_select_21 ct_cursor' onChange={(e) => onChange(e.target.value)}>
                <option value={5} >5</option>
                <option value={25} >25</option>
                <option value={50} >50</option>
                <option value={100} >100</option>
                <option value={250} >250</option>
            </select>
        </div>
    )
}

export default PaginationDropdown;