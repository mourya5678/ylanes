import React from 'react';
import Header from '../../components/Header';

const BlogsDetails = ({ messageApi }) => {
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ct_breadcrumb_ul">
                                <ul className="mb-0">
                                    <li>
                                        <a className="ct_fw_600 ct_yellow_text">Home</a>
                                    </li>
                                    <li className="ct_text_op_6">/</li>
                                    <a className="ct_fw_600 ct_yellow_text">Blogs</a>
                                    <li className="ct_text_op_6">/</li>
                                    <li className="ct_text_op_6">Blog Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div class="ct_blog_dtl_box ct_blog_sticky">
                                <div class="ct_blog_dtl_img">
                                    <img src="assets/img/blog.png" alt="assets/img/blog.png" />
                                </div>
                                <h6 className="ct_fs_14 ct_text_op_6">OCTOBER 7, 2022</h6>
                                <h4 class="text-naviblue">Dummy Title Goes Here</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudantium.
                                </p>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                                    ratione voluptatem sequi nesciunt.
                                </p>

                                <div>
                                    <h4 class="ct_fs_20 ct_fw_600">Step 1: Dummy Step Title</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Quis autem vel eum iure reprehenderit qui in ea voluptate
                                        velit esse quam nihil molestiae consequatur.
                                    </p>
                                    <ul class="ps-4 ct_list_style_disc">
                                        <li>Dummy list item one</li>
                                        <li>Dummy list item two</li>
                                        <li>Dummy list item three</li>
                                    </ul>
                                    <p>
                                        Ut enim ad minima veniam, quis nostrum exercitationem
                                        ullam corporis suscipit laboriosam nisi ut aliquid ex ea
                                        commodi consequatur?
                                    </p>
                                </div>

                                <div class="step">
                                    <h4 class="ct_fs_20 ct_fw_600">Step 2: Dummy Step Title</h4>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                    <ul class="ps-4 ct_list_style_disc">
                                        <li>
                                            <strong>Dummy bold:</strong> Lorem ipsum dolor sit amet.
                                        </li>
                                        <li>
                                            <strong>Dummy bold:</strong> Sed ut perspiciatis unde
                                            omnis.
                                        </li>
                                    </ul>
                                    <p>
                                        Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>

                                <div>
                                    <h4 class="ct_fs_20 ct_fw_600">Step 3: Dummy Step Title</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Ut enim ad minima veniam, quis nostrum exercitationem.
                                    </p>
                                    <ul class="ps-4 ct_list_style_disc">
                                        <li>
                                            <strong>Dummy:</strong> Item description text.
                                        </li>
                                        <li>
                                            <strong>Dummy:</strong> Item description text.
                                        </li>
                                        <li>
                                            <strong>Dummy:</strong> Item description text.
                                        </li>
                                    </ul>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </div>

                                <h4 class="ct_fs_20 ct_fw_600">Step 4: Dummy Step Title</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <ul class="ps-4 ct_list_style_disc">
                                    <li>
                                        <strong>Dummy:</strong> List item text.
                                    </li>
                                    <li>
                                        <strong>Dummy:</strong> List item text.
                                    </li>
                                    <li>
                                        <strong>Dummy:</strong> List item text.
                                    </li>
                                </ul>
                                <p class="callout">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>

                                <h4 class="ct_fs_20 ct_fw_600">Step 5: Dummy Step Title</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <ul class="ps-4 ct_list_style_disc">
                                    <li>
                                        <strong>Dummy:</strong> List item text.
                                    </li>
                                    <li>
                                        <strong>Dummy:</strong> List item text.
                                    </li>
                                    <li>
                                        <strong>Dummy:</strong> List item text.
                                    </li>
                                </ul>
                                <p class="muted">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>

                                <h4 class="ct_fs_20 ct_fw_600">Step 6: Dummy Step Title</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <ul class="ps-4 ct_list_style_disc">
                                    <li>Dummy list item</li>
                                    <li>Dummy list item</li>
                                    <li>Dummy list item</li>
                                    <li>Dummy list item</li>
                                </ul>
                                <p class="muted">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>

                                <h4 class="ct_fs_20 ct_fw_600">Step 7: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>
                                <p class="muted">Lorem ipsum dolor sit amet.</p>

                                <h4 class="ct_fs_20 ct_fw_600">Step 8: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc mb-3">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>

                                <h4 class="ct_fs_20 ct_fw_600">Step 9: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc mb-3">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>

                                <h4 class="ct_fs_20 ct_fw_600">Step 10: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc mb-3">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>

                                <h4 class="ct_fs_20 ct_fw_600">Step 11: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc mb-3">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>

                                <h4 class="ct_fs_20 ct_fw_600">Step 12: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc mb-3">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>

                                <h4 class="ct_fs_20 ct_fw_600">Step 13: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc mb-3">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>

                                <h4 class="ct_fs_20 ct_fw_600">Step 14: Dummy Step Title</h4>
                                <ul class="ps-4 ct_list_style_disc mb-3">
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                    <li>Dummy item</li>
                                </ul>

                                <h4 class="ct_fs_20 ct_fw_600">Conclusion</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Vivamus efficitur, augue sit amet bibendum malesuada, libero
                                    odio hendrerit felis, vitae egestas justo sapien sed risus.
                                </p>
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