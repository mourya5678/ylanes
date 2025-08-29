import { lazy } from "react";
import Chat from "../pages/chat";
import OnBoardingScreen from "../pages/onboarding";

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


export const pageRoutes = {
    dashboard: '/',
    poll: '/poll',
    login: '/login',
    setting: '/setting',
    profile: '/profile',
    createRoom: "/create-room",
    userWallet: '/wallet',
    notification: '/notification',
    faq: '/faq',
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
    onBoarding: '/onboarding'
};

export const AllRoutes = [
    {
        name: "Home",
        path: pageRoutes?.dashboard,
        element: <Home />,
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
    }
];