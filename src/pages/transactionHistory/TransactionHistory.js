import React from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import { pageRoutes } from '../../routes/PageRoutes';

const TransactionHistory = ({ messageApi }) => {
    const navigate = useNavigate();

    return (
        <div>
            <Header messageApi={messageApi} />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center   gap-3 mb-5">
                                <a onClick={() => navigate(pageRoutes.userWallet)} className="ct_back_btn ct_cursor text-dark">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </a>
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Transaction History
                                </h4>
                            </div>
                            <div className="mt-5">
                                <div className="table-repsonsive ct_custom_table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Transaction history</th>
                                                <th className="text-end">YCoins</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h6 className="ct_fs_18 mb-0">Connection request sent</h6>
                                                    <p className="ct_fs_14 mb-0 ct_text_op_6">22 Aug 2025</p>
                                                </td>
                                                <td className="text-end">0</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h6 className="ct_fs_18 mb-0">Connection request sent</h6>
                                                    <p className="ct_fs_14 mb-0 ct_text_op_6">22 Aug 2025</p>
                                                </td>
                                                <td className="text-end">0</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h6 className="ct_fs_18 mb-0">Connection request sent</h6>
                                                    <p className="ct_fs_14 mb-0 ct_text_op_6">22 Aug 2025</p>
                                                </td>
                                                <td className="text-end">0</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h6 className="ct_fs_18 mb-0">Connection request sent</h6>
                                                    <p className="ct_fs_14 mb-0 ct_text_op_6">22 Aug 2025</p>
                                                </td>
                                                <td className="text-end">0</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h6 className="ct_fs_18 mb-0">Connection request sent</h6>
                                                    <p className="ct_fs_14 mb-0 ct_text_op_6">22 Aug 2025</p>
                                                </td>
                                                <td className="text-end">0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default TransactionHistory;