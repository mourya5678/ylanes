import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { pipGetAccessToken } from '../../auth/Pip';

const LandingHeader = () => {
    const navigate = useNavigate();
    const data = window?.location?.hash != "" ? window?.location?.hash?.split('#')[1] : window?.location?.pathname;
    const [handleSideBarShow, setHanldeSideBarShow] = useState(false);
    const user_data = pipGetAccessToken("user_data");

    const [isInstaGram, setIsInstaGram] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent || "";
        const isInstagram = ua.includes("Instagram");
        if (isInstagram) {
            setIsInstaGram(true)
            console.log("Inside Instagram browser");
        } else {
            setIsInstaGram(false)
            console.log("Not !!")
        }
    }, []);

    const handleRedirectToYlanes = () => {
        if (user_data?.id) {
            navigate(pageRoutes.dashboard);
        } else {
            console.log("object")
            if (isInstaGram) {
                const ua = navigator.userAgent || navigator.vendor || window.opera;
                if (/android/i.test(ua)) navigate(pageRoutes.login);
                if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
                    const url = "https://ylanes.com/?fbclid=PAdGRleAOCZx9leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafT7mRDyVMnqEw0aGYswOGQKN4hZwvy3MHWVNcej9e0ohsrDppjb1iO1zc23w_aem_WN2ZmEL4-hlGrr4XcHs6XA";
                    window.open(url, "_blank");
                };
            } else {
                navigate(pageRoutes.login);
            };
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
                            <div className={`ct_navbar ${handleSideBarShow && "ct_show"}`}>
                                <ul>
                                    <div className="ct_close_menu" onClick={() => setHanldeSideBarShow(false)}>
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
                                <div className="ct_menu_bar" onClick={() => setHanldeSideBarShow(true)}>
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