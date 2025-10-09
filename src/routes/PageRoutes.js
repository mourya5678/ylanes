import { lazy } from "react";
import UserProfile from "../pages/auth/UserProfile";
import TermsOfUse from "../pages/policies/TermsOfUse";
import LandingPrivacyPolicy from "../pages/policies/LandingPrivacyPolicy";

const Dashboard = lazy(() => import("../pages/home/Dashboard"));
const RoomDetails = lazy(() => import("../pages/Room/RoomDetails"));

const BlogsList = lazy(() => import("../pages/blogs"));
const BlogsDetails = lazy(() => import("../pages/blogs/BlogsDetails"));

const AboutUs = lazy(() => import("../pages/about"));
const LandingFaq = lazy(() => import("../pages/faq"));

const Chat = lazy(() => import("../pages/chat"));
const OnBoardingScreen = lazy(() => import("../pages/onboarding"));

const UpdateProfile = lazy(() => import("../pages/auth/UpdateProfile"));
const PrivacyPolicy = lazy(() => import("../pages/settings/PrivacyPolicy"));

const Refer = lazy(() => import("../pages/settings/Refer"));
const TermsOfUser = lazy(() => import("../pages/settings/TermsOfUser"));

const Feedback = lazy(() => import("../pages/settings/Feedback"));
const DeactivateAccount = lazy(() => import("../pages/settings/DeactivateAccount"));

const Home = lazy(() => import("../pages/home/Home"));
const Poll = lazy(() => import("../pages/polls"));

const CreateRoom = lazy(() => import("../pages/Room/CreateRoom"));
const Profile = lazy(() => import("../pages/auth/Profile"));

const Setting = lazy(() => import("../pages/settings"));
const UserWallet = lazy(() => import("../pages/wallet"));

const LoginScreen = lazy(() => import("../pages/auth/LoginScreen"));
const Notification = lazy(() => import("../pages/notification"));

const Faq = lazy(() => import("../pages/settings/Faq"));
const MyRoom = lazy(() => import("../pages/Room"));

const TransactionHistory = lazy(() => import("../pages/transactionHistory/TransactionHistory"));
const VerifyOtp = lazy(() => import("../pages/auth/VerifyOtp"));

const Subscription = lazy(() => import("../pages/subscription"));
const TopUpUserWallet = lazy(() => import("../pages/wallet/TopUpUserWallet"));

const PostDetailsPage = lazy(() => import("../pages/home/PostDetailsPage"));
const VideoCall = lazy(() => import("../components/AgoraVideoCall"));


export const pageRoutes = {
    dashboard: '/home',
    landingPage: "/",
    poll: '/poll',
    login: '/login',
    setting: '/setting',
    profile: '/profile',
    userProfile: "/user-pofile",
    updateProfile: '/update-profile',
    createRoom: "/create-room",
    userWallet: '/wallet',
    notification: '/notification',
    faq: '/faqs',
    refer: '/refer',
    termAndCondition: '/terms-and-condition',
    feedback: '/feedback',
    deactiveAccount: '/accrount-deactivated',
    myRoom: '/my-room',
    otpVerify: '/otp-verification',
    subsctiption: '/subscription',
    topUpWallet: "/topup-wallet",
    transaction: '/transaction-history',
    chat: '/connections',
    onBoarding: '/onboarding',
    privacyPolicy: '/privacy-policy',
    postDetails: '/post-details',
    videoCall: "/video-call",
    roomDetails: '/room-details',
    blogs: '/blogs',
    blogsDetails: "/blogs-details",
    aboutUs: "/about-us",
    landingFaq: "/faq",
    landingTermOfUse: "/term-and-condition",
    landingPrivacyPolicy: "/privayc_policy"
};

