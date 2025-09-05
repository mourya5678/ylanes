import { createSlice } from "@reduxjs/toolkit";
import { createPollData, getRoomTypeData } from "../actions/createRoom";

const initialStates = {
    isCreateLoading: false,
    RoomType: [],
};

export const roomSlice = createSlice({
    name: "Auth",
    initialState: initialStates,
    reducers: {},
    extraReducers: (builder) => {
        // getRoomTypeData
        builder.addCase(getRoomTypeData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getRoomTypeData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.RoomType = data ?? {}
            state.isCreateLoading = false;
        });
        builder.addCase(getRoomTypeData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // createPollData
        builder.addCase(createPollData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(createPollData.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(createPollData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });
    }
});

export default roomSlice.reducer;