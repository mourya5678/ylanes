import React from 'react';
import LandingHeader from '../../components/LandingPageHeader';
import { useLocation } from 'react-router';

const BlogsDetails = ({ messageApi }) => {
  const { state } = useLocation();

  console.log({ state });

  return (
    <div>
      <LandingHeader />
      <section className="ct_py_70">
        <div className="container">
          <h4 className="ct_fs_28 ct_fw_600 mb-4">Blog Details</h4>
          <div className="row">
            <div className="col-md-12">
              <div class="ct_blog_dtl_box ct_blog_sticky">
                <div class="ct_blog_dtl_img">
                  <img src={state?.data?.image_url} alt="" />
                </div>
                <h4 class="text-naviblue mt-4">{state?.data?.heading ?? ""}</h4>
                <div dangerouslySetInnerHTML={{ __html: state?.data?.description ?? "" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="ct_footer_bg mt-5">
        <div className="container">
          <div className="footer-logo mb-3">
            <img src="assets/img/logo_white.png" alt="" />
          </div>
          <p>
            Redefining networking with a focus on authentic conversations,
            deep insights, and lasting bonds.
          </p>
          <div className="footer-nav mb-4">
            <a>About</a>
            <a>Blog</a>
            <a>FAQs</a>
            <a>Privacy Policy</a>
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
    </div>
  );
};

export default BlogsDetails;