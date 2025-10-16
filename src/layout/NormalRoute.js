import React from 'react';

const NormalRoute = ({ children, messageApi }) => {
    return React?.Children?.map(children, child =>
        React?.isValidElement(child)
            ? React.cloneElement(child, { messageApi })
            : child
    );
};

export default NormalRoute;