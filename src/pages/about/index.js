import React from 'react';
import LandingHeader from '../../components/LandingPageHeader';
import LandingPageFooter from '../../components/LandingPageFooter';

const AboutUs = ({ messageApi }) => {
  return (
    <div>
      <LandingHeader />
      <section className="ct_section_banner">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-10 mx-auto mb-4">
              <div className="ct_banner_title ct_header_px_50 text-center">
                <h2 className="ct_fs_44 mb-2 ct_fw_700">
                  Men Need a Zone to Be Real.
                </h2>
                <p className="ct_fs_18 ct_text_op_6 mb-4">
                  Always being judged? At YLanes, no bosses, spouses, or
                  awkward WhatsApp groups. Just unfiltered, idea-packed
                  conversations about everything you love-from F1 to finance,
                  fatherhood to fitness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ct_why_bg py-5 text-white">
        <div className="container">
          <div className="row ct_before_row_12">
            <div className="col-md-6 mx-auto">
              <div className="text-center">
                <h2 className="mb-4 fw-bold">Our Message</h2>
                <p>
                  Where Men Think Loud and Laugh Louder. YLanes is your space
                  to swap sharp ideas, bold opinions, and intelligent
                  banter-minus the fluff. Got something to say?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ct_why_bg bg-white py-5 ">
        <div className="container-fluid text-center">
          <h2 className=" fw-bold text-dark">Why YLanes?</h2>
          <p className="mb-0">Why YLanes? Because Men Deserve Better.</p>
          <div className="row  g-4 mt-4">
            <div className="col-lg-4 col-md-6">
              <div className="ct_why_choose_card p-4 h-100 rounded">
                <h5 className="ct_fs_20 mb-4 ct_yellow_text">
                  For Your Mind
                </h5>
                <p>
                  From IPL Salaries to AI Stocks-debate what matters, with
                  people who get it.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ct_why_choose_card p-4 h-100 rounded">
                <h5 className="ct_fs_20 mb-4 ct_yellow_text">
                  For Your Voice
                </h5>
                <p>Strong opinions? Fine. Harassment? Never.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ct_why_choose_card p-4 h-100 rounded">
                <h5 className="ct_fs_20 mb-4 ct_yellow_text">
                  For Your Zone
                </h5>
                <p>
                  A club unwind, banter, and leave with ideas sharper than
                  your suits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ct_why_bg py-5 text-white">
        <div className="container">
          <div className="row ct_before_row_12">
            <div className="col-md-6 mx-auto">
              <div className="text-center">
                <h2 className="mb-4 fw-bold">Founders' Corner</h2>
                <p>
                  YLanes was born from a simple truth: men need a space for
                  bold ideas, honest banter, and real camaraderie. No loud
                  bars, no unread group chats-just a platform where your
                  quirky, witty. funny ideas find a worthy space.
                </p>
                <p>-Deepti Punjabi & Rajesh voturi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <h2 className="mb-3 fw-bold"> You are welcome</h2>
                <p className="mb-0">Join the Club Where Men Think Boldly.</p>
                <p className="mb-0">
                  Dive into unfiltered ideas, sharp debates, and conversations
                  that matter. The door is open-you are welcome!.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-5">
        <div className="container ">
          <div className="ct_newsletter_bg">
            <h2 className="ct_fs_28 mb-4">
              Your Ideas, Your Voice, Your Club.
            </h2>
            <p>
              YLanes isn't just a platform-it's a think tank for bold men.
              Challenge, connect, and grow. Dare to take your seat?
            </p>

            <div className="d-flex align-items-center gap-3 justify-content-center ct_flex_col_767">
              <button className="newsletter-btn ct_w_100_767">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src="assets/img/google_play_icon.svg"
                    className="ct_flex_shrink_0 ct_icon_36"
                  />
                  <div className="text-start">
                    <p className="ct_fs_14 mb-0 ct_text_op_6 text-white ct_fw_500">
                      GET IT ON
                    </p>
                    <h6 className="mb-0">Google Play</h6>
                  </div>
                </div>
              </button>
              <button className="newsletter-btn ct_w_100_767">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src="assets/img/app_store_icon.svg"
                    className="ct_flex_shrink_0 ct_icon_36"
                  />
                  <div className="text-start">
                    <p className="ct_fs_14 mb-0 ct_text_op_6 text-white ct_fw_500">
                      GET IT ON
                    </p>
                    <h6 className="mb-0">App Store</h6>
                  </div>
                </div>
              </button>
              <button className="newsletter-btn ct_w_100_767">
                <div className="d-flex align-items-center gap-2 ">
                  <img
                    src="assets/img/web_app_icon.svg"
                    className="ct_flex_shrink_0 ct_icon_36"
                  />
                  <div className="text-start">
                    <p className="ct_fs_14 mb-0 ct_text_op_6 text-white ct_fw_500">
                      GET IT ON
                    </p>
                    <h6 className="mb-0">Web App</h6>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
      <LandingPageFooter />
    </div>
  );
};

export default AboutUs;