import React from 'react'
import Header from '../../components/Header';
import LandingHeader from '../../components/LandingPageHeader';
import { Navigate, useNavigate } from "react-router";
import { pageRoutes } from "../../routes/PageRoutes";

const BlogsList = ({ messageApi }) => {
  const Navigate = useNavigate();
  return (
    <div>
      <LandingHeader />

      <section className=" ct_py_70">
        <div className="container ">
          <h4 className="ct_fs_28 ct_fw_600 mb-4">Blogs</h4>
          <div className="row">
            <div className="col-xl-4 col-md-6  mb-4">
              <figure class="ct_blog_card">
                <div class="ct_blog_img">
                  <img src="assets/img/blog.png" alt="" />
                </div>
                <figcaption>
                  <h4 class="ct_fs_18 ct_minimise_cnt mb-0 ct_white_space_normal">
                    Where to List Your Rental Property for Maximum Exposure and
                    Minimal Fees
                  </h4>
                  <ul>
                    <li>Tips & Insights</li>
                    <li>
                      <span class="ct_grey_dot"></span>
                    </li>
                    <li>May 22, 2025</li>
                  </ul>
                  <p class="ct_minimise_cnt ct_white_space_normal mb-0">
                    Just snapping a few pictures and posting online is not
                    enough when listing a rental.
                  </p>

                  <div class="mt-3">
                    <a
                      onClick={() => Navigate(pageRoutes?.blogsDetails)}
                      class="ct_orange_link ct_text_upercase"
                    >
                      Read More <i class="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="col-xl-4 col-md-6  mb-4">
              <figure class="ct_blog_card">
                <div class="ct_blog_img">
                  <img src="assets/img/blog.png" alt="" />
                </div>
                <figcaption>
                  <h4 class="ct_fs_18 ct_minimise_cnt mb-0 ct_white_space_normal">
                    Where to List Your Rental Property for Maximum Exposure and
                    Minimal Fees
                  </h4>
                  <ul>
                    <li>Tips & Insights</li>
                    <li>
                      <span class="ct_grey_dot"></span>
                    </li>
                    <li>May 22, 2025</li>
                  </ul>
                  <p class="ct_minimise_cnt ct_white_space_normal mb-0">
                    Just snapping a few pictures and posting online is not
                    enough when listing a rental.
                  </p>

                  <div class="mt-3">
                    <a
                      onClick={() => Navigate(pageRoutes?.blogsDetails)}
                      class="ct_orange_link ct_text_upercase"
                    >
                      Read More <i class="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="col-xl-4 col-md-6  mb-4">
              <figure class="ct_blog_card">
                <div class="ct_blog_img">
                  <img src="assets/img/blog.png" alt="" />
                </div>
                <figcaption>
                  <h4 class="ct_fs_18 ct_minimise_cnt mb-0 ct_white_space_normal">
                    Where to List Your Rental Property for Maximum Exposure and
                    Minimal Fees
                  </h4>
                  <ul>
                    <li>Tips & Insights</li>
                    <li>
                      <span class="ct_grey_dot"></span>
                    </li>
                    <li>May 22, 2025</li>
                  </ul>
                  <p class="ct_minimise_cnt ct_white_space_normal mb-0">
                    Just snapping a few pictures and posting online is not
                    enough when listing a rental.
                  </p>

                  <div class="mt-3">
                    <a
                      onClick={() => Navigate(pageRoutes?.blogsDetails)}
                      class="ct_orange_link ct_text_upercase"
                    >
                      Read More <i class="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="col-xl-4 col-md-6  mb-4">
              <figure class="ct_blog_card">
                <div class="ct_blog_img">
                  <img src="assets/img/blog.png" alt="" />
                </div>
                <figcaption>
                  <h4 class="ct_fs_18 ct_minimise_cnt mb-0 ct_white_space_normal">
                    Where to List Your Rental Property for Maximum Exposure and
                    Minimal Fees
                  </h4>
                  <ul>
                    <li>Tips & Insights</li>
                    <li>
                      <span class="ct_grey_dot"></span>
                    </li>
                    <li>May 22, 2025</li>
                  </ul>
                  <p class="ct_minimise_cnt ct_white_space_normal mb-0">
                    Just snapping a few pictures and posting online is not
                    enough when listing a rental.
                  </p>

                  <div class="mt-3">
                    <a
                      onClick={() => Navigate(pageRoutes?.blogsDetails)}
                      class="ct_orange_link ct_text_upercase"
                    >
                      Read More <i class="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="col-xl-4 col-md-6  mb-4">
              <figure class="ct_blog_card">
                <div class="ct_blog_img">
                  <img src="assets/img/blog.png" alt="" />
                </div>
                <figcaption>
                  <h4 class="ct_fs_18 ct_minimise_cnt mb-0 ct_white_space_normal">
                    Where to List Your Rental Property for Maximum Exposure and
                    Minimal Fees
                  </h4>
                  <ul>
                    <li>Tips & Insights</li>
                    <li>
                      <span class="ct_grey_dot"></span>
                    </li>
                    <li>May 22, 2025</li>
                  </ul>
                  <p class="ct_minimise_cnt ct_white_space_normal mb-0">
                    Just snapping a few pictures and posting online is not
                    enough when listing a rental.
                  </p>

                  <div class="mt-3">
                    <a
                      onClick={() => Navigate(pageRoutes?.blogsDetails)}
                      class="ct_orange_link ct_text_upercase"
                    >
                      Read More <i class="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="col-xl-4 col-md-6  mb-4">
              <figure class="ct_blog_card">
                <div class="ct_blog_img">
                  <img src="assets/img/blog.png" alt="" />
                </div>
                <figcaption>
                  <h4 class="ct_fs_18 ct_minimise_cnt mb-0 ct_white_space_normal">
                    Where to List Your Rental Property for Maximum Exposure and
                    Minimal Fees
                  </h4>
                  <ul>
                    <li>Tips & Insights</li>
                    <li>
                      <span class="ct_grey_dot"></span>
                    </li>
                    <li>May 22, 2025</li>
                  </ul>
                  <p class="ct_minimise_cnt ct_white_space_normal mb-0">
                    Just snapping a few pictures and posting online is not
                    enough when listing a rental.
                  </p>

                  <div class="mt-3">
                    <a
                      onClick={() => Navigate(pageRoutes?.blogsDetails)}
                      class="ct_orange_link ct_text_upercase"
                    >
                      Read More <i class="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </figcaption>
              </figure>
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
            Redefining networking with a focus on authentic conversations, deep
            insights, and lasting bonds.
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

export default BlogsList;