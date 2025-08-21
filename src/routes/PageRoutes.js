
const Home = lazy(() => import("../pages/Home"));
const Poll = lazy(() => import("../pages/Poll"));

const CreateRoom = lazy(() => import("../pages/CreateRoom"));
const Profile = lazy(() => import("../pages/Profile"));

const Setting = lazy(() => import("../pages/Setting"));


export const pageRoutes = {
    dashboard: '/',
    login: '/login',
    poll: '/poll',
    profile: '/profile',
    setting: '/setting',
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
];