import React from 'react';

const SharePostModal = ({ shareCode, messageApi }) => {
    return (
        <div className="modal show d-block ct_congratulation_modal_fade" tabIndex="-1">
            <div className="ct_modal-dialog modal-dialog-centered">
                SharePostModal
                {console.log({ shareCode })}
            </div>
        </div>
    )
};

export default SharePostModal;