import { createSlice } from "@reduxjs/toolkit";
import { getAllPost, getAllPostComment, getMyProfileData, getPostTopics, likeUserPost, smsConfirmation } from "../actions/authActions";
import { pipSetAccessToken } from "../../auth/Pip";

const initialStates = {
    isLoading: false,
    isToggle: "1",
    postTopic: [],
    allPosts: [],
    allComments: [],
    profileData: {},
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

        // likeUserPost
        builder.addCase(likeUserPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(likeUserPost.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(likeUserPost.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getAllPostComment
        builder.addCase(getAllPostComment.pending, (state, action) => {
        });
        builder.addCase(getAllPostComment.fulfilled, (state, action) => {
            const { data } = action?.payload || {};
            state.allComments = data ?? [];
        });
        builder.addCase(getAllPostComment.rejected, (state, action) => {
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
    }
});

export const { toggleChange } = authSlice.actions;
export default authSlice.reducer;