import React, { useState } from 'react';
import Header from '../../components/Header';

const Faq = ({ messageApi }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between  gap-3 mb-4">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    FaQ
                                </h4>
                            </div>
                            <div className="ct_how_works_collapse">
                                <div className="accordion" id="ct_how_works_accordion">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="ct_works_one">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapse_works_one" aria-expanded="true"
                                                aria-controls="collapse_works_one">
                                                Lorem ipsum dolor
                                            </button>
                                        </h2>
                                        <div id="collapse_works_one" className="accordion-collapse collapse show"
                                            aria-labelledby="ct_works_one" data-bs-parent="#ct_how_works_accordion">
                                            <div className="accordion-body">
                                                <p className="mb-0 ct_fs_16 ct_line_h_25">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea modi
                                                    veritatis. Incidunt, quidem enim! Velit architecto explicabo ipsam sapiente
                                                    voluptatem natus. Veniam perferendis blanditiis ullam qui architecto
                                                    doloremque totam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="ct_works_two">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapse_works_two" aria-expanded="false"
                                                aria-controls="collapse_works_two">
                                                Lorem ipsum dolor
                                            </button>
                                        </h2>
                                        <div id="collapse_works_two" className="accordion-collapse collapse"
                                            aria-labelledby="ct_works_two" data-bs-parent="#ct_how_works_accordion">
                                            <div className="accordion-body">
                                                <p className="mb-0 ct_fs_16 ct_line_h_25">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea modi
                                                    veritatis. Incidunt, quidem enim! Velit architecto explicabo ipsam sapiente
                                                    voluptatem natus. Veniam perferendis blanditiis ullam qui architecto
                                                    doloremque totam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="ct_works_three">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree" aria-expanded="false"
                                                aria-controls="collapseThree">
                                                Lorem ipsum dolor
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse"
                                            aria-labelledby="ct_works_three" data-bs-parent="#ct_how_works_accordion">
                                            <div className="accordion-body">
                                                <p className="mb-0 ct_fs_16 ct_line_h_25">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea modi
                                                    veritatis. Incidunt, quidem enim! Velit architecto explicabo ipsam sapiente
                                                    voluptatem natus. Veniam perferendis blanditiis ullam qui architecto
                                                    doloremque totam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="ct_works_four">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour" aria-expanded="false"
                                                aria-controls="collapseFour">
                                                Lorem ipsum dolor
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse"
                                            aria-labelledby="ct_works_four" data-bs-parent="#ct_how_works_accordion">
                                            <div className="accordion-body">
                                                <p className="mb-0 ct_fs_16 ct_line_h_25">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea modi
                                                    veritatis. Incidunt, quidem enim! Velit architecto explicabo ipsam sapiente
                                                    voluptatem natus. Veniam perferendis blanditiis ullam qui architecto
                                                    doloremque totam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Faq;