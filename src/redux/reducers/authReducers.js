import { createSlice } from "@reduxjs/toolkit";
import { acceptRejectFriendRequest, blockUserData, createUserPost, deleteNotificationData, deleteUserPoll, deleteUserPost, getAllFriendRequests, getAllPost, getAllPostComment, getAllPostCommentss, getBlockedUsers, getBlogsData, getFaqData, getLandingPageFaq, getLandingPolicyDetails, getLandingTermOfUseDetails, getLikeAllPost, getMyProfileData, getNotificationData, getPostDataByID, getPostTopics, getPrivacyPolicyData, getReportReason, getRoomTypeData, getTermsConditionData, getUserDetailsForVideoCall, getUserProfileData, getWalletTransaction, likeUserPost, markAsReadToAllNotificationsDate, provideFeedBackData, reportParticipants, smsConfirmation, submitRoomFeedBack, submitUserFeedBack, unBlockUserData, updatePostDetails, updateUserProfileData, userOnboarding } from "../actions/authActions";
import { pipSetAccessToken } from "../../auth/Pip";
import { getPollTypeData, getPollTypeDatass } from "../actions/createRoom";

const initialStates = {
    isLoading: false,
    isToggle: "1",
    postTopic: [],
    allPosts: [],
    allComments: [],
    profileData: {},
    userProfileData: {},
    trasactionData: [],
    faqList: [],
    notificationData: [],
    TermsAndConditions: {},
    PrivacyPolicy: {},
    RoomType: [],
    AllPollsData: [],
    faqs: [],
    postDetails: {},
    blogsData: [],
    userVideoData: {},
    landingPolicy: {},
    landingTerm: {},
    blockedUsersList: [],
    getFriendRequestList: []
};

