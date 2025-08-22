import LoginScreen from "../pages/auth/LoginScreen";

const Home = lazy(() => import("../pages/Home"));
const Poll = lazy(() => import("../pages/Poll"));

const CreateRoom = lazy(() => import("../pages/CreateRoom"));
const Profile = lazy(() => import("../pages/auth/Profile"));

const Setting = lazy(() => import("../pages/Setting"));


export const pageRoutes = {
    poll: '/poll',
    dashboard: '/',
    login: '/login',
    setting: '/setting',
    profile: '/profile',
    createRoom: "/create-room"
};

export const AllRoutes = [
    {
        name: "Home",
        path: pageRoutes?.dashboard,
        element: <Home />,
        isPrivate: true,
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
];