import React from 'react';
import Header from '../../components/Header';

const DeactivateAccount = () => {
    return (
        <div>
            <Header />
            <section className="ct_py_70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between  gap-3 mb-5">
                                <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_text_061F61">
                                    Deactivate Account
                                </h4>
                            </div>
                            <div className="form-group mb-0">
                                <label className="mb-2 ct_fw_500">Select Reason For Deactivation</label>
                                <select className="form-control ct_input">
                                    <option value="">Select reason</option>
                                </select>

                            </div>
                            <div className="pt-4">
                                <h4 className="ct_fs_20 ct_fw_600 mb-3">Deactivate</h4>
                                <p className="mb-0 ct_text_op_6">This will put your account in a hold status. You will not be searchable by other users nor appear in any lists (e.g. connects, room history). You can reactivate your account any time by logging in.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="ct_fs_20 ct_fw_600 mb-3">Delete All Data</h4>
                                <p className="mb-0 ct_text_op_6">This will delete your entire account permanently including all of your data and history (e.g. connects, touchpoints, hearts, etc.). This cannot be undone. Your wallet has 6480 YCoins in it, which you will lose if you delete your account.</p>
                            </div>
                            <div className="mt-5 d-flex align-items-center gap-3">
                                <button className="ct_yellow_btn">Deactivate</button>
                                <button className="ct_outline_btn ct_red_btn">Delete All Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default DeactivateAccount;