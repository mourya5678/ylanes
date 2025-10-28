import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRejectFriendRequest, getAllFriendRequests } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';

const FriendRequest = ({ messageApi }) => {
    const { isLoader, getFriendRequestList } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFriendRequests({ messageApi }));
    }, []);

    const handleAcceptRejectFriendRequest = (value, data) => {
        const callback = (response) => {
            dispatch(getAllFriendRequests({ messageApi }));
        };
        var raw = {
            data: {
                status: value,
            },
        };
        dispatch(acceptRejectFriendRequest({ payload: raw, params: data?.id, callback, messageApi }));
    };

    if (isLoader) {
        return <Loader />;
    };
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className='py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 mx-auto'>
                            <h4 className='mb-4 ct_fs_24'>Friend Request</h4>
                            <div className='table-responsive ct_custom_table'>
                                <table className='table '>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Profile</th>
                                            <th>User Name</th>
                                            <th>Mutual Friend</th>
                                            <th className='text-end'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getFriendRequestList?.length != 0 &&
                                            getFriendRequestList?.map((item, i) => (
                                                // !item?.attributes?.blocked_status &&
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <div className='d-flex align-items-center gap-2'>
                                                            <img src={item?.attributes?.profile_image ?? "assets/img/dummy_user_img.png"} className='ct_img_40' />
                                                        </div>
                                                    </td>
                                                    <td>{item?.attributes?.full_name ?? ""}</td>
                                                    <td>{item?.attributes?.mutual_friends_count ?? 0}</td>
                                                    <td className='text-end'>
                                                        <div className='d-flex align-items-center gap-2 justify-content-end'>
                                                            <button className='ct_action_btn' onClick={() => handleAcceptRejectFriendRequest("Accepted", item)}>
                                                                Accept
                                                            </button>
                                                            <button className='ct_action_btn bg-danger text-white' onClick={() => handleAcceptRejectFriendRequest("Rejected", item)}>
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default FriendRequest;