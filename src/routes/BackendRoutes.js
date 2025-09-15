export const BASE_URL = "http://56.228.76.11:4000/"; // Live
// export const BASE_URL = "http://192.168.29.131:4000/"; //Local
export const BASE_URL1 = "http://56.228.76.11:9000/"; // Live

// Image Url
export const IMAGE_URL = "http://";

// Auth
export const SMSConfirmationAPI = "account_block/accounts/sms_confirmations";
export const CreatePostAPI = "bx_block_posts/posts";

export const getPostTopicsAPI = "bx_block_posts/posts/user_preferred_topics";
export const getAllPostAPI = "bx_block_posts/posts";

export const likePostAPI = "bx_block_like/likes";
export const commentPostAPI = "bx_block_targetedfeed/comments";

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

export const getPollDataAPI = "bx_block_targetedfeed/polls";
export const createRoomAPI = "bx_block_different_rooms/rooms";

export const getAllConnectionsAPI = "bx_block_request_management/requests/friends";
export const getDiscoverAllConnectionAPI = "bx_block_profile/profiles/see_all_connection_suggestions";

export const sendInvitationToUserAPI = "bx_block_request_management/requests";
export const getAllChatUserAPI = "user-chats";

export const getPreviousMessagesAPI = "get-messages/";
export const getAgoraTokenAPI = "token/user-direct?expire=3600";

export const sendMessageToUserAPI = "send-message";