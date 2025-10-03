import React from 'react';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';

const LandingPageFooter = () => {
    const navigate = useNavigate();

    return (
        <footer className="ct_footer_bg mt-5">
            <div className="container">
                <div className="footer-logo mb-3">
                    <img src="assets/img/logo_white.png" alt="" />
                </div>
                <p>
                    Redefining networking with a focus on authentic conversations, deep
                    insights, and lasting bonds.
                </p>
                <div className="footer-nav mb-4">
                    <a onClick={() => navigate(pageRoutes.aboutUs)}>About</a>
                    <a onClick={() => navigate(pageRoutes.blogs)}>Blog</a>
                    <a onClick={() => navigate(pageRoutes.landingFaq)}>FAQs</a>
                    <a onClick={() => navigate(pageRoutes.privacyPolicy)}>Privacy Policy</a>
                </div>
                <div className="footer-icons mb-4">
                    <a aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
                <div className="footer-bottom">
                    © 2024 yLanes. All rights reserved
                </div>
            </div>
        </footer>
    )
};

export default LandingPageFooter;