import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletTransaction } from '../../redux/actions/authActions';
import ReactPagination from '../../layout/ReactPagination';
import PaginationDropdown from '../../layout/PaginationDropdown';
import { pipViewDate } from '../../auth/Pip';
import Loader from '../../components/Loader';

const TransactionHistory = ({ messageApi }) => {
    const { isLoading, trasactionData } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(5);

    const displayUsers = trasactionData?.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    useEffect(() => {
        dispatch(getWalletTransaction({ messageApi }));
    }, []);

    console.log({ trasactionData });


    if (isLoading) {
        return <Loader />;
    };
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
                                            {displayUsers?.map((item) => (
                                                <tr>
                                                    <td>
                                                        <h6 className="ct_fs_18 mb-0">{item?.issue_type ?? ""}</h6>
                                                        <p className="ct_fs_14 mb-0 ct_text_op_6">{pipViewDate(item?.created_at)}</p>
                                                    </td>
                                                    <td className="text-end">{item?.tnx_type == "debit" ? "-" : "+"}{item?.ycoins ?? 0}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3">
                                    {trasactionData?.length > 5 && trasactionData?.length > 0 && (
                                        <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 mb-3">
                                            <PaginationDropdown
                                                onChange={(val) => {
                                                    setUserPerPages(val);
                                                    setCurrentPage(0);
                                                }}
                                            />
                                            <ReactPagination
                                                pageCount={Math.ceil(trasactionData.length / usersPerPage)}
                                                onPageChange={handlePageClick}
                                                currentPage={currentPage}
                                            />
                                        </div>
                                    )}
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