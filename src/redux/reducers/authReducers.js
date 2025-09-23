import { createSlice } from "@reduxjs/toolkit";
import { createUserPost, deleteNotificationData, getAllPost, getAllPostComment, getAllPostCommentss, getFaqData, getLandingPageFaq, getLikeAllPost, getMyProfileData, getNotificationData, getPostTopics, getPrivacyPolicyData, getRoomTypeData, getTermsConditionData, getWalletTransaction, likeUserPost, markAsReadToAllNotificationsDate, provideFeedBackData, smsConfirmation, updateUserProfileData } from "../actions/authActions";
import { pipSetAccessToken } from "../../auth/Pip";
import { getPollTypeData, getPollTypeDatass } from "../actions/createRoom";

const initialStates = {
    isLoading: false,
    isToggle: "1",
    postTopic: [],
    allPosts: [],
    allComments: [],
    profileData: {},
    trasactionData: [],
    faqList: [],
    notificationData: [],
    TermsAndConditions: {},
    PrivacyPolicy: {},
    RoomType: [],
    AllPollsData: [],
    faqs: []
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
    }
});

export const { toggleChange } = authSlice.actions;
export default authSlice.reducer;