export const authSlice = createSlice({
    name: "Auth",
    initialState: initialStates,
    reducers: {
        toggleChange: (state, action) => {
            state.isToggle = action?.payload;
        },
    },
    extraReducers: (builder) => {
        // smsConfirmation
        builder.addCase(smsConfirmation.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(smsConfirmation.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(smsConfirmation.rejected, (state, action) => {
            state.isLoading = false;
        });

        // createUserPost
        builder.addCase(createUserPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createUserPost.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(createUserPost.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getPostTopics
        builder.addCase(getPostTopics.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPostTopics.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.postTopic = data ?? [];
            state.isLoading = false;
        });
        builder.addCase(getPostTopics.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getAllPost
        builder.addCase(getAllPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllPost.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.allPosts = data ?? [];
            state.isLoading = false;
        });
        builder.addCase(getAllPost.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getPostDataByID
        builder.addCase(getPostDataByID.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPostDataByID.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.postDetails = data ?? {};
            state.isLoading = false;
        });
        builder.addCase(getPostDataByID.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getLikeAllPost
        builder.addCase(getLikeAllPost.pending, (state, action) => {
        });
        builder.addCase(getLikeAllPost.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.allPosts = data ?? [];
        });
        builder.addCase(getLikeAllPost.rejected, (state, action) => {
        });

        // likeUserPost
        builder.addCase(likeUserPost.pending, (state, action) => {
            // state.isLoading = true;
        });
        builder.addCase(likeUserPost.fulfilled, (state, action) => {
            // state.isLoading = false;
        });
        builder.addCase(likeUserPost.rejected, (state, action) => {
            // state.isLoading = false;
        });

        // getAllPostComment
        builder.addCase(getAllPostComment.pending, (state, action) => {
            state.allComments = [];
        });
        builder.addCase(getAllPostComment.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.allComments = data ?? [];
        });
        builder.addCase(getAllPostComment.rejected, (state, action) => {
        });

        // getAllPostCommentss
        builder.addCase(getAllPostCommentss.pending, (state, action) => {
        });
        builder.addCase(getAllPostCommentss.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.allComments = data ?? [];
        });
        builder.addCase(getAllPostCommentss.rejected, (state, action) => {
        });

        // getMyProfileData
        builder.addCase(getMyProfileData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getMyProfileData.fulfilled, (state, action) => {
            state.isLoading = false;
            const { data } = action?.payload || {};
            pipSetAccessToken("user_data", data);
            state.profileData = data ?? {};
        });
        builder.addCase(getMyProfileData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // updateUserProfileData
        builder.addCase(updateUserProfileData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserProfileData.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(updateUserProfileData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getWalletTransaction
        builder.addCase(getWalletTransaction.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getWalletTransaction.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.trasactionData = data ?? []
            state.isLoading = false;
        });
        builder.addCase(getWalletTransaction.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getFaqData
        builder.addCase(getFaqData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getFaqData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.faqList = data ?? []
            state.isLoading = false;
        });
        builder.addCase(getFaqData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getNotificationData
        builder.addCase(getNotificationData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getNotificationData.fulfilled, (state, action) => {
            const { notifications } = action?.payload || {};
            state.notificationData = notifications?.data ?? []
            state.isLoading = false;
        });
        builder.addCase(getNotificationData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getTermsConditionData
        builder.addCase(getTermsConditionData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTermsConditionData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.TermsAndConditions = data ?? {}
            state.isLoading = false;
        });
        builder.addCase(getTermsConditionData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getPrivacyPolicyData
        builder.addCase(getPrivacyPolicyData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPrivacyPolicyData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.PrivacyPolicy = data ?? {}
            state.isLoading = false;
        });
        builder.addCase(getPrivacyPolicyData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // provideFeedBackData
        builder.addCase(provideFeedBackData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(provideFeedBackData.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(provideFeedBackData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getPollTypeData
        builder.addCase(getPollTypeData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPollTypeData.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.AllPollsData = data ?? []
            state.isLoading = false;
        });
        builder.addCase(getPollTypeData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getPollTypeDatass
        builder.addCase(getPollTypeDatass.pending, (state, action) => {
        });
        builder.addCase(getPollTypeDatass.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.AllPollsData = data ?? []
        });
        builder.addCase(getPollTypeDatass.rejected, (state, action) => {
        });

        // deleteNotificationData
        builder.addCase(deleteNotificationData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteNotificationData.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteNotificationData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // markAsReadToAllNotificationsDate
        builder.addCase(markAsReadToAllNotificationsDate.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(markAsReadToAllNotificationsDate.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(markAsReadToAllNotificationsDate.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getLandingPageFaq
        builder.addCase(getLandingPageFaq.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getLandingPageFaq.fulfilled, (state, action) => {
            const { meta } = action?.payload || {};
            console.log({ meta });
            state.faqs = meta?.data ?? [];
            state.isLoading = false;
        });
        builder.addCase(getLandingPageFaq.rejected, (state, action) => {
            state.isLoading = false;
        });

        // userOnboarding
        builder.addCase(userOnboarding.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(userOnboarding.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(userOnboarding.rejected, (state, action) => {
            state.isLoading = false;
        });

        // deleteUserPost
        builder.addCase(deleteUserPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUserPost.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteUserPost.rejected, (state, action) => {
            state.isLoading = false;
        });

        // updatePostDetails
        builder.addCase(updatePostDetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updatePostDetails.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(updatePostDetails.rejected, (state, action) => {
            state.isLoading = false;
        });

        // blockUserData
        builder.addCase(blockUserData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(blockUserData.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(blockUserData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // deleteUserPoll
        builder.addCase(deleteUserPoll.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUserPoll.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteUserPoll.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getUserProfileData
        builder.addCase(getUserProfileData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUserProfileData.fulfilled, (state, action) => {
            state.isLoading = false;
            const { data } = action?.payload || {};
            state.userProfileData = data ?? {};
        });
        builder.addCase(getUserProfileData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getBlogsData
        builder.addCase(getBlogsData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBlogsData.fulfilled, (state, action) => {
            state.isLoading = false;
            const { data } = action?.payload || {};
            state.blogsData = data ?? [];
        });
        builder.addCase(getBlogsData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getUserDetailsForVideoCall
        builder.addCase(getUserDetailsForVideoCall.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUserDetailsForVideoCall.fulfilled, (state, action) => {
            state.isLoading = false;
            const { data } = action?.payload || {};
            console.log({ data: data });
            state.userVideoData = data ?? {};
        });
        builder.addCase(getUserDetailsForVideoCall.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getLandingPolicyDetails
        builder.addCase(getLandingPolicyDetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getLandingPolicyDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.landingPolicy = action?.payload[0] ?? {};
        });
        builder.addCase(getLandingPolicyDetails.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getLandingTermOfUseDetails
        builder.addCase(getLandingTermOfUseDetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getLandingTermOfUseDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.landingTerm = action?.payload[0] ?? {};
        });
        builder.addCase(getLandingTermOfUseDetails.rejected, (state, action) => {
            state.isLoading = false;
        });

        // submitUserFeedBack
        builder.addCase(submitUserFeedBack.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(submitUserFeedBack.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(submitUserFeedBack.rejected, (state, action) => {
            state.isLoading = false;
        });

        // submitRoomFeedBack
        builder.addCase(submitRoomFeedBack.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(submitRoomFeedBack.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(submitRoomFeedBack.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getReportReason
        builder.addCase(getReportReason.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getReportReason.fulfilled, (state, action) => {
            console.log({ action: action?.payload })
            state.isLoading = false;
        });
        builder.addCase(getReportReason.rejected, (state, action) => {
            state.isLoading = false;
        });

        // reportParticipants
        builder.addCase(reportParticipants.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(reportParticipants.fulfilled, (state, action) => {
            console.log({ action: action?.payload })
            state.isLoading = false;
        });
        builder.addCase(reportParticipants.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getBlockedUsers
        builder.addCase(getBlockedUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBlockedUsers.fulfilled, (state, action) => {
            const { data } = action?.payload ?? {}
            state.blockedUsersList = data ?? []
            state.isLoading = false;
        });
        builder.addCase(getBlockedUsers.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getAllFriendRequests
        builder.addCase(getAllFriendRequests.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllFriendRequests.fulfilled, (state, action) => {
            const { data } = action?.payload ?? {}
            state.getFriendRequestList = data ?? []
            state.isLoading = false;
        });
        builder.addCase(getAllFriendRequests.rejected, (state, action) => {
            state.isLoading = false;
        });

        // unBlockUserData
        builder.addCase(unBlockUserData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(unBlockUserData.fulfilled, (state, action) => {
            const { data } = action?.payload ?? {}
            state.getFriendRequestList = data ?? []
            state.isLoading = false;
        });
        builder.addCase(unBlockUserData.rejected, (state, action) => {
            state.isLoading = false;
        });

        // acceptRejectFriendRequest
        builder.addCase(acceptRejectFriendRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(acceptRejectFriendRequest.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(acceptRejectFriendRequest.rejected, (state, action) => {
            state.isLoading = false;
        });

    }
});

export const { toggleChange } = authSlice.actions;
export default authSlice.reducer;