export const AllRoutes = [
    {
        name: "Home",
        path: pageRoutes?.dashboard,
        element: <Home />,
        isPrivate: true
    },
    {
        name: "Terms Of Use",
        path: pageRoutes?.landingTermOfUse,
        element: <TermsOfUse />,
        isPrivate: true
    },
    {
        name: "Landing Privacy Policy",
        path: pageRoutes?.landingPrivacyPolicy,
        element: <LandingPrivacyPolicy />,
        isPrivate: true
    },
    {
        name: "User Profile",
        path: pageRoutes?.userProfile,
        element: <UserProfile />,
        isPrivate: true
    },
    {
        name: "Landing FAQ",
        path: pageRoutes?.landingFaq,
        element: <LandingFaq />,
        isPrivate: true
    },
    {
        name: "About Us",
        path: pageRoutes?.aboutUs,
        element: <AboutUs />,
        isPrivate: true
    },
    {
        name: "Blog",
        path: pageRoutes?.blogs,
        element: <BlogsList />,
        isPrivate: true
    },
    {
        name: "Blogs Details",
        path: pageRoutes?.blogsDetails,
        element: <BlogsDetails />,
        isPrivate: true
    },
    {
        name: "Room Details",
        path: pageRoutes?.roomDetails,
        element: <RoomDetails />,
        isPrivate: true
    },
    {
        name: "Video Call",
        path: pageRoutes?.videoCall,
        element: <VideoCall />,
        isPrivate: true
    },
    {
        name: "Landing Page",
        path: pageRoutes.landingPage,
        element: <Dashboard />,
        isPrivate: true
    },
    {
        name: "Poll",
        path: pageRoutes?.poll,
        element: <Poll />,
        isPrivate: true,
    },
    {
        name: "Profile",
        path: pageRoutes?.profile,
        element: <Profile />,
        isPrivate: true,
    },
    {
        name: "Setting",
        path: pageRoutes?.setting,
        element: <Setting />,
        isPrivate: true,
    },
    {
        name: "Create Room",
        path: pageRoutes?.createRoom,
        element: <CreateRoom />,
        isPrivate: true,
    },
    {
        name: "Login",
        path: pageRoutes?.login,
        element: <LoginScreen />,
        isPrivate: true,
    },
    {
        name: "User Wallet",
        path: pageRoutes?.userWallet,
        element: <UserWallet />,
        isPrivate: true,
    },
    {
        name: "Notification",
        path: pageRoutes?.notification,
        element: <Notification />,
        isPrivate: true
    },
    {
        name: "FAQ",
        path: pageRoutes?.faq,
        element: <Faq />,
        isPrivate: true
    },
    {
        name: "Refer",
        path: pageRoutes?.refer,
        element: <Refer />,
        isPrivate: true
    },
    {
        name: "Term And Condition",
        path: pageRoutes?.termAndCondition,
        element: <TermsOfUser />,
        isPrivate: true
    },
    {
        name: "Provide Feedback",
        path: pageRoutes.feedback,
        element: <Feedback />,
        isPrivate: true
    },
    {
        name: "Account Deactivate",
        path: pageRoutes.deactiveAccount,
        element: <DeactivateAccount />,
        isPrivate: true
    },
    {
        name: "My Room",
        path: pageRoutes.myRoom,
        element: <MyRoom />,
        isPrivate: true
    },
    {
        name: "OTP Verification",
        path: pageRoutes.otpVerify,
        element: <VerifyOtp />,
        isPrivate: true,
    },
    {
        name: "Subscription",
        path: pageRoutes.subsctiption,
        element: <Subscription />,
        isPrivate: true,
    },
    {
        name: "TopUp User Wallet",
        path: pageRoutes.topUpWallet,
        element: <TopUpUserWallet />,
        isPrivate: true,
    },
    {
        name: "Transaction History",
        path: pageRoutes.transaction,
        element: <TransactionHistory />,
        isPrivate: true,
    },
    {
        name: "Chat",
        path: pageRoutes.chat,
        element: <Chat />,
        isPrivate: true,
    },
    {
        name: "OnBoardingScreen",
        path: pageRoutes.onBoarding,
        element: <OnBoardingScreen />,
        isPrivate: true,
    },
    {
        name: "Update Profile",
        path: pageRoutes.updateProfile,
        element: <UpdateProfile />,
        isPrivate: true,
    },
    {
        name: "Privacy Policy",
        path: pageRoutes.privacyPolicy,
        element: <PrivacyPolicy />,
        isPrivate: true,
    },
    {
        name: "Post Details",
        path: pageRoutes.postDetails,
        element: <PostDetailsPage />,
        isPrivate: true
    }
];