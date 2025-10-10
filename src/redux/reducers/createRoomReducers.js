import { createSlice } from "@reduxjs/toolkit";
import { answerPollData, commentUserPoll, createPollData, createRoomData, descoverAllConnectionsData, disconnectUserConnection, getAllChatAfterReciveUsersData, getAllChatUsersData, getAllPreviousMessages, getAllUserPreviousMessages, getMyConnectionsData, getMyRoomData, getPastRoomData, getPollCommentData, getPollCommentDatass, getPollTypeDatass, getRecommendedRoomData, getRoomTypeData, getUpcommingRoomData, getUserAgoraToken, joinRoomVideoCall, registerRoomData, roomCancelByHost, roomCancelByUser, sendInvitationToUser, sendMessageToUser } from "../actions/createRoom";

const initialStates = {
    isCreateLoading: false,
    RoomType: [],
    allConnections: [],
    discoverAllConnections: [],
    chatList: [],
    previousMessages: [],
    upcommingRoomList: [],
    pastRoomList: [],
    recommendedList: [],
    myRoomList: [],
    pollComments: [],
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
            state.upcommingRoomList = data ?? [];
            state.isCreateLoading = false;
        });
        builder.addCase(getUpcommingRoomData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getPastRoomData
        builder.addCase(getPastRoomData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getPastRoomData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.pastRoomList = data ?? [];
            state.isCreateLoading = false;
        });
        builder.addCase(getPastRoomData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getRecommendedRoomData
        builder.addCase(getRecommendedRoomData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getRecommendedRoomData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.recommendedList = data ?? [];
            state.isCreateLoading = false;
        });
        builder.addCase(getRecommendedRoomData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getMyRoomData
        builder.addCase(getMyRoomData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getMyRoomData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.myRoomList = data ?? [];
            state.isCreateLoading = false;
        });
        builder.addCase(getMyRoomData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // getPollCommentData
        builder.addCase(getPollCommentData.pending, (state, action) => {
            // state.isCreateLoading = true;
            state.pollComments = []
        });
        builder.addCase(getPollCommentData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.pollComments = data ?? [];
            // state.isCreateLoading = false;
        });
        builder.addCase(getPollCommentData.rejected, (state, action) => {
            // state.isCreateLoading = false;
        });

        // getPollCommentDatass
        builder.addCase(getPollCommentDatass.pending, (state, action) => {
            // state.isCreateLoading = true;
        });
        builder.addCase(getPollCommentDatass.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.pollComments = data ?? [];
            // state.isCreateLoading = false;
        });
        builder.addCase(getPollCommentDatass.rejected, (state, action) => {
            // state.isCreateLoading = false;
        });

        // commentUserPoll
        builder.addCase(commentUserPoll.pending, (state, action) => {
            // state.isCreateLoading = true;
        });
        builder.addCase(commentUserPoll.fulfilled, (state, action) => {
            // state.isCreateLoading = false;
        });
        builder.addCase(commentUserPoll.rejected, (state, action) => {
            // state.isCreateLoading = false;
        });

        // answerPollData
        builder.addCase(answerPollData.pending, (state, action) => {
            // state.isCreateLoading = true;
        });
        builder.addCase(answerPollData.fulfilled, (state, action) => {
            // state.isCreateLoading = false;
        });
        builder.addCase(answerPollData.rejected, (state, action) => {
            // state.isCreateLoading = false;
        });

        // getPollTypeDatass
        builder.addCase(getPollTypeDatass.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(getPollTypeDatass.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(getPollTypeDatass.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // disconnectUserConnection
        builder.addCase(disconnectUserConnection.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(disconnectUserConnection.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(disconnectUserConnection.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // registerRoomData
        builder.addCase(registerRoomData.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(registerRoomData.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(registerRoomData.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // roomCancelByHost
        builder.addCase(roomCancelByHost.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(roomCancelByHost.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(roomCancelByHost.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // roomCancelByUser
        builder.addCase(roomCancelByUser.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(roomCancelByUser.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(roomCancelByUser.rejected, (state, action) => {
            state.isCreateLoading = false;
        });

        // joinRoomVideoCall
        builder.addCase(joinRoomVideoCall.pending, (state, action) => {
            state.isCreateLoading = true;
        });
        builder.addCase(joinRoomVideoCall.fulfilled, (state, action) => {
            state.isCreateLoading = false;
        });
        builder.addCase(joinRoomVideoCall.rejected, (state, action) => {
            state.isCreateLoading = false;
        });
    }
});

export default roomSlice.reducer;