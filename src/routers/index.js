import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from '../pages/user-page';
import Message from "../pages/user-page/message";
import Tool from "../pages/user-page/tool";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth-page/login";
import Register from "../pages/auth-page/register";
import Git from "../pages/user-page/git";
import DetailNote from "../pages/user-page/DetailNote";
import Favorites from "../pages/user-page/favorites";
import Trash from "../pages/user-page/trash";
import NotFoundLayout from "../layouts/NotFoundLayout";
import Todo from "../pages/user-page/todo";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <UserLayout />,
                children: [
                    {
                        path: "",
                        element: <Home />,
                    },
                    {
                        path: "/:title",
                        element: <DetailNote />,
                    },
                    {
                        path: "todo",
                        element: <Todo />,
                    },
                    {
                        path: "trash",
                        element: <Trash />,
                    },
                    {
                        path: "message",
                        element: <Message />,
                    },
                    {
                        path: "tool",
                        element: <Tool />,
                    },
                    {
                        path: "git",
                        element: <Git />,
                    },
                ]
            },


            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "",
                        element: <div>Dashboard</div>,
                    },
                    {
                        path: "user",
                        element: <div>User</div>,
                    },
                ]
            },
            {
                path: "",
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <Login />,
                    },
                    {
                        path: "register",
                        element: <Register />,
                    },
                ]
            },


            {
                path: "notfound",
                element: <NotFoundLayout />,
            },
        ]
    },
]);


export default router;