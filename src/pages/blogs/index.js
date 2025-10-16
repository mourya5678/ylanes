import React, { useEffect } from 'react'
import LandingHeader from '../../components/LandingPageHeader';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsData } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';
import LandingPageFooter from '../../components/LandingPageFooter';

const BlogsList = ({ messageApi }) => {
  const { isLoading, blogsData } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogsData({ messageApi }));
  }, []);

  if (isLoading) {
    return <Loader />;
  };
  return (
    <div>
      <LandingHeader />
      <section className=" ct_py_70">
        <div className="container ">
          <h4 className="ct_fs_28 ct_fw_600 mb-4">Blogs</h4>
          <div className="row">
            {blogsData?.length != 0 &&
              blogsData?.map((item) => (
                <div className="col-xl-4 col-md-6  mb-4">
                  <figure className="ct_blog_card">
                    <div className="ct_blog_img">
                      <img src={item?.image_url} alt="" />
                    </div>
                    <figcaption>
                      <h4 className="ct_fs_18 ct_minimise_cnt mb-0 ct_white_space_normal">
                        {item?.heading ?? ""}
                      </h4>
                      <div className='mt-3 ct_minimise_cnt' dangerouslySetInnerHTML={{ __html: item?.description ?? "" }}></div>
                      <div className="mt-3">
                        <a
                          onClick={() => navigate(pageRoutes.blogsDetails, { state: { data: item } })}
                          className="ct_orange_link ct_text_upercase"
                        >
                          Read More <i className="fa-solid fa-arrow-right ms-2"></i>
                        </a>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
          </div>
        </div>
      </section>
      <LandingPageFooter />
    </div>
  );
};

export default BlogsList;