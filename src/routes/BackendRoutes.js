export const BASE_URL = "https://ylanes.com:4000/"; // Live
export const BASE_URL1 = "https://ylanes.com:9000/"; // Live
// export const BASE_URL = "http://56.228.76.11:4000/"
// Image Url
export const IMAGE_URL = "https://";

// Auth
export const SMSConfirmationAPI = "account_block/accounts/sms_confirmations";
export const CreatePostAPI = "bx_block_posts/posts";

export const getPostTopicsAPI = "bx_block_posts/posts/user_preferred_topics";
export const getAllPostAPI = "bx_block_posts/posts";

export const likePostAPI = "bx_block_like/likes";
export const commentPostAPI = "bx_block_posts/posts/";
// bx_block_posts/articles/article_comment

export const userProfileAPI = "bx_block_profile/profiles/";
export const updateUserProfileAPI = "account_block/accounts/";

export const getWalletTransactionHistoryAPI = "bx_block_ycoins/ycoins";
export const getFaqListAPI = "bx_block_admin/policies/faq_list";

export const getTermsConditionsDataAPI = "bx_block_admin/policies?name=TERMS";
export const getPrivacyPolicyDataAPI = "/bx_block_admin/policies?name=LOGIN";

export const getNotificationAPI = "bx_block_notifications/notifications";
export const sendFeedbackAPI = "bx_block_feedback/feedbacks";

export const getRoomTypeAPI = "bx_block_different_rooms/rooms/get_room_types";
export const createPollAPI = "bx_block_targetedfeed/polls";

// export const getPollCommentAPI = "bx_block_targetedfeed/comments";
export const getPollCommentAPI = "bx_block_targetedfeed/polls/";

export const getPollDataAPI = "bx_block_targetedfeed/polls";
export const createRoomAPI = "bx_block_different_rooms/rooms";

export const getAllConnectionsAPI = "bx_block_request_management/requests/friends";
export const getDiscoverAllConnectionAPI = "bx_block_profile/profiles/see_all_connection_suggestions";

export const sendInvitationToUserAPI = "bx_block_request_management/requests";
export const getAllChatUserAPI = "user-chats";

export const getPreviousMessagesAPI = "get-messages/";
export const getAgoraTokenAPI = "token/user-direct?expire=3600";

export const sendMessageToUserAPI = "send-message";

// Subscription API 
export const getAllSubscriptionPlanAPI = "bx_block_payments/subscription_plans";
export const purchaseSubscriptionPlanAPI = "bx_block_payments/razorpays/order_for_unlimited_subscription?amount=";

export const createSubscriptionPlanAPI = "bx_block_payments/razorpays/create_subscriptions";
export const getAllDashboardSubscriptionPlanAPI = "bx_block_payments/razorpays/get_all_subscription_plans";

export const getUserSubscriptionPlanAPI = "bx_block_payments/subscription_details";
export const getTopupPlanAPI = "bx_block_ycoins/top_up_wallets/top_up_plans";

export const topupWalletAPI = "bx_block_payments/razorpays/create_top_up_plan_order?plan_id=";
export const getTaxDataAPI = "bx_block_admin/dynamic_text?constant_key=GST_SLAB";

export const rupeeToYCoinConvertion = "bx_block_admin/dynamic_text?constant_key=RUPEE_TO_YCOIN";
export const verifyPaymentTransactionAPI = "bx_block_payments/razorpays/update_v3";

export const razorPayTestKey = "rzp_test_R82hVMaq49lFib";

// Rooms 
export const getAllUpcommingRoomDataAPI = "bx_block_different_rooms/rooms/get_upcoming_rooms";
export const getAllPastRoomDataAPI = "bx_block_different_rooms/rooms/my_past_rooms";

export const getAllMyRoomsDataAPI = "bx_block_different_rooms/rooms/my_upcoming_rooms";
export const getAllRecommendedRoomsDataAPI = "bx_block_different_rooms/rooms/get_recommended_rooms";

// Notification
export const deleteNotificationAPI = "bx_block_notifications/notifications/";
export const markAsReadToAllNotificationsAPI = "bx_block_notifications/notifications/read_all";

// Landing Faq
export const getLandingFaqAPI = "bx_block_admin/policies/public_faq_list";

// onBoarding user
export const userOnboardAPI = "account_block/accounts";