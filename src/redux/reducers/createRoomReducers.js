import { createSlice } from "@reduxjs/toolkit";
import { createPollData, createRoomData, descoverAllConnectionsData, getAllChatAfterReciveUsersData, getAllChatUsersData, getAllPreviousMessages, getAllUserPreviousMessages, getMyConnectionsData, getRoomTypeData, getUpcommingRoomData, getUserAgoraToken, sendInvitationToUser, sendMessageToUser } from "../actions/createRoom";

const initialStates = {
    isCreateLoading: false,
    RoomType: [],
    allConnections: [],
    discoverAllConnections: [],
    chatList: [],
    previousMessages: [],
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
            state.RoomType = data ?? []
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

        // createRoomData
        builder.addCase(createRoomData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(createRoomData.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(createRoomData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getMyConnectionsData
        builder.addCase(getMyConnectionsData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getMyConnectionsData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.allConnections = data ?? []
            state.isCreateLoading = false;
        });
        builder.addCase(getMyConnectionsData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // descoverAllConnectionsData
        builder.addCase(descoverAllConnectionsData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(descoverAllConnectionsData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.discoverAllConnections = data ?? []
            state.isCreateLoading = false;
        });
        builder.addCase(descoverAllConnectionsData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // sendInvitationToUser 
        builder.addCase(sendInvitationToUser.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(sendInvitationToUser.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(sendInvitationToUser.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getAllChatUsersData
        builder.addCase(getAllChatUsersData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getAllChatUsersData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.chatList = data?.chats ?? [];
            state.isCreateLoading = false;
        });
        builder.addCase(getAllChatUsersData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getAllPreviousMessages
        builder.addCase(getAllPreviousMessages.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getAllPreviousMessages.fulfilled, (state, action) => {
            const { local_messages } = action?.payload || {};
            state.previousMessages = local_messages ?? [];
            state.isCreateLoading = false;
        });
        builder.addCase(getAllPreviousMessages.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getUserAgoraToken
        builder.addCase(getUserAgoraToken.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getUserAgoraToken.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(getUserAgoraToken.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // sendMessageToUser
        builder.addCase(sendMessageToUser.pending, (state, action) => {
        });
        builder.addCase(sendMessageToUser.fulfilled, (state, action) => {
        });
        builder.addCase(sendMessageToUser.rejected, (state, action) => {
        });

        // getAllChatAfterReciveUsersData
        builder.addCase(getAllChatAfterReciveUsersData.pending, (state, action) => {
        });
        builder.addCase(getAllChatAfterReciveUsersData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.chatList = data?.chats ?? [];
        });
        builder.addCase(getAllChatAfterReciveUsersData.rejected, (state, action) => {
        });

        // getAllUserPreviousMessages
        builder.addCase(getAllUserPreviousMessages.pending, (state, action) => {
        });
        builder.addCase(getAllUserPreviousMessages.fulfilled, (state, action) => {
            const { local_messages } = action?.payload || {};
            state.previousMessages = local_messages ?? [];
        });
        builder.addCase(getAllUserPreviousMessages.rejected, (state, action) => {
        });

        // getUpcommingRoomData
        builder.addCase(getUpcommingRoomData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getUpcommingRoomData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            console.log({ data })
            state.isCreateLoading = false;
        });
        builder.addCase(getUpcommingRoomData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });
    }
});

export default roomSlice.reducer;