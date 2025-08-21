import React from 'react';
import { pipGetAccessToken } from '../auth/Pip';
import { Navigate } from 'react-router';
import { pageRoutes } from '../routes/PageRoutes';

const PrivateRoutes = ({ children, messageApi }) => {
    const isAuth = pipGetAccessToken("seller_token");
    if (isAuth) {
        return React?.Children?.map(children, child =>
            React?.isValidElement(child)
                ? React.cloneElement(child, { messageApi })
                : child
        );
    };
    return <Navigate to={pageRoutes.login} />;
};

export default PrivateRoutes;