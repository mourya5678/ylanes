import React from 'react'
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { pipGetAccessToken } from '../../auth/Pip';

const LandingHeader = () => {
    const navigate = useNavigate();
    const data = window?.location?.pathname;
    const user_data = pipGetAccessToken("user_data");

    const handleRedirectToYlanes = () => {
        if (user_data?.id) {
            navigate(pageRoutes.dashboard);
        } else {
            navigate(pageRoutes?.login);
        };
    };

    return (
        <header className="ct_header ct_header_px_50">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ct_navbr_main">
                            <div className="ct_logo">
                                <a className=''>
                                    <img src="assets/img/logo.png" alt="" />
                                </a>
                            </div>
                            <div className="ct_navbar">
                                <ul>
                                    <div className="ct_close_menu">
                                        <i className="fa-solid fa-xmark"></i>
                                    </div>
                                    <li onClick={() => navigate(pageRoutes.landingPage)}>
                                        <a className={data == pageRoutes.landingPage && "active"}>Home</a>
                                    </li>
                                    <li onClick={() => navigate(pageRoutes?.aboutUs)}>
                                        <a className={data == pageRoutes.aboutUs && "active"}>About</a>
                                    </li>
                                    <li onClick={() => navigate(pageRoutes?.blogs)}>
                                        <a className={data == pageRoutes.blogs && "active"}>Blog</a>
                                    </li>
                                    <li onClick={() => navigate(pageRoutes.landingFaq)}>
                                        <a className={data == pageRoutes.landingFaq && "active"}>FAQs</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <a className="ct_yellow_btn" onClick={handleRedirectToYlanes}>Enter YLanes</a>
                                <div className="ct_menu_bar">
                                    <i className="fa-solid fa-bars-staggered"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default LandingHeader;