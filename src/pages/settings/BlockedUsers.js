import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { blockUserData, getBlockedUsers, unBlockUserData } from '../../redux/actions/authActions';
import Loader from '../../components/Loader';

const BlockedUsers = ({ messageApi }) => {
    const dispatch = useDispatch();
    const { isLoading, blockedUsersList } = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(getBlockedUsers({ messageApi }));
    }, []);

    const handleUnblockUser = (value) => {
        console.log({ value })
        const callback = (response) => {
            dispatch(getBlockedUsers({ messageApi }));
            if (response?.message) {
                messageApi?.success(response?.message);
            } else {
                messageApi?.error(response?.message);
            };
        };
        let formData = new FormData();
        formData.append("user_id", value?.id);
        dispatch(unBlockUserData({ payload: formData, callback, messageApi }));
    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <Header messageApi={messageApi} />
            <section className='py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 mx-auto'>
                            <h4 className='mb-4 ct_fs_24'>Block User</h4>
                            <div className='table-responsive ct_custom_table'>
                                <table className='table '>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Profile Image</th>
                                            <th>Full Name</th>
                                            <th className='text-end'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blockedUsersList?.length != 0 &&
                                            blockedUsersList?.map((item, i) => (
                                                <tr>
                                                    {console.log({ item })}
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <div className='d-flex align-items-center gap-2'>
                                                            <img src={item?.attributes?.profile_image ?? "assets/img/dummy_user_img.png"} className='ct_img_40' />
                                                        </div>
                                                    </td>
                                                    <td>{item?.attributes?.full_name ?? ""}</td>
                                                    <td className='text-end'>
                                                        <button className='ct_action_btn' onClick={() => handleUnblockUser(item)}>
                                                            Unblock
                                                        </button>
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

export default BlockedUsers;